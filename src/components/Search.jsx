import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contexts/ProductProvider";
import { Button } from "react-bootstrap";

const Search = () => {
  const searchRef = useRef();
  const { searchProducts } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleSearch = () => {
    searchProducts(searchRef.current.value);
    searchRef.current.value = "";

    navigate("/");
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
        style={{ marginRight: "10px" }}
        autoFocus
      />
      <Button onClick={handleSearch}>Sök</Button>
    </>
  );
};

export default Search;
