import type { Rule } from 'sanity';

export const topic = {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: (Rule: Rule) => Rule.required() },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 64 },
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'description', type: 'text', rows: 2 },
  ],
};
