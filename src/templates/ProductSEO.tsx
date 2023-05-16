import type { ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { Meta } from '@/layouts/Meta';
import { MetaProductSEO } from '@/layouts/MetaProductSEO';
import type DetailProductType from '@/types/DetailProductType';
import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  children: ReactNode;
  product: DetailProductType;
};

const ProductSEO = (props: IMainProps) => (
  <div className="mt-16 w-full text-gray-700 antialiased">
    {props.product?.images?.length > 0 ? (
      <MetaProductSEO
        title={AppConfig.title}
        description={AppConfig.description}
        product={props.product}
      />
    ) : (
      <Meta title={AppConfig.title} description={AppConfig.description} />
    )}
    <Navbar />
    <div className="min-h-[calc(100vh-4rem)]">{props.children}</div>
    <Footer />
  </div>
);

export { ProductSEO };
