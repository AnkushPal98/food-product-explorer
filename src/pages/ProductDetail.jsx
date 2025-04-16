import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SkeletonLoader from '../components/SkeletonLoader';
import { useParams } from "react-router-dom";

// pages/ProductDetail.js
const ProductDetail = () => {
    const { id } = useParams();
    const { data: product, isLoading } = useQuery({
        queryKey: ['product', id],
        queryFn: async () => {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${id}.json`
          );
          return response.data.product;
        }
      });

    if (isLoading) return <SkeletonLoader />;
    if (!product) return <div>Product not found</div>;

    return (
      <div className="max-w-4xl mx-auto my-[2%] p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={product.image_url || '/placeholder-food.jpg'}
              alt={product.product_name}
              className="w-full rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.product_name}</h1>
            <div className="flex items-center gap-2 my-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full">
                Grade: {product.nutrition_grades?.toUpperCase() || 'N/A'}
              </span>
              {product.labels_tags?.includes('en:organic') && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                  Organic
                </span>
              )}
            </div>

            <div className="my-6">
              <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
              <p>{product.ingredients_text || 'No ingredients information available'}</p>
            </div>

            <div className="my-6">
              <h2 className="text-xl font-semibold mb-2">Nutritional Values</h2>
              <table className="w-full">
                <tbody>
                  {product.nutriments && Object.entries({
                    'Energy': `${product.nutriments['energy-kcal_100g']} kcal`,
                    'Fat': `${product.nutriments.fat_100g}g`,
                    'Carbohydrates': `${product.nutriments.carbohydrates_100g}g`,
                    'Proteins': `${product.nutriments.proteins_100g}g`,
                    'Sugar': `${product.nutriments.sugars_100g}g`,
                  }).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-2 font-medium">{key}</td>
                      <td className="py-2 text-right">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ProductDetail;