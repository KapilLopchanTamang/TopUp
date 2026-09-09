import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import {
  sanitizeUploadFilename,
  validateImage,
} from '@/lib/upload';

export async function POST(request: NextRequest) {
  // Check authentication
  let session = null;
  try {
    session = await auth();
  } catch {
    session = null;
  }

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string' || !('arrayBuffer' in file) || (file as Blob).size === 0) {
      return NextResponse.json({ error: 'No file uploaded or file is empty' }, { status: 400 });
    }

    const blob = file as File;

    const validation = validateImage({
      size: blob.size,
      type: blob.type,
      name: blob.name,
    });

    if (!validation.valid) {
      const isSizeError = validation.error?.includes('large');
      return NextResponse.json(
        { error: validation.error },
        { status: isSizeError ? 413 : 400 }
      );
    }

    const bytes = await blob.arrayBuffer();
    let buffer = Buffer.from(bytes);
    let mimeType = blob.type || 'image/jpeg';

    // Optional image optimization using sharp if available
    try {
      const sharpModule = await import('sharp');
      const sharp = sharpModule.default;
      const metadata = await sharp(buffer).metadata();

      if ((metadata.width && metadata.width > 1200) || buffer.length > 350 * 1024) {
        buffer = await sharp(buffer)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();
        mimeType = 'image/webp';
      }
    } catch {
      // sharp not installed or failed on this asset; proceed with raw buffer safely
    }

    const filename = sanitizeUploadFilename(blob.name, mimeType);

    let imageUrl = '';

    // Primary: Persist image in PostgreSQL database (works on Vercel serverless without filesystem restrictions)
    try {
      const dbImage = await prisma.uploadedImage.create({
        data: {
          filename,
          mimeType,
          data: buffer,
          size: buffer.length,
        },
      });
      imageUrl = `/api/images/${dbImage.id}`;
    } catch (dbError) {
      console.warn('Database image save failed, attempting disk fallback:', dbError);
    }

    // Secondary: Also save to disk if filesystem is writable (useful for local development)
    try {
      const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
      await mkdir(uploadDir, { recursive: true });
      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);
      if (!imageUrl) {
        imageUrl = `/images/uploads/${filename}`;
      }
    } catch {
      // Expected on Vercel serverless runtime where filesystem is read-only
    }

    if (!imageUrl) {
      throw new Error('Failed to persist image to database or disk');
    }

    return NextResponse.json({
      imageUrl,
      filename,
      success: true,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
}

