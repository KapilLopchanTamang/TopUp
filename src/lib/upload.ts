import { basename, extname } from 'path';
import crypto from 'crypto';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/pjpeg',
  'image/png',
  'image/x-png',
  'image/webp',
];

export const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const MIME_FALLBACK_EXT: Record<string, string> = {
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/pjpeg': '.jpg',
  'image/png': '.png',
  'image/x-png': '.png',
  'image/webp': '.webp',
};

export function sanitizeUploadFilename(originalName: string, mimeType: string): string {
  const safeBase = basename(originalName || 'image');
  let ext = extname(safeBase).toLowerCase();

  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    const cleanMime = (mimeType || '').toLowerCase().split(';')[0].trim();
    ext = MIME_FALLBACK_EXT[cleanMime] || '.jpg';
  }

  const nameWithoutExt = ext ? safeBase.slice(0, -ext.length) : safeBase;
  const sanitizedSlug = nameWithoutExt
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40) || 'upload';

  const timestamp = Date.now();
  const randomSuffix = crypto.randomBytes(4).toString('hex');
  return `${timestamp}-${randomSuffix}-${sanitizedSlug}${ext}`;
}

export function validateImage(file: { size: number; type?: string; name?: string }): { valid: boolean; error?: string } {
  if (!file || file.size === 0) {
    return { valid: false, error: 'No file uploaded or file is empty' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File too large. Maximum size is 5MB.' };
  }

  const cleanMime = (file.type || '').toLowerCase().split(';')[0].trim();
  const ext = extname(basename(file.name || '')).toLowerCase();

  const isMimeValid = ALLOWED_MIME_TYPES.includes(cleanMime);
  const isExtValid = ext ? ALLOWED_EXTENSIONS.includes(ext) : isMimeValid;

  if (!isMimeValid && !isExtValid) {
    return { valid: false, error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' };
  }

  return { valid: true };
}
