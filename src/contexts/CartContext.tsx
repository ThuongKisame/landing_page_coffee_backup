import 'react-toastify/dist/ReactToastify.css';

import { createContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { getProductById } from '@/libs/getData';
import { urlFor } from '@/libs/sanity';

// import type any from '@/types/any';

export interface CardItemType {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}

type CartContextType = {
  cartItems: CardItemType[];
  addToCart: (product: any) => void;
  removeItem: (id: string) => void;
  increaseItemAmount: (id: string) => void;
  decreaseItemAmount: (id: string) => void;
  totalMoney: number;
  totalQuantity: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeItem: () => {},
  increaseItemAmount: () => {},
  decreaseItemAmount: () => {},
  totalMoney: 0,
  totalQuantity: 0,
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const storeCartItemsIntoLocalStorage = (items: CardItemType[]) => {
    const data = items.map((item) => {
      return { id: item.id, quantity: item.quantity };
    });
    localStorage.setItem('cartItems', JSON.stringify(data));
  };

  // Load cart items from localStorage on mount
  useEffect(() => {
    const getCartItemsFromLocal = async () => {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        let items = await Promise.all(
          JSON.parse(storedCartItems).map((item: any) =>
            getProductById(item.id)
          )
        );

        items = items
          .map((item, index) => {
            return {
              ...item,
              quantity: JSON.parse(storedCartItems)[index]?.quantity,
            };
          })
          .filter((item) => item.status)
          .map((item) => {
            return {
              ...item,
              slug: item.slug.current,
              id: item._id, // eslint-disable-line
              image: urlFor(item.mainImage.asset._ref).url(), // eslint-disable-line
            };
          });
        setCartItems(items);
      }
    };
    getCartItemsFromLocal();
  }, []);

  // Add a product to the cart
  const addToCart = (product: CardItemType) => {
    const index = cartItems.findIndex(
      (item: CardItemType) => item.id === product.id
    );

    if (index > -1) {
      const newStateProduct = JSON.parse(JSON.stringify(cartItems));
      newStateProduct[index].quantity += 1;
      setCartItems(newStateProduct);
      storeCartItemsIntoLocalStorage(newStateProduct);
    } else {
      setCartItems([...cartItems, product]);
      storeCartItemsIntoLocalStorage([...cartItems, product]);
    }
    toast.success('Thêm vào giỏ hàng thành công!');
  };

  // Detete a product to the cart
  const removeItem = (id: string) => {
    const index = cartItems.findIndex((item: CardItemType) => item.id === id);

    if (index > -1) {
      const newStateProduct = JSON.parse(JSON.stringify(cartItems));
      newStateProduct.splice(index, 1);
      setCartItems(newStateProduct);
      toast.success('Sản phẩm đã được xóa khỏi giỏ hàng!');
      storeCartItemsIntoLocalStorage(newStateProduct);
    } else {
      toast.warn('Đã xảy ra lỗi!');
    }
  };

  // increate product amount to the cart
  const increaseItemAmount = (id: string) => {
    const index = cartItems.findIndex((item: CardItemType) => item.id === id);

    if (index > -1) {
      const newStateProduct = JSON.parse(JSON.stringify(cartItems));
      newStateProduct[index].quantity += 1;
      setCartItems(newStateProduct);
      storeCartItemsIntoLocalStorage(newStateProduct);
    } else {
      toast.warning('Đã xảy ra lỗi!');
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // minus product amount to the cart
  const decreaseItemAmount = (id: string) => {
    const index = cartItems.findIndex((item: CardItemType) => item.id === id);

    if (index > -1) {
      const newStateProduct = JSON.parse(JSON.stringify(cartItems));
      if (newStateProduct[index].quantity > 1) {
        newStateProduct[index].quantity -= 1;
      } else {
        newStateProduct.splice(index, 1);
      }
      setCartItems(newStateProduct);
      storeCartItemsIntoLocalStorage(newStateProduct);
    } else {
      toast.warning('Đã xảy ra lỗi!');
    }
  };

  // caculate total money from the cart
  const calculateTotalMoney = (): number => {
    return cartItems.reduce((total, item) => {
      const { price, quantity, discount } = item;
      const discountedPrice = price - (price * discount) / 100;
      return total + discountedPrice * quantity;
    }, 0);
  };

  // Define the context value
  const contextValue = {
    cartItems,
    addToCart,
    removeItem,
    increaseItemAmount,
    decreaseItemAmount,
    totalMoney: calculateTotalMoney(),
    totalQuantity: getTotalQuantity(),
  };

  // Render the context provider with the children components
  return (
    <CartContext.Provider value={contextValue}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
