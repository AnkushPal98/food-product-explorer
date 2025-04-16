import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
    return (
      <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer hover:border-3 hover:border-sky-500 dark:hover:border-gray-400 bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col border-gray-200 dark:border-gray-700">
        <Link to={`/product/${product.id}`}>
          <img src={product.image_url} alt={product.product_name} className="w-full h-48 object-contain my-[20px]"/>
        </Link>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-gray-800 dark:text-gray-100">
            {product.product_name ? product.product_name : "Product name not available"}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
            {product.nutriments?.['energy-kcal_100g'] || 0} Calories/100g
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {product.ingredients_text ?
                `${product.ingredients_text.substring(0, 30)}...` :
                'Ingredients not available'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
              product.nutrition_grades === 'a' ? 'bg-green-100 text-green-800' :
              product.nutrition_grades === 'b' ? 'bg-blue-100 text-blue-800' :
              product.nutrition_grades === 'c' ? 'bg-yellow-100 text-yellow-800' :
              product.nutrition_grades === 'd' ? 'bg-orange-100 text-orange-800' :
              'bg-red-100 text-red-800'
            }`}>
              {product.nutrition_grades?.toUpperCase() || 'N/A'}
            </span>
          </div>
        </div>
      </div>
    );
  };

  export default ProductCard;