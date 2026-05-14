import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Research Note',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Dek / Excerpt',
      type: 'text',
      rows: 3,
      description: 'One- or two-sentence summary shown on the archive and on social shares.',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home page?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageCaption',
      title: 'Hero image caption',
      type: 'string',
    }),
    defineField({
      name: 'originalPublication',
      title: 'Original publication (if republished)',
      type: 'string',
      description: 'For posts republished from another outlet (e.g. The Wall Street Journal).',
    }),
    defineField({
      name: 'originalPublicationUrl',
      title: 'Original publication URL',
      type: 'url',
    }),
    defineField({
      name: 'body',
      title: 'Body',
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
            { name: 'quote', type: 'text', validation: (Rule) => Rule.required() },
            { name: 'attribution', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
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
    }),
  ],
  preview: {
    select: { title: 'title', date: 'publishedAt', media: 'heroImage' },
    prepare(value) {
      const title = value.title || 'Untitled';
      const date = value.date as string | undefined;
      return {
        title: String(title),
        subtitle: date ? new Date(date).toLocaleDateString() : 'Unpublished',
        media: value.media as never,
      };
    },
  },
});
