import { Link } from "react-router-dom";

const ProductPreview = ({ product }) => {
    return (
      <div className="border rounded-lg p-4 mt-4 bg-white shadow-sm">
        <div className="flex items-start gap-4">
          {product.image_url && (
            <Link to={`/product/${product.id}`}>
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-20 h-20 object-contain"
              />
            </Link>
          )}
          <div>
            <h3 className="font-medium text-lg">{product.product_name}</h3>
            <p className="text-gray-600 text-sm">
              {product.brands || 'Brand not specified'}
            </p>
            <div className="flex items-center mt-2">
              {product.nutrition_grades && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold mr-2 ${
                  product.nutrition_grades === 'a' ? 'bg-green-100 text-green-800' :
                  product.nutrition_grades === 'b' ? 'bg-blue-100 text-blue-800' :
                  product.nutrition_grades === 'c' ? 'bg-yellow-100 text-yellow-800' :
                  product.nutrition_grades === 'd' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Grade: {product.nutrition_grades.toUpperCase()}
                </span>
              )}
              {product.quantity && (
                <span className="text-sm text-gray-500">
                  {product.quantity}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductPreview;