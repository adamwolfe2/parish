import { groq } from 'next-sanity';

/** All published research notes, newest first. */
export const postsQuery = groq`
*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  publishedAt,
  excerpt,
  featured,
  "categories": topics[]->title,
  "topicSlugs": topics[]->slug.current,
  "heroImage": heroImage,
  "heroImageAlt": heroImageCaption,
}
`;

/** Single post by slug, with full body. */
export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  publishedAt,
  excerpt,
  featured,
  "categories": topics[]->title,
  "heroImage": heroImage,
  "heroImageCaption": heroImageCaption,
  body,
  sources,
  originalPublication,
  originalPublicationUrl,
}
`;

export const allSlugsQuery = groq`
*[_type == "post" && !(_id in path("drafts.**"))][].slug.current
`;

export const allTopicsQuery = groq`
*[_type == "topic"] | order(title asc) {
  title,
  "slug": slug.current,
  description,
}
`;
