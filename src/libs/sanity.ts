import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_ID,
  dataset: 'production',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}
