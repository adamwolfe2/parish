export const post = {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    { name: 'title', type: 'string', validation: (rule: { required: () => unknown }) => rule.required() },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'dek', type: 'text' },
    { name: 'publishedAt', type: 'datetime', validation: (rule: { required: () => unknown }) => rule.required() },
    { name: 'topics', type: 'array', of: [{ type: 'reference', to: [{ type: 'topic' }] }] },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'heroImage', type: 'image', options: { hotspot: true } },
    { name: 'heroImageCaption', type: 'string' },
    { name: 'originalPublication', type: 'string' },
    { name: 'originalPublicationUrl', type: 'url' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'estimatedReadMinutes', type: 'number' },
  ],
};
