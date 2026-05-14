import type { Rule } from 'sanity';

/**
 * Research note schema. Mirrors the file-based shape currently in
 * content/posts/<slug>.json + content/post-index.json so Phase-2 migration
 * is a straightforward shape map.
 */
export const post = {
  name: 'post',
  title: 'Research Note',
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().max(220),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'excerpt', type: 'text', rows: 3 },
    {
      name: 'topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    },
    { name: 'featured', type: 'boolean', initialValue: false },
    {
      name: 'heroImage',
      type: 'image',
      options: { hotspot: true },
    },
    { name: 'heroImageCaption', type: 'string' },
    {
      name: 'originalPublication',
      type: 'string',
      description: 'For posts that are republished media features (e.g. "The Wall Street Journal").',
    },
    { name: 'originalPublicationUrl', type: 'url' },
    {
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [{ name: 'caption', type: 'string', title: 'Caption' }],
          options: { hotspot: true },
        },
        {
          type: 'object',
          name: 'pullQuote',
          title: 'Pull Quote',
          fields: [
            { name: 'quote', type: 'text', validation: (Rule: Rule) => Rule.required() },
            { name: 'attribution', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'legacyUrl',
      type: 'url',
      description: 'URL of the original WordPress post for redirect mapping.',
      readOnly: true,
    },
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'heroImage' },
    prepare({ title, date, media }: { title: string; date?: string; media?: unknown }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'Unpublished',
        media,
      };
    },
  },
};
