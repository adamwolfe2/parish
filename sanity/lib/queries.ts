export const postsQuery = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  dek,
  publishedAt,
  estimatedReadMinutes,
  featured,
  topics[]->{title, "slug": slug.current}
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  dek,
  publishedAt,
  body,
  estimatedReadMinutes,
  originalPublication,
  originalPublicationUrl,
  topics[]->{title, "slug": slug.current}
}`;
