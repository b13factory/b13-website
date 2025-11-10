// Centralized Contact Context to avoid duplicate API calls
import { createContext, useContext, useState, useEffect } from 'react';

const ContactContext = createContext(null);

export function ContactContextProvider({ children }) {
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadContactData = async () => {
      try {
        // Fetch both site config and contact data for maps
        const [siteRes, contactRes] = await Promise.all([
          fetch('/api/content/site-config'),
          fetch('/api/content/contact')
        ]);
        
        if (!isMounted) return;

        let siteData = {};
        let mapsEmbed = null;
        
        if (siteRes.ok) {
          siteData = await siteRes.json();
        }
        
        // Get maps embed from contact data if available
        if (contactRes.ok) {
          const contactResult = await contactRes.json();
          if (contactResult.success && contactResult.contact?.contact_info?.address?.google_maps_embed) {
            mapsEmbed = contactResult.contact.contact_info.address.google_maps_embed;
          }
        }
        
        if (isMounted) {
          setContactData({
            ...siteData,
            google_maps_embed: mapsEmbed
          });
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error loading contact data:', err);
          setError(err.message);
          // Fallback to default data
          setContactData({
            address: 'JL. Arowana, Perum Kebon Agung Indah, Kab. Jember, Jawa Timur, Indonesia',
            contact_email: 'b13factory@gmail.com',
            contact_phone: '+62 812-3456-7890',
            business_hours: {
              hours: 'Setiap Hari: 09.00 - 17.00 WIB'
            },
            google_maps_embed: null
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadContactData();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = {
    contactData,
    isLoading,
    error
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContact() {
  const context = useContext(ContactContext);
  if (context === undefined) {
    throw new Error('useContact must be used within a ContactContextProvider');
  }
  return context;
}

export default ContactContext;