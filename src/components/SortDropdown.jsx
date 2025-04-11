import { Select } from "antd";

// components/SortDropdown.js
const SortDropdown = ({ sortOption, setSortOption }) => {
  const sortOptions = [
    { value: "name_asc", label: "Name (A-Z)" },
    { value: "name_desc", label: "Name (Z-A)" },
    { value: "grade_asc", label: "Nutrition Grade (A-E)" },
    { value: "grade_desc", label: "Nutrition Grade (E-A)" },
    { value: "calories_asc", label: "Calories (Low to High)" },
    { value: "calories_desc", label: "Calories (High to Low)" },
  ];

  return (
      <div className="mb-4 bg-blue-100 p-4 rounded-md shadow-md">
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
  );
};

export default SortDropdown;
