import { client } from './sanity';

export const getProductBySlug = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == "${slug}"]{
    name,
    slug,
    mainImage,
    discount,
    thumbnailImages[],
    price,
    linkVideo,
    status,
    categories[]->{
      title
    },
    body,
    _id
  }`;
  const products = await client.fetch(query);
  return products[0];
};

export const getProductByCategories = async ({
  categories,
  currentId,
}: {
  categories: string[];
  currentId: string;
}) => {
  const query = `*[_type == "product" && _id != "${currentId}" && references(*[_type == "category" && title in [${categories.map(
    (item) => `"${item}"`
  )}]]._id)]|order(_id) [0...4]`;
  const products = await client.fetch(query);
  return products;
};
