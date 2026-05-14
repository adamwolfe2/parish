export const topic = {
  name: 'topic',
  type: 'document',
  title: 'Topic',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text' },
  ],
};
