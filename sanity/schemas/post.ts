import { defineType, defineField } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Research Note',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata & visibility' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description:
        'The headline of the note. This appears on the archive list, the post page, and social-share cards.',
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      description:
        'The last part of the URL. Click Generate to auto-create from the title. Once published, avoid changing this — it breaks inbound links.',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'meta',
      description: 'Set to "Now" to publish today, or pick a future date to schedule.',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Dek / Excerpt',
      type: 'text',
      group: 'content',
      rows: 3,
      description:
        'One- or two-sentence summary. Shown on the archive list and on Twitter/LinkedIn previews. Keep under ~200 characters.',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      group: 'meta',
      description:
        'Categories this note belongs to. A note can have multiple. Add new topics in the Topics section if needed.',
      of: [{ type: 'reference', to: [{ type: 'topic' }] }],
    }),
    defineField({
      name: 'featured',
      title: 'Feature on home page?',
      type: 'boolean',
      group: 'meta',
      description:
        'Toggle on to surface this note in the "Notable research" section on the home page. Keep it to 3 or so at a time.',
      initialValue: false,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      group: 'content',
      description:
        'Optional. Drag a photo or image here. It appears at the top of the article. Recommended size: 1600px wide.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroImageCaption',
      title: 'Hero image caption',
      type: 'string',
      group: 'content',
      description: 'Optional. A short caption under the hero image.',
    }),
    defineField({
      name: 'originalPublication',
      title: 'Original publication (if republished)',
      type: 'string',
      group: 'meta',
      description:
        'Only fill in for posts republished from another outlet — e.g. "The Wall Street Journal", "Bloomberg". Leave blank for original research.',
    }),
    defineField({
      name: 'originalPublicationUrl',
      title: 'Original publication URL',
      type: 'url',
      group: 'meta',
      description: 'Link to the original article on the publishing outlet.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      description:
        'Write the article. Use the toolbar for headings, bold, links, bullets, and images. Drag images in directly.',
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
      group: 'content',
      description:
        'Optional. Citations / footnotes. Each one shows up at the bottom of the article with a numbered reference.',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
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
        subtitle: date
          ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : 'Unpublished',
        media: value.media as never,
      };
    },
  },
});
