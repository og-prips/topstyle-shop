import { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "products");

  useEffect(() => {
    searchProducts("");
    console.log("effect");
  }, []);

  const searchProducts = async (searchValue) => {
    const dbProducts = await getDocs(productsRef);
    const matchedProducts = [];

    dbProducts.forEach((doc) => {
      const docName = doc.data().name.toLowerCase();
      const docBrand = doc.data().brand.toLowerCase();

      if (docName.includes(searchValue) || docBrand.includes(searchValue)) {
        matchedProducts.push(doc);
      }
    });

    setProducts(matchedProducts);

    console.log(`${matchedProducts.length} MATCHES FOUND`);
  };

  return (
    <ProductContext.Provider value={{ products, searchProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
