export default interface DetailProductType {
  id: string;
  price: number;
  name: string;
  images: string[];
  discount: number;
  description: any;
  slug: string;
  linkVideo: string;
  status: boolean;
  categories: Array<{ title: string }>;
}
