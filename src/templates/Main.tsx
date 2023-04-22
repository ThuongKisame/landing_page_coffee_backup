import type { ReactNode } from 'react';

import Footer from '@/components/common/Footer';
import Navbar from '@/components/common/Navbar';
import { CartProvider } from '@/contexts/CartContext';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <CartProvider>
    <div className="mt-16 w-full text-gray-700 antialiased">
      <Navbar />
      {props.meta}
      {props.children}
      <Footer />
    </div>
  </CartProvider>
);

export { Main };
