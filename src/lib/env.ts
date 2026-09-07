const REQUIRED_VARS = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
  'WHATSAPP_NUMBER',
] as const;

const DEV_SECRET = 'dev-secret-change-in-production-32chars!!';

function validateEnv() {
  const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build';
  if (isBuildPhase) return;

  const missing = REQUIRED_VARS.filter((v) => {
    if (v === 'ADMIN_PASSWORD') {
      return !process.env.ADMIN_PASSWORD && !process.env.ADMIN_PASSWORD_HASH;
    }
    return !process.env[v];
  });
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((v) => `  - ${v}`).join('\n')}`
    );
  }

  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXTAUTH_SECRET === DEV_SECRET
  ) {
    console.warn(
      '[env] NEXTAUTH_SECRET is the dev placeholder — generate a real one for production:\n  openssl rand -hex 32'
    );
  }
}

validateEnv();

export const env = {
  get DATABASE_URL() { return process.env.DATABASE_URL!; },
  get DIRECT_URL() { return process.env.DIRECT_URL; },
  get NEXTAUTH_SECRET() { return process.env.NEXTAUTH_SECRET!; },
  get NEXTAUTH_URL() { return process.env.NEXTAUTH_URL!; },
  get ADMIN_EMAIL() { return process.env.ADMIN_EMAIL!; },
  get ADMIN_PASSWORD() { return process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD_HASH || ''; },
  get ADMIN_PASSWORD_HASH() { return process.env.ADMIN_PASSWORD_HASH || ''; },
  get WHATSAPP_NUMBER() { return process.env.WHATSAPP_NUMBER!; },
};

export { validateEnv };
