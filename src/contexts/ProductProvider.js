import { createContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
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

  const { user } = useAuth();

  const productsRef = collection(db, "products");
  const ordersRef = collection(db, "orders");

  useEffect(() => {
    getProducts();
    if (user) {
      getUserOrders();
    }

    console.log("fetching products...");
  }, []);

  const getProducts = async () => {
    const dbProducts = await getDocs(productsRef);
    const fetchedProducts = [];

    dbProducts.forEach((doc) => {
      fetchedProducts.push(doc);
    });

    setProducts(fetchedProducts);
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

    console.log(`${cartProducts.length} PRODUCTS IN CART`);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);

    setCartProducts(updatedCart);
  };

  const placeOrder = async (totalPrice) => {
    const order = {
      products: cartProducts,
      totalPrice: totalPrice,
      timestamp: serverTimestamp(),
      userID: user.uid,
    };

    await addDoc(ordersRef, order);

    // const userDoc = doc(db, "all_orders", user.uid);
    // await addDoc(collection(userDoc, "orders"), order);
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
    matchedProducts,
    searchProducts,
    cartProducts,
    addToCart,
    removeFromCart,
    placeOrder,
  };

  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
