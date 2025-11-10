// website/src/components/home/PortfolioShowcase.jsx
'use client';
import { useMemo, memo } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Button from '@/components/ui/Button';
import { ChevronRight, Plus } from 'lucide-react';
import { usePortfolio } from '@/contexts/PortfolioContext';
import { useHomeData } from '@/contexts/HomeContext';
import { formatMarkdown } from '@/utils/markdown';

const PortfolioShowcase = memo(function PortfolioShowcase() {
  const { portfolio: portfolioItems, isLoading: portfolioLoading } = usePortfolio();
  const { homeData, isLoading: homeLoading } = useHomeData();

  const isLoading = portfolioLoading || homeLoading;

  // Memoized portfolio stats
  const portfolioStats = useMemo(() => {
    if (!homeData?.portfolio_stats) {
      return {
        projects_completed: '150+',
        happy_clients: '50+',
        years_experience: '5+'
      };
    }
    return homeData.portfolio_stats;
  }, [homeData]);

  // Memoized portfolio items (first 6)
  const displayedPortfolio = useMemo(() => {
    return portfolioItems.slice(0, 6);
  }, [portfolioItems]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-white relative overflow-hidden">
      {/* Background Pattern - GPU Accelerated */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20" style={{ willChange: 'transform' }} />
      
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
          {/* Header Section - Mobile Optimized */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Our Portfolio
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
              Lihat project-project yang telah kami kerjakan untuk berbagai klien dari berbagai industri. 
              Setiap project dikerjakan dengan standar kualitas tertinggi.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button href="/portofolio" variant="primary" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto">
                Explore Portfolio
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
              </Button>
              
              <Button href="/contact-us" variant="outline" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 w-full sm:w-auto">
                Start Your Project
              </Button>
            </div>
          </div>

          {/* Stats - Mobile Optimized */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-600 mb-1 sm:mb-2">{portfolioStats.projects_completed}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-500 mb-1 sm:mb-2">{portfolioStats.happy_clients}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-500 mb-1 sm:mb-2">{portfolioStats.years_experience}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Years Experience</div>
            </div>
          </div>
        </div>

        {/* Portfolio Grid - Mobile Optimized */}
        {displayedPortfolio.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-base sm:text-lg">Belum ada portfolio yang tersedia</p>
          </div>
        ) : (
        <div className="mb-8 sm:mb-10 lg:mb-12">
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {displayedPortfolio.map((item, index) => (
              <a
              key={item.slug || index}
              href={`/portofolio/${item.slug}`}
                className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 card-hover"
            >
              {/* Image Container - Aspect ratio 16:10 - Optimized with Next Image */}
              <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                {item.image ? (
                  <OptimizedImage 
                    src={item.image} 
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index < 3 ? 'eager' : 'lazy'}
                    priority={index < 3}
                    quality={85}
                  />
                ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Plus size={24} className="text-neutral-500" />
                        </div>
                        <p className="text-neutral-500 font-medium">Portfolio Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                
                {/* Content - Mobile Optimized */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Date & Category Badge */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                    <span className="text-xs sm:text-sm text-neutral-500">
                      {item.date ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '2024'}
                    </span>
                    {item.category && (
                      <>
                        <span className="text-neutral-300">•</span>
                        <span className="text-xs uppercase tracking-wider text-primary-600 font-semibold">
                          {item.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <div 
                    className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3 sm:mb-4 line-clamp-3 prose prose-base max-w-none prose-p:mb-3 prose-p:leading-relaxed prose-ul:my-3 prose-ul:space-y-1.5 prose-li:my-1.5 prose-li:leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(item.description || '') }}
                  />

                  {/* Client Info */}
                  {item.client && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-3">
                      <span className="font-medium">Client:</span>
                      <span className="truncate">{item.client}</span>
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100">
                    <span className="text-primary-600 text-xs sm:text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Read more
                      <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        )}

        {/* View All Button - Mobile Optimized */}
        <div className="text-center">
          <Button 
            href="/portofolio" 
            variant="outline"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto"
          >
            View All Projects
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
});

PortfolioShowcase.displayName = 'PortfolioShowcase';

export default PortfolioShowcase;
