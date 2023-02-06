import { createContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "./AuthProvider";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [matchedProducts, setMatchedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

  const productsRef = collection(db, "products");
  const ordersRef = collection(db, "orders");

  useEffect(() => {
    // getProducts();

    if (user) {
      getUserOrders();
    }

    console.log("fetching products...");
  }, []);

  const getProducts = async () => {
    setIsLoading(true);

    const dbProducts = await getDocs(productsRef);
    const fetchedProducts = [];

    dbProducts.forEach((doc) => {
      fetchedProducts.push(doc);
    });

    setProducts(fetchedProducts);

    setIsLoading(false);
  };

  const searchProducts = (searchValue) => {
    setMatchedProducts([]);
    const matches = [];

    products.forEach((doc) => {
      const docName = doc.data().name.toLowerCase();
      const docBrand = doc.data().brand.toLowerCase();
      console.log(docBrand, searchValue);

      if (docName.includes(searchValue) || docBrand.includes(searchValue)) {
        matches.push(doc);
      }
    });

    setMatchedProducts(matches);

    console.log(`${matchedProducts.length} MATCHES FOUND`);
  };

  const addToCart = (product) => {
    console.log("adding to cart...");

    setCartProducts([...cartProducts, product]);
    setTotalPrice(totalPrice + product.price);

    console.log(`${cartProducts.length} PRODUCTS IN CART`);
  };

  const removeFromCart = (index) => {
    const newTotalPrice = totalPrice - cartProducts[index].price;
    setTotalPrice(newTotalPrice);

    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);

    setCartProducts(updatedCart);
  };

  const placeOrder = async () => {
    const order = {
      products: cartProducts,
      totalPrice: totalPrice,
      timestamp: serverTimestamp(),
      dateCreated: new Date().toLocaleString(),
      userID: user.uid,
    };

    setTotalPrice(0);
    setCartProducts([]);

    await addDoc(ordersRef, order);
  };

  const getUserOrders = async () => {
    const dbOrders = await getDocs(ordersRef);
    const fetchedOrders = [];

    dbOrders.forEach((doc) => {
      if (doc.data().userID === user.uid) {
        fetchedOrders.push(doc);
      }
    });

    setOrders(fetchedOrders);
  };

  const providerValue = {
    products,
    getProducts,
    matchedProducts,
    searchProducts,
    cartProducts,
    addToCart,
    removeFromCart,
    placeOrder,
    orders,
    getUserOrders,
    totalPrice,
    isLoading,
  };

  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
