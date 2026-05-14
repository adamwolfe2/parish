import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '@/sanity/env';

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0];

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource | undefined) {
  if (!source || !builder) return null;
  return builder.image(source);
}
