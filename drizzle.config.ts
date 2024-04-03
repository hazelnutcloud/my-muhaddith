import type { Config } from 'drizzle-kit'

export default {
  schema: './schema/drizzle/index.ts',
  out: './drizzle',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_URL!,
    authToken: process.env.TURSO_TOKEN!
  }
} satisfies Config