import { useRef, useContext } from "react";
import { ProductContext } from "../contexts/ProductProvider";

const Search = () => {
  const searchRef = useRef();
  const { searchProducts } = useContext(ProductContext);

  const handleSearch = () => {
    searchProducts(searchRef.current.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Sök produkt..."
        ref={searchRef}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Sök</button>
    </>
  );
};

export default Search;
