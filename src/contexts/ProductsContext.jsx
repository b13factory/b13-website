// Centralized Products Context to avoid duplicate API calls
import { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext(null);

export function ProductsContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadProducts = async () => {
      try {
        const response = await fetch('/api/content/products');
        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.success && data.products) {
            setProducts(data.products);
            setError(null);
          } else {
            throw new Error('Invalid data format');
          }
        } else if (isMounted) {
          throw new Error('Failed to load products');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setProducts([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    products,
    isLoading,
    error
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsContextProvider');
  }
  return context;
}

export default ProductsContext;
