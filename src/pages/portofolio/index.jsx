import Head from 'next/head';
import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Filter, ZoomIn, ExternalLink, Calendar, MapPin, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import PortfolioBanner from '@/components/portfolio/PortfolioBanner';
import Pagination from '@/components/ui/Pagination';

export default function Portfolio({ initialPortfolio, initialCategories, initialStats }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [portfolioProjects, setPortfolioProjects] = useState(initialPortfolio);
  const [categories, setCategories] = useState(initialCategories);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading] = useState(false);
  const [error] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [portfolioStats] = useState(initialStats);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const ITEMS_PER_PAGE = 9; // 3x3 grid

  // Update current category when filter changes or on mount
  useEffect(() => {
    const category = categories.find(cat => cat.slug === activeFilter);
    setCurrentCategory(category);
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [activeFilter, categories]);

  // Show loading state - simplified since data is pre-rendered
  if (loading && portfolioProjects.length === 0) {
    return (
      <>
        <Head>
          <title>Portfolio - B13 Factory</title>
        </Head>
        <PortfolioBanner category={currentCategory} />
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-sm sm:text-base text-neutral-600">Memuat portfolio...</p>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Show error state
  if (error) {
    return (
      <>
        <Head>
          <title>Portfolio - B13 Factory</title>
        </Head>
        <PortfolioBanner category={currentCategory} />
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="container-custom">
            <div className="flex justify-center items-center py-12 sm:py-16 md:py-20">
              <div className="text-center">
                <p className="text-red-600 text-sm sm:text-base md:text-lg mb-4">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  variant="primary"
                >
                  Coba Lagi
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  // Filter projects - use useMemo for performance
  const filteredProjects = useMemo(() => {
    return activeFilter === 'all' 
      ? portfolioProjects 
      : portfolioProjects.filter(project => project.category === activeFilter);
  }, [activeFilter, portfolioProjects]);

  // Pagination calculations
  const totalProjects = filteredProjects.length;
  const totalPages = Math.ceil(totalProjects / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  return (
    <>
      <Head>
        <title>Portfolio Karya - B13 Factory Jember | Garment & Advertising Terpercaya</title>
        <meta name="description" content="Lihat portfolio karya terbaik B13 Factory Jember dalam bidang konfeksi, garment dan advertising. Lebih dari 150+ project selesai dengan berbagai klien puas di Jember dan Indonesia." />
        <meta name="keywords" content="portfolio garment jember, karya konfeksi jember, contoh sablon jember, project garment, klien b13 factory, hasil produksi garment jember" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Portfolio Karya - B13 Factory Jember" />
        <meta property="og:description" content="Lihat portfolio karya terbaik B13 Factory Jember dalam bidang konfeksi, garment dan advertising. Lebih dari 150+ project selesai." />
        <meta property="og:url" content="https://b13garment.id/portofolio" />
        <meta property="og:type" content="website" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://b13garment.id/portofolio" />
      </Head>

      {/* Dynamic Banner based on Category */}
      <PortfolioBanner category={currentCategory} />

      <section className="pt-6 sm:pt-8 pb-12 sm:pb-16 md:pb-20 bg-white">
        <div className="container-custom">
          {/* Filter Section - Mobile Optimized */}
          <div className="mb-4 sm:mb-6">
            {/* Desktop Filter */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {categories.map(category => (
                <button
                  key={category.slug}
                  onClick={() => setActiveFilter(category.slug)}
                  className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                    activeFilter === category.slug
                      ? 'bg-primary-500 text-white shadow-lg transform -translate-y-1'
                      : 'bg-white text-neutral-700 shadow-md hover:shadow-lg hover:bg-neutral-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Mobile Filter Dropdown */}
            <div className="sm:hidden">
              <div className="relative">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white hover:border-primary-500 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Filter size={16} className="text-primary-600" />
                    <span className="font-medium text-sm text-slate-700">
                      {categories.find(c => c.slug === activeFilter)?.name || 'Semua Kategori'}
                    </span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`text-slate-600 transition-transform ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isCategoryOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50">
                    <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                      {categories.map(category => (
                        <button
                          key={category.slug}
                          onClick={() => {
                            setActiveFilter(category.slug);
                            setIsCategoryOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-all text-sm ${
                            activeFilter === category.slug
                              ? 'bg-primary-500 text-white font-semibold'
                              : 'hover:bg-primary-50 text-slate-700'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Portfolio Stats Section - Mobile Optimized */}
          {portfolioStats && (
            <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                  {portfolioStats.projects_completed}
                </div>
                <div className="text-neutral-600 text-[10px] sm:text-xs md:text-sm">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary-600 mb-1">
                  {portfolioStats.happy_clients}
                </div>
                <div className="text-neutral-600 text-[10px] sm:text-xs md:text-sm">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-accent-600 mb-1">
                  {portfolioStats.years_experience}
                </div>
                <div className="text-neutral-600 text-[10px] sm:text-xs md:text-sm">Years Experience</div>
              </div>
            </div>
          )}

          {/* Portfolio Grid - 2 columns mobile, 3 columns desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
            {currentProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 card-hover group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg sm:rounded-t-xl md:rounded-t-2xl">
                  {project.image && project.image !== '/uploads/placeholder.jpg' ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                      <div className="text-center text-neutral-600 px-2">
                        <p className="text-xs sm:text-sm">Portfolio Image</p>
                        <p className="text-[10px] sm:text-xs mt-1 line-clamp-2">{project.title}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-500 flex items-center justify-center">
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 text-center text-white p-3 sm:p-4 md:p-6">
                      <ZoomIn size={32} className="sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 md:mb-4" />
                      <p className="font-semibold text-xs sm:text-sm">Click to View Details</p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-neutral-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium capitalize">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-xl font-bold mb-2 sm:mb-3 text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center text-[10px] sm:text-xs text-neutral-500 mb-2 sm:mb-3 gap-2">
                    <Calendar size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="mr-2 sm:mr-3 md:mr-4">{project.year}</span>
                    <MapPin size={12} className="sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 mb-3 sm:mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-primary-600 truncate">
                      {project.client}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 flex-shrink-0"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}

          {/* CTA Section - Mobile Optimized */}
          <div className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-neutral-900">
              Ready to Start Your Project?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-neutral-600 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
              Mari wujudkan ide Anda menjadi kenyataan. Konsultasi gratis dengan tim profesional kami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Button href="/contact-us" variant="primary" className="text-sm sm:text-base justify-center">
                Start Project
              </Button>
              <Button href="/produk" variant="outline" className="text-sm sm:text-base justify-center">
                View Our Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal - Mobile Optimized */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl z-10">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-neutral-900 mb-2">
                      {selectedProject.title}
                    </h2>
                    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 text-xs sm:text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {selectedProject.year}
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {selectedProject.location}
                      </div>
                      <span className="bg-primary-100 text-primary-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full capitalize text-xs">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-neutral-400 hover:text-neutral-600 transition-colors flex-shrink-0"
                  >
                    <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Main Image */}
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg sm:rounded-xl mb-4 sm:mb-6 flex items-center justify-center overflow-hidden relative">
                  {selectedProject.image && selectedProject.image !== '/uploads/placeholder.jpg' ? (
                    <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                      loading="lazy"
                      quality={80}
                      sizes="(max-width: 768px) 100vw, 896px"
                    />
                  ) : (
                    <div className="text-center text-neutral-600">
                      <p className="text-sm">Project Main Image</p>
                      <p className="text-xs">{selectedProject.title}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Project Overview</h3>
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Deliverables */}
                {selectedProject.deliverables && selectedProject.deliverables.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3">Deliverables</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.deliverables.map((item, index) => (
                        <li key={index} className="flex items-center text-xs sm:text-sm text-neutral-700">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-2 sm:mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Client Info */}
                <div className="bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Client</h4>
                  <p className="text-xs sm:text-sm text-neutral-700">{selectedProject.client}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button href="/contact-us" variant="primary" className="flex-1 text-xs sm:text-sm justify-center">
                    Start Similar Project
                  </Button>
                  <Button 
                    href={`/portofolio/${selectedProject.slug}`} 
                    variant="outline"
                    className="flex items-center text-xs sm:text-sm justify-center"
                  >
                    <ExternalLink size={14} className="mr-2" />
                    View Full Case Study
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Server-side rendering dengan ISR
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Fetch portfolio, categories, and stats in parallel
    const [portfolioResponse, categoriesResponse, homeResponse] = await Promise.all([
      fetch(`${baseUrl}/api/content/portfolio`).catch(() => null),
      fetch(`${baseUrl}/api/content/portfolio-categories`).catch(() => null),
      fetch(`${baseUrl}/api/content/home`).catch(() => null)
    ]);
    
    let transformedPortfolio = [];
    let transformedCategories = [];
    let portfolioStats = {
      projects_completed: '150+',
      happy_clients: '50+',
      years_experience: '5+'
    };

    // Transform portfolio data
    if (portfolioResponse && portfolioResponse.ok) {
      const data = await portfolioResponse.json();
      
      if (data.success && data.portfolio) {
        transformedPortfolio = data.portfolio.map((item, index) => {
          const gallery = item.gallery ? 
            (Array.isArray(item.gallery) ? 
              item.gallery.map(img => typeof img === 'object' ? img.url : img) : 
              []) : 
            [];
          
          const year = item.date ? new Date(item.date).getFullYear().toString() : '2024';
          
          return {
            id: index + 1,
            slug: item.slug,
            title: item.name || 'Untitled Project',
            name: item.name || 'Untitled Project',
            category: item.category || 'kaos',
            client: item.client || 'Client',
            location: item.location || 'Jember, Jawa Timur',
            year: year,
            description: item.description || '',
            image: item.image || '/uploads/placeholder.jpg',
            images: gallery,
            deliverables: [],
            details: item.details || '',
            testimonial: item.testimonial || '',
            client_name: item.client_name || item.client || ''
          };
        });
      }
    }

    // Transform categories
    if (categoriesResponse && categoriesResponse.ok) {
      const data = await categoriesResponse.json();
      if (data.success && data.categories) {
        transformedCategories = data.categories;
      }
    }

    // Get stats from home data
    if (homeResponse && homeResponse.ok) {
      const data = await homeResponse.json();
      if (data.success && data.home?.portfolio_stats) {
        portfolioStats = data.home.portfolio_stats;
      }
    }

    return {
      props: {
        initialPortfolio: transformedPortfolio,
        initialCategories: transformedCategories,
        initialStats: portfolioStats,
      },
      // Revalidate setiap 1 jam
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialPortfolio: [],
        initialCategories: [],
        initialStats: {
          projects_completed: '150+',
          happy_clients: '50+',
          years_experience: '5+'
        },
      },
      revalidate: 3600,
    };
  }
}
