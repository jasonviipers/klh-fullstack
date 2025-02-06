import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from '@/env';

// Ensure environment variables are defined
const tursoDatabaseUrl = env.TURSO_DATABASE_URL;
const tursoAuthToken = env.TURSO_AUTH_TOKEN;

if (!tursoDatabaseUrl || !tursoAuthToken) {
  throw new Error(
    "Please define the TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables."
  );
}

const client = createClient({
  url: tursoDatabaseUrl,
  authToken: tursoAuthToken,
});

export const db = drizzle(client);