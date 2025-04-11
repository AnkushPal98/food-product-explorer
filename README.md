# Problem Overview 
The challenge was to create a performant, scalable web application for browsing food products with:

1. Search and filtering capabilities

2. Paginated product listings

3. Sorting functionality

4. Responsive design

5. Optimal API usage

# Solution Architecture
## 1. Frontend Structure

React.js with functional components

React Query for data fetching and state management

Tailwind CSS for responsive styling

Ant Design for UI components

React Router for navigation

## 2. Key Technical Decisions
### Data Fetching Strategy
const { data } = useInfiniteQuery({
  queryKey: ['products', { searchTerm, filters, currentPage }],
  queryFn: fetchProducts,
  staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  refetchOnWindowFocus: false // Prevent refetch on tab switch
});

### Hybrid Sorting Approach
1. API Sorting (primary):
// Append to API URL based on sort option
case 'name_asc': url += '&sort_by=product_name'; break;
case 'calories_desc': url += '&sort_by=nutriments.energy-kcal_100g&sort_order=desc';

2. Client-side Fallback:
const sortedProducts = useMemo(() => {
  if (!currentData?.products) return [];
  const productsToSort = [...currentData.products];
  switch(sortOption) {
    case 'name_asc': return productsToSort.sort((a,b) => a.product_name.localeCompare(b.product_name));
    // ... other sort cases
  }
}, [currentData, sortOption]);

### Pagination Implementation
- Server-side pagination with page size control

- Smart page number rendering (shows first, last, and surrounding pages)

- Loading states during page transitions

## 3. Performance Optimizations
Technique       	    Implementation              	Benefit
---------               --------------                  -------
Request Debouncing	    500ms delay on search input	    Reduces API calls
Query Caching	        React Query cache config	    Minimizes network requests
Skeleton Loading	    Placeholder components	        Improves perceived performance
Code Splitting	        Dynamic imports	                Reduces initial bundle size

## 4. Error Handling
API error fallbacks to client-side operations

Empty states with helpful messages

Loading states for all async operations


## Key Components
ProductList.js
- Manages product display and pagination
- Handles sorting (API + client-side)
- Implements responsive grid layout

AdvancedFilters.js
- Category selection with tag-like buttons
- Range filters (e.g., max sugar)
- Loading states for async operations

ProductCard.js
- Consistent product display component
- Responsive design
- Hover effects and visual feedback

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


