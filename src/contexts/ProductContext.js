import { createContext, useContext, useState, useEffect } from "react";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const getProducts = () => {};

  const getProductsByName = () => {
    
  };
};

export default ProductProvider;
