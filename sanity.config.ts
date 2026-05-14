import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { apiVersion, dataset, projectId } from './sanity/env';
import { StudioLogo, StudioIcon } from './sanity/lib/studio-icon';

export default defineConfig({
  name: 'parish-company',
  title: 'Parish & Company',
  projectId,
  dataset,
  basePath: '/studio',
  icon: StudioIcon,
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  plugins: [
    structureTool({
      name: 'content',
      title: 'Content',
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
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion, title: 'Query playground' }),
  ],
  schema: { types: schemaTypes },
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
