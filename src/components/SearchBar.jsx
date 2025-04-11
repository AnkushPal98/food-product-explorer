import { useEffect } from "react";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, debouncedTerm, setSearchTerm] = useDebouncedSearch();

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-full p-2 border rounded-lg my-[10px]"
    />
  );
};
export default SearchBar;