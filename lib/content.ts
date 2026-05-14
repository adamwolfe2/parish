import fs from 'node:fs';
import path from 'node:path';

export function readContent(slug: string): string {
  const full = path.join(process.cwd(), 'content', `${slug}.md`);
  return fs.readFileSync(full, 'utf8');
}
