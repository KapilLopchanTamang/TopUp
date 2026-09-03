// Environment variable validation - must run at startup
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD_HASH'
] as const;

function validateEnv() {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map(v => `  - ${v}`).join('\n')}\n\nPlease check your .env file or environment configuration.`
    );
  }

  // Validate NEXTAUTH_SECRET is not the default dev value in production
  // Only check this during actual production builds, not development
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.VERCEL_ENV === 'production' &&
    process.env.NEXTAUTH_SECRET === 'dev-secret-change-in-production-32chars!!'
  ) {
    throw new Error(
      'NEXTAUTH_SECRET is set to the default development value. Please generate a secure secret for production:\n  openssl rand -hex 32'
    );
  }
}

// Run validation on module load
validateEnv();

export { validateEnv };
