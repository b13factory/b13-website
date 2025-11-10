// Centralized Site Config Context to avoid duplicate API calls
import { createContext, useContext, useState, useEffect } from 'react';

const SiteConfigContext = createContext(null);

export function SiteConfigProvider({ children }) {
  const [siteConfig, setSiteConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadSiteConfig = async () => {
      try {
        const response = await fetch('/api/content/site-config');
        if (response.ok && isMounted) {
          const data = await response.json();
          setSiteConfig(data);
          setError(null);
        } else if (isMounted) {
          throw new Error('Failed to load site config');
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading site config:', err);
          setError(err.message);
          // Set default fallback config
          setSiteConfig({
            title: 'B13 Factory',
            description: 'Garment & Advertising Specialist',
            contact_email: 'b13factory@gmail.com',
            contact_phone: '+62 812-3403-6663',
            address: 'Jl. Arowana Perum Kebon Agung Indah, Jember, Jawa Timur, Indonesia'
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSiteConfig();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    siteConfig,
    isLoading,
    error
  };

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context === undefined) {
    throw new Error('useSiteConfig must be used within a SiteConfigProvider');
  }
  return context;
}

export default SiteConfigContext;
