// Centralized Portfolio Context to avoid duplicate API calls
import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioContextProvider({ children }) {
  const [portfolio, setPortfolio] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPortfolio = async () => {
      try {
        const response = await fetch('/api/content/portfolio');
        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.success && data.portfolio) {
            setPortfolio(data.portfolio);
            setError(null);
          } else {
            throw new Error('Invalid data format');
          }
        } else if (isMounted) {
          throw new Error('Failed to load portfolio');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setPortfolio([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadPortfolio();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    portfolio,
    isLoading,
    error
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioContextProvider');
  }
  return context;
}

export default PortfolioContext;