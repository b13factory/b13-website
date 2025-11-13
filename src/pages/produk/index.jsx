import Head from 'next/head';
import { useState, useRef, useEffect, useMemo } from 'react';
import { Filter, Grid, List, Download, Search, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/products/ProductCard';
import ProductBanner from '@/components/products/ProductBanner';
import Pagination from '@/components/ui/Pagination';
import { sortOptions } from '@/data/products';

// Helper functions for data transformation
const parsePrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (!priceString) return 0;
  return parseInt(priceString.replace(/[Rp\s.]/g, ''), 10) || 0;
};

const parseArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'object' && item.item) return item.item;
      if (typeof item === 'string') return item;
      return String(item);
    });
  }
  return [];
};

const parseImages = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map(item => {
      if (typeof item === 'object' && item.url) return item.url;
      if (typeof item === 'string') return item;
      return String(item);
    });
  }
  return [];
};

const parseVariants = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return [];
};

export default function Produk({ initialProducts, initialCategories }) {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  
  // Filter and search state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState('grid');
  const [loading] = useState(false);
  const [error] = useState(null);

  const productsPerPage = 6;

  // State untuk kategori dropdown
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const closeTimeoutRef = useRef(null);

  // Filter products berdasarkan kategori dan pencarian
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term) ||
        product.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    
    switch (sortBy) {
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [sortedProducts, currentPage, productsPerPage]);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const totalProducts = sortedProducts.length;
  const showingProducts = paginatedProducts.length;

  // Get current category data
  const currentCategory = useMemo(() => {
    return categories.find(cat => cat.slug === selectedCategory) || null;
  }, [categories, selectedCategory]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, sortBy]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Handle mouse enter - cancel any pending close and open dropdown
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsCategoryOpen(true);
  };

  // Handle mouse leave - delay closing the dropdown
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsCategoryOpen(false);
    }, 400); // 400ms delay sebelum menutup
  };

  return (
    <>
      <Head>
        <title>Produk Garment & Advertising - B13 Factory Jember</title>
        <meta name="description" content="Katalog lengkap produk garment dan konfeksi B13 Factory Jember: Kaos custom, jersey, seragam, jaket, kemeja. Kualitas premium dengan harga kompetitif. Sablon & bordir berkualitas." />
        <meta name="keywords" content="produk garment jember, kaos custom jember, jersey printing jember, seragam kantor jember, jaket custom, sablon kaos jember, bordir jember, konfeksi jember" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Produk Garment & Konfeksi - B13 Factory Jember" />
        <meta property="og:description" content="Katalog lengkap produk garment dan konfeksi B13 Factory Jember: Kaos custom, jersey, seragam, jaket, kemeja. Kualitas premium dengan harga kompetitif." />
        <meta property="og:url" content="https://b13garment.id/produk" />
        <meta property="og:type" content="website" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://b13garment.id/produk" />
      </Head>

      {/* Dynamic Banner based on Category */}
      <ProductBanner category={currentCategory} />

      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar Filter - Hidden on Mobile, Shown on Desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="bg-slate-50 rounded-xl p-6 sticky top-24">
                {/* Search Box */}
                <div className="mb-6">
                  <label htmlFor="search-desktop" className="sr-only">Cari produk</label>
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      id="search-desktop"
                      type="text"
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Category Filter - Desktop */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-900">
                    <Filter size={20} className="mr-2 text-blue-600" />
                    Kategori
                  </h3>
                  
                  <div 
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center justify-between bg-white border-2 border-slate-200 rounded-lg px-4 py-3 cursor-pointer hover:border-blue-500 transition-all">
                      <span className="font-medium text-slate-700">
                        {categories.find(c => c.id === selectedCategory)?.name || 'Semua Kategori'}
                      </span>
                      <ChevronDown 
                        size={20} 
                        className={`text-slate-600 transition-transform duration-200 ${
                          isCategoryOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    <div 
                      className={`absolute top-full left-0 right-0 mt-2 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-[100] transition-all duration-200 ${
                        isCategoryOpen 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
                        {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          if (closeTimeoutRef.current) {
                            clearTimeout(closeTimeoutRef.current);
                          }
                          setIsCategoryOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-white text-slate-700 hover:bg-blue-50 border border-transparent hover:border-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{category.name}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedCategory === category.id
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {category.count}
                          </span>
                        </div>
                      </button>
                    ))}
                    </div>
                  </div>
                </div>
              </div>

                {/* Download Katalog */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Katalog</h3>
                  <Button 
                    href="/katalog/katalog-lengkap.pdf"
                    variant="outline"
                    className="w-full justify-center text-sm"
                  >
                    <Download size={18} className="mr-2" />
                    Download Katalog Lengkap
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="w-full lg:w-3/4">
              {/* Mobile Filter Bar */}
              <div className="lg:hidden mb-6 space-y-3">
                {/* Kategori Label */}
                <h3 className="text-base font-semibold text-slate-900 flex items-center">
                  <Filter size={18} className="mr-2 text-blue-600" />
                  Kategori
                </h3>
                
                {/* Search + Category Dropdown Row */}
                <div className="flex gap-2">
                  {/* Search Box */}
                  <div className="flex-1 relative">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Cari..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  {/* Category Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-slate-300 rounded-lg bg-white hover:border-blue-500 transition-all whitespace-nowrap text-sm"
                    >
                      <Filter size={16} />
                      <ChevronDown size={16} className={`transition-transform ${
                        isCategoryOpen ? 'rotate-180' : ''
                      }`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isCategoryOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50">
                        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                          {categories.map(category => (
                            <button
                              key={category.id}
                              onClick={() => {
                                setSelectedCategory(category.id);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                                selectedCategory === category.id
                                  ? 'bg-blue-500 text-white'
                                  : 'hover:bg-blue-50 text-slate-700'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{category.name}</span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  selectedCategory === category.id
                                    ? 'bg-white/20 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {category.count}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-neutral-600">
                    Menampilkan {showingProducts} dari {totalProducts} produk
                    {searchTerm && (
                      <span className="block sm:inline"> untuk "<strong>{searchTerm}</strong>"</span>
                    )}
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  {/* Sort Options */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="sort" className="text-xs sm:text-sm text-neutral-600 whitespace-nowrap">
                      Urutkan:
                    </label>
                    <select
                      id="sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="border border-neutral-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-xs sm:text-sm"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* View Toggle */}
                  <div className="flex bg-neutral-100 rounded-lg p-0.5 sm:p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan grid"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid size={16} className="sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-1.5 sm:p-2 rounded-md transition-all ${
                        viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-500'
                      }`}
                      aria-label="Tampilan list"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List size={16} className="sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Download Katalog - Mobile */}
                  <Button 
                    href="/katalog/katalog-lengkap.pdf"
                    variant="outline"
                    className="lg:hidden px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm"
                  >
                    <Download size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              {/* Empty State */}
              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-neutral-600 text-sm sm:text-base md:text-lg mb-4">Tidak ada produk yang ditemukan</p>
                  <Button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                      setSortBy('name');
                    }}
                    variant="primary"
                    className="text-sm"
                  >
                    Reset Filter
                  </Button>
                </div>
              )}

              {/* Product Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="grid" 
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {paginatedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode="list" 
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// Server-side rendering dengan ISR
export async function getStaticProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
    // Fetch products and categories in parallel
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${baseUrl}/api/content/products`).catch(() => null),
      fetch(`${baseUrl}/api/content/product-categories`).catch(() => null)
    ]);
    
    let transformedProducts = [];
    let transformedCategories = [];

    if (productsResponse && productsResponse.ok) {
      const productsData = await productsResponse.json();
      
      if (productsData.success && productsData.products) {
        transformedProducts = productsData.products.map((product, index) => ({
          id: index + 1,
          slug: product.slug,
          name: product.name || 'Untitled Product',
          category: product.category || 'kaos',
          price: parsePrice(product.price),
          originalPrice: parsePrice(product.originalPrice),
          home_image: product.images_section?.home_image || product.home_image || product.image || '/uploads/placeholder.jpg',
          card_image: product.images_section?.card_image || product.card_image || product.image || '/uploads/placeholder.jpg',
          detail_image: product.images_section?.detail_image || product.detail_image || product.image || '/uploads/placeholder.jpg',
          image: product.image || product.images_section?.detail_image || '/uploads/placeholder.jpg',
          images: parseImages(product.images),
          description: product.description || '',
          features: parseArray(product.features),
          katalog: product.katalog || '',
          tags: parseArray(product.tags),
          inStock: product.inStock !== false,
          minOrder: product.minOrder || 1,
          stockType: product.stockType || 'order',
          variants: parseVariants(product.variants),
          body: product.body || ''
        }));
      }
    }

    if (categoriesResponse && categoriesResponse.ok) {
      const categoriesData = await categoriesResponse.json();
      
      if (categoriesData.success && categoriesData.categories) {
        // Calculate product counts for each category
        const categoryCounts = {};
        transformedProducts.forEach(product => {
          const cat = product.category || 'kaos';
          categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
        });

        transformedCategories = categoriesData.categories.map(cat => ({
          id: cat.slug,
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          banners: cat.banners || [],
          color: cat.color || 'blue',
          icon: cat.icon || 'Package',
          is_default: cat.is_default || false,
          count: cat.slug === 'all' ? transformedProducts.length : (categoryCounts[cat.slug] || 0)
        }));
      }
    }

    return {
      props: {
        initialProducts: transformedProducts,
        initialCategories: transformedCategories,
      },
      // Revalidate setiap 1 jam
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        initialProducts: [],
        initialCategories: [],
      },
      revalidate: 3600,
    };
  }
}