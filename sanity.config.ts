/**
 * Sanity Studio configuration — Phase 2.
 *
 * This file is checked in but the Studio is NOT wired into the Next.js app
 * yet. To activate:
 *   1. npm install sanity @sanity/vision @sanity/client next-sanity
 *   2. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET in .env
 *   3. Add app/studio/[[...tool]]/page.tsx (one-line embed)
 *   4. Migrate content from content/posts/*.json with scripts/migrate-to-sanity.mjs (TBD)
 */
import type { Config } from 'sanity';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const config: Config = {
  name: 'parish-company',
  title: 'Parish & Company',
  projectId,
  dataset,
  basePath: '/studio',
  schema: { types: schemaTypes },
  plugins: [],
};

export default config;
