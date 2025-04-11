import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// components/AdvancedFilters.js
const AdvancedFilters = ({ filters, setFilters }) => {

    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
          const response = await axios.get(
            'https://world.openfoodfacts.org/facets/categories/category.json'
          );
          return response.data.products[1].categories_tags.map(tag => tag.replace('en:', ''));
        }
      });

    const handleCategoryToggle = (category) => {
      setFilters(prev => ({
        ...prev,
        categories: prev.categories.includes(category)
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      }));
    };
    return (
      <div className="space-y-4">
      <div>
        <h3>Select Categories</h3><br/>
        {/* Loading state */}
        {isLoading ? (
          <div className="flex flex-wrap gap-2">
            {Array(8).fill().map((_, i) => (
              <div 
                key={`loading-${i}`} 
                className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="text-red-500">Failed to load categories</div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  filters.categories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <label>Max Sugar (g): {filters.maxSugar}</label>
        <input
          type="range"
          min="0"
          max="50"
          value={filters.maxSugar}
          onChange={(e) => setFilters({...filters, maxSugar: Number(e.target.value)})}
        />
      </div>
    </div>
    );
  };

  export default AdvancedFilters;