// website/src/components/home/ProductCategories.jsx
import { useMemo } from 'react';
import Button from '@/components/ui/Button';
import { Check } from 'lucide-react';
import { useHomeData } from '@/contexts/HomeContext';
import { parseDescription } from '@/utils/markdown';
import { getColorByIndex, getGradientColorClasses } from '@/utils/colors';

export default function ProductCategories() {
  const { homeData, isLoading } = useHomeData();

  // Transform homeData menjadi servicesData dengan memoization
  const servicesData = useMemo(() => {
    if (!homeData) {
      // Fallback to default data
      return {
        title: "Layanan Kami",
        description: "Layanan lengkap garment dan advertising untuk mendukung kesuksesan bisnis Anda",
        services: [
          {
            icon: 'shirt',
            title: 'Garment & Konveksi',
            description: 'Produksi kaos, jaket, dan seragam dengan bahan berkualitas dan sablon yang tahan lama',
            color: 'blue'
          },
          {
            icon: 'needle',
            title: 'Bordir Komputer',
            description: 'Bordir presisi tinggi untuk logo perusahaan dengan hasil yang rapi dan profesional',
            color: 'green'
          },
          {
            icon: 'printer',
            title: 'Printing & Banner',
            description: 'Cetak banner, spanduk, dan material advertising lainnya dengan kualitas terbaik',
            color: 'orange'
          }
        ]
      };
    }

    // Transform CMS data untuk services
    const servicesFromCMS = homeData.services || [];
    
    return {
      title: homeData.services_title || "Layanan Kami",
      description: "Layanan lengkap garment dan advertising untuk mendukung kesuksesan bisnis Anda",
      services: servicesFromCMS.map((service, index) => ({
        icon: service.icon,
        title: service.title,
        description: service.description,
        color: getColorByIndex(index)
      }))
    };
  }, [homeData]);

  if (isLoading || !servicesData) {
    return (
      <section className="min-h-screen flex items-center bg-neutral-900" style={{ minHeight: '100vh' }}>
        <div className="container-custom section-padding text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white">Loading Services...</p>
        </div>
      </section>
    );
  }

  const { title, description, services } = servicesData;
  
  if (!services || services.length === 0) {
    return (
      <section className="min-h-screen flex items-center bg-neutral-900">
        <div className="container-custom section-padding text-center">
          <p className="text-white text-xl">Belum ada layanan yang tersedia</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-neutral-900">
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            {title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 max-w-2xl mx-auto px-4">
            {description}
          </p>
        </div>

        {/* Services Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          {services.map((service, index) => {
            const { text, items } = parseDescription(service.description);
            
            return (
              <div 
                key={index}
                className="group relative bg-neutral-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 hover:bg-neutral-700 transition-all duration-500 hover:transform hover:-translate-y-2"
              >
                {/* Gradient Accent - Mobile Optimized */}
                <div className={`absolute top-0 left-4 sm:left-6 lg:left-8 w-12 sm:w-14 lg:w-16 h-1 bg-gradient-to-r ${getGradientColorClasses(service.color)} rounded-full`} />
                
                <div className="mb-4 sm:mb-5 lg:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                    {service.title}
                  </h3>
                  
                  {/* Description Text */}
                  {text && (
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-4">
                      {text}
                    </p>
                  )}
                  
                  {/* Feature Items with Checkmarks */}
                  {items.length > 0 && (
                    <ul className="space-y-2 sm:space-y-2.5">
                      {items.map((item, itemIndex) => (
                        <li 
                          key={itemIndex}
                          className="flex items-start gap-2 sm:gap-2.5 text-neutral-300 text-sm sm:text-base"
                        >
                          <Check 
                            className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" 
                            strokeWidth={3}
                          />
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <Button 
                  href="/produk" 
                  variant="outline"
                  className="w-full border-neutral-600 text-white hover:bg-white hover:text-neutral-900 text-sm sm:text-base py-2 sm:py-3"
                >
                  Explore {service.title}
                </Button>
              </div>
            );
          })}
        </div>

        {/* CTA Button - Mobile Optimized */}
        <div className="text-center">
          <Button href="/produk" variant="primary" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
            Lihat Semua Layanan
          </Button>
        </div>
      </div>
    </section>
  );
}