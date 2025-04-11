import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import ProductPreview from "./ProductPreview";
import { useQuery } from "@tanstack/react-query";

// components/BarcodeScanner.js
const BarcodeScanner = () => {
    const [barcode, setBarcode] = useState('');
    const [error, setError] = useState('');

    const { data: product, isLoading, isError } = useQuery({
        queryKey: ['product', barcode],
        queryFn: async () => {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
          );
          if (response.data.status === 0) {
            throw new Error('Product not found');
          }
          return response.data.product;
        },
        enabled: !!barcode,
      });

    useEffect(() => {
      if (isError) {
        setError('Product not found. Please try another barcode.');
      } else {
        setError('');
      }
    }, [isError]);

    return (
      <div>
        <label className="text-lg">Enter the barcode of the product you want to find.</label>
        <input
          type="text"
          placeholder="Enter barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="my-[10px] w-full p-2 border rounded-lg"
        />
        {error && <div className="text-red-500">{error}</div>}
        {isLoading && <Spinner />}
        {product && <ProductPreview product={product} />}
      </div>
    );
  };

  export default BarcodeScanner;