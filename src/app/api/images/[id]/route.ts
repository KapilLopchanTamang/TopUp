import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return new NextResponse('Image ID required', { status: 400 });
    }

    // 1. Try finding in PostgreSQL database
    const dbImage = await prisma.uploadedImage.findUnique({
      where: { id },
    });

    if (dbImage) {
      return new NextResponse(dbImage.data as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': dbImage.mimeType || 'image/jpeg',
          'Content-Length': dbImage.size.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Disposition': `inline; filename="${encodeURIComponent(dbImage.filename)}"`,
        },
      });
    }

    // 2. Try by filename in database
    const dbImageByFilename = await prisma.uploadedImage.findFirst({
      where: { filename: id },
    });

    if (dbImageByFilename) {
      return new NextResponse(dbImageByFilename.data as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': dbImageByFilename.mimeType || 'image/jpeg',
          'Content-Length': dbImageByFilename.size.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Content-Disposition': `inline; filename="${encodeURIComponent(dbImageByFilename.filename)}"`,
        },
      });
    }

    // 3. Fallback: try local filesystem (for local dev or legacy assets)
    try {
      const sanitized = id.replace(/[^a-zA-Z0-9._-]/g, '');
      const localPath = join(process.cwd(), 'public', 'images', 'uploads', sanitized);
      const fileBuffer = await readFile(localPath);

      let mimeType = 'image/jpeg';
      if (sanitized.endsWith('.png')) mimeType = 'image/png';
      else if (sanitized.endsWith('.webp')) mimeType = 'image/webp';

      return new NextResponse(fileBuffer as unknown as BodyInit, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Content-Length': fileBuffer.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    } catch {
      // Local file not found
    }

    return new NextResponse('Image not found', { status: 404 });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}

export async function HEAD(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) return new NextResponse(null, { status: 400 });

    const dbImage = await prisma.uploadedImage.findUnique({
      where: { id },
      select: { mimeType: true, size: true },
    });

    if (dbImage) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': dbImage.mimeType || 'image/jpeg',
          'Content-Length': dbImage.size.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    return new NextResponse(null, { status: 404 });
  } catch {
    return new NextResponse(null, { status: 500 });
  }
}
