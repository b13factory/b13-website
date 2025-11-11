// Centralized Home Content Context to avoid duplicate API calls
import { createContext, useContext, useState, useEffect } from 'react';

const HomeContext = createContext(null);

export function HomeContextProvider({ children }) {
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadHomeData = async () => {
      try {
        const response = await fetch('/api/content/home');
        if (response.ok && isMounted) {
          const data = await response.json();
          if (data.success && data.home) {
            setHomeData(data.home);
            setError(null);
          } else {
            throw new Error('Invalid data format');
          }
        } else if (isMounted) {
          throw new Error('Failed to load home content');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          // Set default fallback data
          setHomeData({
            hero_banners: [],
            services: [],
            portfolio_stats: {
              projects_completed: '150+',
              happy_clients: '50+',
              years_experience: '5+'
            },
            marquee_banner: {
              enabled: true,
              texts: [{ text: '✦ Buka Setiap Hari Pukul 09.00 - 17.00 WIB' }],
              bg_color: 'primary',
              text_color: 'white',
              speed: 'medium'
            }
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    homeData,
    isLoading,
    error
  };

  return (
    <HomeContext.Provider value={value}>
      {children}
    </HomeContext.Provider>
  );
}

export function useHomeData() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHomeData must be used within a HomeContextProvider');
  }
  return context;
}

export default HomeContext;
