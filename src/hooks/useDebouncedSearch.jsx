// hooks/useDebouncedSearch.js
import { useState, useEffect } from 'react';

const useDebouncedSearch = (delay = 500) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return [searchTerm, debouncedTerm, setSearchTerm];
};

export default useDebouncedSearch;