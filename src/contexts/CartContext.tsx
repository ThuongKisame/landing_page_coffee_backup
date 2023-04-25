// import 'react-toastify/dist/ReactToastify.css';

// import { createContext, useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';

// import type DetailProductProps from '@/types/DetailProductProps';

// type CartContextType = {
//   cartItems: DetailProductProps[];
//   addToCart: (product: DetailProductProps) => void;
//   removeItem: (product: DetailProductProps) => void;
//   increaseItemAmount: (product: DetailProductProps) => void;
//   decreaseItemAmount: (product: DetailProductProps) => void;
//   totalMoney: number;
// };

// export const CartContext = createContext<CartContextType>({
//   cartItems: [],
//   addToCart: () => {},
//   removeItem: () => {},
//   increaseItemAmount: () => {},
//   decreaseItemAmount: () => {},
//   totalMoney: 0,
// });

// type CartProviderProps = {
//   children: React.ReactNode;
// };

// export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
//   const [cartItems, setCartItems] = useState<DetailProductProps[]>([]);
//   const [hasCartItemsChanged, setHasCartItemsChanged] = useState(false);

//   // Load cart items from localStorage on mount
//   useEffect(() => {
//     const storedCartItems = localStorage.getItem('cartItems');
//     if (storedCartItems) {
//       setCartItems(JSON.parse(storedCartItems));
//     }
//   }, []);

//   // Save cart items to localStorage when the cartItems state changes
//   useEffect(() => {
//     if (hasCartItemsChanged) {
//       localStorage.setItem('cartItems', JSON.stringify(cartItems));
//       setHasCartItemsChanged(false);
//     }
//   }, [cartItems, hasCartItemsChanged]);

//   // Add a product to the cart
//   const addToCart = (product: DetailProductProps) => {
//     if (!product.status) {
//       toast.warn('Sản phẩm đã hết hàng!', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//       return;
//     }
//     const checkExistItem = cartItems.filter((item) => {
//       return item.slug === product.slug;
//     });

//     if (checkExistItem.length > 0) {
//       toast.warn('Sản phẩm đã tồn tại giỏ hàng!', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     } else {
//       setCartItems([...cartItems, product]);
//       setHasCartItemsChanged(true);

//       toast.success('Sản phẩm đã được thêm vào giỏ hàng!', {
//         position: toast.POSITION.TOP_RIGHT,
//       });
//     }
//   };

//   // Detete a product to the cart
//   const removeItem = (product: DetailProductProps) => {
//     const filteredCartItems = cartItems.filter((item) => {
//       return item.slug !== product.slug;
//     });

//     setCartItems(filteredCartItems);

//     toast.warn('Sản phẩm đã được xóa khỏi giỏ hàng!', {
//       position: toast.POSITION.TOP_RIGHT,
//     });

//     setHasCartItemsChanged(true);
//   };

//   // increate product amount to the cart
//   const increaseItemAmount = (product: DetailProductProps) => {
//     const updatedCartItems = cartItems.map((item) => {
//       if (item.slug === product.slug) {
//         return { ...item, amount: item.amount + 1 };
//       }
//       return item;
//     });

//     setCartItems(updatedCartItems);
//     setHasCartItemsChanged(true);
//   };

//   // minus product amount to the cart
//   const decreaseItemAmount = (product: DetailProductProps) => {
//     const updatedCartItems = cartItems.map((item) => {
//       if (item.slug === product.slug && item.amount > 1) {
//         return { ...item, amount: item.amount - 1 };
//       }
//       return item;
//     });

//     setCartItems(updatedCartItems);
//     setHasCartItemsChanged(true);
//   };

//   // caculate total money from the cart
//   const calculateTotalMoney = (): number => {
//     return cartItems.reduce((total, item) => {
//       const { price, amount, discount } = item;
//       const discountedPrice = price - (price * discount) / 100;
//       return total + discountedPrice * amount;
//     }, 0);
//   };

//   // Define the context value
//   const contextValue = {
//     cartItems,
//     addToCart,
//     removeItem,
//     increaseItemAmount,
//     decreaseItemAmount,
//     totalMoney: calculateTotalMoney(),
//   };

//   // Render the context provider with the children components
//   return (
//     <CartContext.Provider value={contextValue}>
//       {children}
//       <ToastContainer />
//     </CartContext.Provider>
//   );
// };

const Index = () => {
  return <></>;
};

export default Index;
