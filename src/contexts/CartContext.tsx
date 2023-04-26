import 'react-toastify/dist/ReactToastify.css';

import { createContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

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

  // Load cart items from localStorage on mount
  // useEffect(() => {
  //   const storedCartItems = localStorage.getItem('cartItems');
  //   if (storedCartItems) {
  //     setCartItems(JSON.parse(storedCartItems));
  //   }
  // }, []);

  // // Save cart items to localStorage when the cartItems state changes
  // useEffect(() => {
  //   if (hasCartItemsChanged) {
  //     localStorage.setItem('cartItems', JSON.stringify(cartItems));
  //     setHasCartItemsChanged(false);
  //   }
  // }, [cartItems, hasCartItemsChanged]);

  // Add a product to the cart
  const addToCart = (product: CardItemType) => {
    const index = cartItems.findIndex(
      (item: CardItemType) => item.id === product.id
    );

    if (index > -1) {
      const newStateProduct = JSON.parse(JSON.stringify(cartItems));
      newStateProduct[index].quantity += 1;
      setCartItems(newStateProduct);
    } else {
      setCartItems([...cartItems, product]);
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
