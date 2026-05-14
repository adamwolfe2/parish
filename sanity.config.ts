import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { apiVersion, dataset, projectId } from './sanity/env';
import { StudioLogo, StudioIcon } from './sanity/lib/studio-icon';
import { studioTheme } from './sanity/lib/studio-theme';
import { Welcome } from './sanity/lib/Welcome';

// Only show the Query Playground (Vision tool) to project admins. Bill
// shouldn't see GROQ debug tooling.
const ADMIN_EMAILS = new Set(['adamwolfe102@gmail.com']);

export default defineConfig({
  name: 'parish-company',
  title: 'Parish & Company',
  projectId,
  dataset,
  basePath: '/studio',
  icon: StudioIcon,
  theme: studioTheme,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  plugins: [
    structureTool({
      name: 'content',
      title: 'Content',
      defaultDocumentNode: (S) =>
        S.document().views([S.view.form()]),
      structure: (S) =>
        S.list()
          .title('Parish & Company')
          .items([
            S.listItem()
              .title('Research notes')
              .icon(() => '📰')
              .child(
                S.documentTypeList('post')
                  .title('Research notes')
                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }]),
              ),
            S.divider(),
            S.listItem()
              .title('Topics')
              .icon(() => '🏷️')
              .child(S.documentTypeList('topic').title('Topics')),
            S.divider(),
            S.listItem()
              .title('Welcome / how to publish')
              .icon(() => 'i')
              .child(
                S.component(Welcome).title('Welcome')
              ),
          ]),
    }),
    visionTool({
      defaultApiVersion: apiVersion,
      title: 'Query playground',
      // Hidden from non-admin users via Sanity's access rules below.
    }),
  ],
  schema: { types: schemaTypes },
  tools: (prev, { currentUser }) => {
    if (!currentUser?.email || !ADMIN_EMAILS.has(currentUser.email)) {
      return prev.filter((t) => t.name !== 'vision');
    }
    return prev;
  },
  document: {
    productionUrl: async (prev, context) => {
      const doc = context.document as { _type?: string; slug?: { current?: string } };
      const slug = doc?.slug?.current;
      if (doc?._type === 'post' && slug) {
        return `https://parishinvestments.vercel.app/research/${slug}`;
      }
      return prev;
    },
  },
});
