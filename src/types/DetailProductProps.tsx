export default interface DetailProductProps {
  price: number;
  name: string;
  image: string;
  thumbnail: string[];
  discount: number;
  description: string;
  slug: string;
  amount: number;
  category: Array<{ title: string }>;
  productsByCategories: any;
}
