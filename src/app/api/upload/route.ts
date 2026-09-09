import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/auth';
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
    const buffer = Buffer.from(bytes);

    const filename = sanitizeUploadFilename(blob.name, blob.type);

    // Save to public/images/uploads directory
    const uploadDir = join(process.cwd(), 'public', 'images', 'uploads');
    await mkdir(uploadDir, { recursive: true });
    const filepath = join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // Return the public URL
    const imageUrl = `/images/uploads/${filename}`;

    return NextResponse.json({ imageUrl, success: true });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
