import { useRef } from "react";

const Search = () => {
  const searchRef = useRef();

  const handleSearch = () => {
    alert(searchRef.current.value);
  };

  return (
    <>
      <input type="text" placeholder="Sök produkt..." ref={searchRef} />
      <button onClick={handleSearch}></button>
    </>
  );
};

export default Search;
