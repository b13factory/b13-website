import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Calendar, User, ArrowRight, Search, Filter, X } from 'lucide-react';
import { getAllBlogPosts, getAllArticleCategories } from '../../../lib/markdown';

export async function getStaticProps() {
  const posts = getAllBlogPosts();
  const categories = getAllArticleCategories();
  
  // Serialize dates to strings for JSON
  const serializedPosts = posts.map(post => ({
    ...post,
    date: typeof post.date === 'string' ? post.date : post.date.toISOString(),
  }));

  return {
    props: {
      posts: serializedPosts,
      categories,
    },
  };
}

const categoryColors = {
  blue: 'bg-blue-50 text-blue-700 border-blue-200',
  green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  red: 'bg-red-50 text-red-700 border-red-200',
  purple: 'bg-purple-50 text-purple-700 border-purple-200',
  orange: 'bg-orange-50 text-orange-700 border-orange-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
};

export default function ArticlesPage({ posts, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  // Mobile: 6 articles (2 cols x 3 rows), Desktop: 9 articles (3 cols x 3 rows)
  const articlesPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 6 : 9;

  // Filter articles
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + articlesPerPage);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  // Calculate read time
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Get category info
  const getCategoryInfo = (categorySlug) => {
    return categories.find(cat => cat.slug === categorySlug) || { name: categorySlug, color: 'blue' };
  };

  return (
    <>
      <Head>
        <title>Articles & Insights | B13 Factory Garment & Advertising</title>
        <meta 
          name="description" 
          content="Explore expert insights, industry news, and practical guides on garment manufacturing, printing, and corporate branding from B13 Factory." 
        />
      </Head>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight">
              Articles & <span className="text-blue-400">Insights</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-300 leading-relaxed">
              Expert knowledge on garment manufacturing, printing technology, and corporate branding solutions
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Search & Filter Bar - Mobile Optimized */}
          <div className="max-w-6xl mx-auto mb-6 sm:mb-8 md:mb-12">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
              {/* Mobile Layout */}
              <div className="lg:hidden space-y-3">
                {/* Category Label */}
                <h3 className="text-sm font-semibold text-slate-900 flex items-center">
                  <Filter size={16} className="mr-2 text-blue-600" />
                  Kategori
                </h3>
                
                {/* Search + Filter Row */}
                <div className="flex gap-2">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      placeholder="Cari artikel..."
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  {/* Category Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                      className="flex items-center gap-2 px-3 py-2 border-2 border-slate-300 rounded-lg bg-white hover:border-blue-500 transition-all text-sm"
                    >
                      <Filter size={16} />
                      <span className="sr-only">Filter kategori</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isCategoryOpen && (
                      <div className="absolute right-0 top-full mt-2 w-56 bg-white border-2 border-slate-200 rounded-lg shadow-xl z-50">
                        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                          <button
                            onClick={() => {
                              setSelectedCategory('all');
                              setCurrentPage(1);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                              selectedCategory === 'all'
                                ? 'bg-blue-500 text-white'
                                : 'hover:bg-blue-50 text-slate-700'
                            }`}
                          >
                            All Categories
                          </button>
                          {categories.map(category => (
                            <button
                              key={category.slug}
                              onClick={() => {
                                setSelectedCategory(category.slug);
                                setCurrentPage(1);
                                setIsCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                                selectedCategory === category.slug
                                  ? 'bg-blue-500 text-white'
                                  : 'hover:bg-blue-50 text-slate-700'
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

              {/* Desktop Layout */}
              <div className="hidden lg:flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search articles..."
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Active Filters */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="mt-3 sm:mt-4 flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm text-slate-600">Active filters:</span>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm hover:bg-blue-200 transition-colors"
                    >
                      Search: "{searchQuery}"
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  )}
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm hover:bg-blue-200 transition-colors"
                    >
                      {getCategoryInfo(selectedCategory).name}
                      <X size={12} className="sm:w-3.5 sm:h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Results Info */}
          <div className="max-w-6xl mx-auto mb-4 sm:mb-6 md:mb-8">
            <p className="text-xs sm:text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Articles Grid - 2 columns mobile, 3 columns desktop */}
          {currentPosts.length > 0 ? (
            <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
              {currentPosts.map(post => {
                const categoryInfo = getCategoryInfo(post.category);
                const colorClass = categoryColors[categoryInfo.color] || categoryColors.blue;

                return (
                  <Link 
                    href={`/artikel/${post.slug}`} 
                    key={post.slug}
                    className="group"
                  >
                    <article className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                {/* Image */}
                <div className="relative aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  {post.image && post.image !== '/uploads/default-article.jpg' ? (
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center text-slate-400">
                        <svg className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-1 sm:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          <p className="text-[10px] sm:text-xs">Article Image</p>
                        </div>
                      </div>
                    )}
                        
                {/* Category Badge */}
                  <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4">
                    <span className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-semibold border ${colorClass} backdrop-blur-sm`}>
                      {categoryInfo.name}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">

                  {/* Title */}
                  <h2 className="text-sm sm:text-base md:text-xl font-bold mb-2 sm:mb-3 text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-500 pt-2 sm:pt-3 md:pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <Calendar size={12} className="sm:w-3.5 sm:h-3.5" />
                        <span className="truncate">{formatDate(post.date)}</span>
                    </div>
                    <span className="text-[9px] sm:text-xs flex-shrink-0">{calculateReadTime(post.content)}</span>
                  </div>

                  {/* Read More Link */}
                    <div className="mt-2 sm:mt-3 md:mt-4">
                      <div className="inline-flex items-center text-blue-600 font-semibold text-xs sm:text-sm group-hover:gap-2 transition-all">
                        Read More
                      <ArrowRight size={12} className="ml-1 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
                );
              })}
            </div>
          ) : (
            <div className="max-w-6xl mx-auto text-center py-12 sm:py-16">
              <div className="text-slate-400 mb-4">
                <Search size={36} className="sm:w-12 sm:h-12 mx-auto" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-700 mb-2">No articles found</h3>
              <p className="text-sm sm:text-base text-slate-500">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="max-w-6xl mx-auto flex justify-center items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors font-medium text-slate-700 text-xs sm:text-sm"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg font-medium transition-all text-xs sm:text-sm ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors font-medium text-slate-700 text-xs sm:text-sm"
            >
              Next
            </button>
          </div>
          )}
        </div>
      </section>
    </>
  );
}