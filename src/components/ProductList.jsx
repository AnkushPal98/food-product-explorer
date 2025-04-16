// components/ProductList.js
import { useInfiniteQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import SkeletonLoader from "./SkeletonLoader";
import { useMemo, useState } from "react";
import axios from "axios";
import { Empty } from "antd";

const ProductList = ({ searchTerm, filters, sortOption }) => {
  const productsPerPage = 24; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = async ({ pageParam = currentPage }) => {
    let url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${searchTerm}&json=true&page=${pageParam}&page_size=${productsPerPage}`;

    if (filters.categories.length > 0) {
      url += `&categories_tags=${filters.categories.join(",")}`;
    }

    const response = await axios.get(url);
    return {
      products: response.data.products,
      count: response.data.count,
      page: pageParam,
      page_count: Math.ceil(response.data.count / productsPerPage),
    };
  };

  const { data, isFetching, refetch } = useInfiniteQuery({
    queryKey: ["products", { searchTerm, filters, currentPage }],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.page_count ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
    initialPageParam: currentPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false, // Disable tab switch refetch
    refetchOnMount: false, // Optional: disable refetch on component remount
  });

  const currentData = data?.pages[0];
  const totalPages = currentData?.page_count || 1;

  // Add client-side sorting fallback
  const sortedProducts = useMemo(() => {
    if (!currentData?.products) return [];

    // Create a copy to avoid mutating original array
    const productsToSort = [...currentData.products];

    switch (sortOption) {
      case "name_asc":
        return productsToSort.sort((a, b) =>
          (a.product_name || "").localeCompare(b.product_name || "")
        );
      case "name_desc":
        return productsToSort.sort((a, b) =>
          (b.product_name || "").localeCompare(a.product_name || "")
        );
      case "grade_asc":
        return productsToSort.sort((a, b) =>
          (a.nutrition_grades || "").localeCompare(b.nutrition_grades || "")
        );
      case "grade_desc":
        return productsToSort.sort((a, b) =>
          (b.nutrition_grades || "").localeCompare(a.nutrition_grades || "")
        );
      case "calories_asc":
        return productsToSort.sort(
          (a, b) =>
            (a.nutriments?.["energy-kcal_100g"] || 0) -
            (b.nutriments?.["energy-kcal_100g"] || 0)
        );
      case "calories_desc":
        return productsToSort.sort(
          (a, b) =>
            (b.nutriments?.["energy-kcal_100g"] || 0) -
            (a.nutriments?.["energy-kcal_100g"] || 0)
        );
      default:
        return productsToSort;
    }
  }, [currentData, sortOption]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    refetch();
  };

  const renderPagination = () => {
    if (!currentData || totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage, endPage;

    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <div className="flex flex-col items-center mt-8 mb-4">
        <div className="text-sm text-gray-600 mb-2">
          Showing page {currentPage} of {totalPages}
        </div>
        <nav className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Previous
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                disabled={isFetching}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } disabled:opacity-50`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={isFetching}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              } disabled:opacity-50`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={isFetching}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                } disabled:opacity-50`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isFetching}
            className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Next
          </button>
        </nav>
        <div className="text-xs text-gray-500 mt-2">
          {productsPerPage} products per page
        </div>
      </div>
    );
  };

  return (
    sortedProducts.length === 0 && !isFetching ? (
      <div className="w-full py-8 flex justify-center items-center">
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <span className="text-gray-600">
              No products found matching your criteria
            </span>
          }
        />
      </div>
    ) : 
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-[16px]">
        {isFetching && currentPage === 1 ? (
          Array(8)
            .fill()
            .map((_, i) => <SkeletonLoader key={i} />)
        ) : (
          sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
        {isFetching && currentPage > 1 && (Array(8).fill().map((_, i) => <SkeletonLoader key={i} />))}
      </div>
      {renderPagination()}
    </>
  );
};

export default ProductList;
