export default interface DetailProductProps {
  price: number;
  name: string;
  image: string;
  thumbnail: string[];
  discount: number;
  description: string;
  slug: string;
  amount: number;
  linkvideo: string;
  status: boolean;
  category: Array<{ title: string }>;
  productsByCategories: any;
}
