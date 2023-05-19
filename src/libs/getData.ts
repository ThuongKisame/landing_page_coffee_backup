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
  console.log('related query', query);
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
  const searchFilter = filter.search
    ? `&& name match "${decodeURIComponent(filter.search)}*"`
    : '';
  const categoriesFilter =
    filter.categories.length > 0
      ? `&& references(*[_type == "category" && title in [${filter.categories.map(
          (item) => `"${item}"`
        )}]]._id)`
      : '';
  const orderFilter =
    filter.orderBy.type && filter.orderBy.order
      ? `order(${filter.orderBy.type} ${filter.orderBy.order})`
      : '';
  const query = `{
      "items": *[_type == "product" ${categoriesFilter} ${searchFilter}] | ${orderFilter}[${
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
       "total": count(*[_type == "product" ${categoriesFilter}])

  }`;

  // console.log(query);

  const listProducts = await client.fetch(query);
  return listProducts;
};

export const getAllCategories = async () => {
  const query = `*[_type == "category"]{title}`;
  const categories = await client.fetch(query);
  return categories;
};

export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == "${id}"]{
    name,
    slug,
    mainImage,
    discount,
    price,
    status,
    _id
  }`;
  const product = await client.fetch(query);
  return product[0];
};

export const getAllIntroduce = async () => {
  const query = `*[_type == "introduct" && status==true] | order(index asc) {
    title,
    slogan,
    description,
    image,
    linkVideo
  }`;
  const introduces = await client.fetch(query);
  return introduces;
};

export const getAllIntroduceHomePage = async () => {
  const query = `*[_type == "introduct" && status==true && highlight==true] | order(index asc) {
    title,
    slogan,
    description,
    image,
    linkVideo
  }`;
  const introduces = await client.fetch(query);
  return introduces;
};

export const getContacts = async () => {
  const query = `*[_type == "contact"]`;
  const contacts = await client.fetch(query);
  return contacts;
};

export const getActive = async () => {
  const query = `*[_type == "active"]`;
  const active = await client.fetch(query);
  return active[0];
};
