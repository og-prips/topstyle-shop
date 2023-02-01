import { useRef, useContext } from "react";
import { ProductContext } from "../contexts/ProductProvider";

const Search = () => {
  const searchRef = useRef();
  const { searchProducts } = useContext(ProductContext);

  const handleSearch = () => {
    searchProducts(searchRef.current.value);
  };

  return (
    <>
      <input type="text" placeholder="Sök produkt..." ref={searchRef} />
      <button onClick={handleSearch}>Sök</button>
    </>
  );
};

export default Search;
