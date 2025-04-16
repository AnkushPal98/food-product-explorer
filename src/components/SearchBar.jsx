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
      className="w-full p-2 border rounded-lg my-[10px] dark:bg-gray-800 dark:text-white dark:border-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:border-gray-500"
    />
  );
};
export default SearchBar;