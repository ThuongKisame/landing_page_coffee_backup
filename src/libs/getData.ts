import type { FilterType } from '@/components/screens/Shop';

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

export const getAllProducts = async ({
  currentPage,
  perPage,
  filter,
}: {
  currentPage: number;
  perPage: number;
  filter: FilterType;
}) => {
  console.log('filter', filter);
  const orderFilter =
    filter.orderBy.type && filter.orderBy.order
      ? `order(${filter.orderBy.type} ${filter.orderBy.order})`
      : '';
  const query = `{
    "items": *[_type == "product"] | ${orderFilter}[${
    currentPage * perPage - perPage
  }...${currentPage * perPage}]{
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
      body
    },
     "total": count(*[_type == "product"]) 

}`;

  console.log('query', query);

  const listProducts = await client.fetch(query);
  return listProducts;
};

export const getAllCategories = async () => {
  const query = `*[_type == "category"]{title}`;
  const categories = await client.fetch(query);
  return categories;
};
