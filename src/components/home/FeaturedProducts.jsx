// website/src/components/home/FeaturedProducts.jsx
'use client';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useProducts } from '@/contexts/ProductsContext';
import { throttle } from '@/utils/animations';

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { products, isLoading } = useProducts(); // Use Context instead of fetch
  const intervalRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Memoize organized products to avoid recalculation
  const { featuredProduct, secondProduct, carouselProducts } = useMemo(() => {
    const featured = products
      .filter(p => p.homePosition === 'featured')
      .sort((a, b) => (a.homeOrder || 999) - (b.homeOrder || 999));
    
    const second = products
      .filter(p => p.homePosition === 'second')
      .sort((a, b) => (a.homeOrder || 999) - (b.homeOrder || 999));
    
    const carousel = products
      .filter(p => p.homePosition === 'carousel')
      .sort((a, b) => (a.homeOrder || 999) - (b.homeOrder || 999));

    // Fallback to old behavior if no homePosition set
    const featuredProduct = featured.length > 0 ? featured[0] : (products.length > 0 ? products[0] : null);
    const secondProduct = second.length > 0 ? second[0] : (products.length > 1 ? products[1] : null);
    const carouselProducts = carousel.length > 0 ? carousel : products.slice(1);

    return { featuredProduct, secondProduct, carouselProducts };
  }, [products]);

  // Memoize stock badge component
  const getStockTypeBadge = useCallback((stockType) => {
    if (stockType === 'ready') {
      return (
        <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-green-500/90 text-white backdrop-blur-md shadow-lg">
          Ready Stock
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-500/90 text-white backdrop-blur-md shadow-lg">
        By Order
      </span>
    );
  }, []);

  // Throttled touch handlers
  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback(throttle((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, 50), []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && carouselProducts.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
    }
    if (isRightSwipe && carouselProducts.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
    }

    setTouchStart(0);
    setTouchEnd(0);
  }, [touchStart, touchEnd, carouselProducts.length]);

  // Auto-play carousel with cleanup
  useEffect(() => {
    if (!carouselProducts || carouselProducts.length <= 1) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
    }, 3500);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [carouselProducts.length]);

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    if (!carouselProducts || carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % carouselProducts.length);
  }, [carouselProducts.length]);

  const prevSlide = useCallback(() => {
    if (!carouselProducts || carouselProducts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  }, [carouselProducts.length]);

  const goToSlide = useCallback((idx) => {
    setCurrentIndex(idx);
  }, []);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 to-white" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 text-lg font-medium">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-gradient-to-b from-white to-neutral-50 py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-3 sm:mb-4">
            Product Updates
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Discover our latest collection of premium products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-xl">Belum ada produk yang tersedia</p>
          </div>
        ) : (
          <>
            {/* Featured Section */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
              {/* Featured Product */}
              {featuredProduct && (
                <Link href={`/produk/${featuredProduct.slug}`} className="block lg:float-left lg:w-[66%] lg:pr-4 mb-4 lg:mb-0 group">
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 h-[350px] sm:h-[400px] lg:h-[500px]" style={{ contain: 'layout paint', willChange: 'transform' }}>
                    {/* Image Background */}
                    <div className="absolute inset-0" style={{ contain: 'paint' }}>
                      {featuredProduct.image ? (
                        <Image
                          src={featuredProduct.image}
                          alt={featuredProduct.name}
                          fill
                          className="object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                          priority
                          quality={85}
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          style={{ willChange: 'transform' }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary-100 to-secondary-100"></div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 flex justify-between items-start gap-2">
                      {featuredProduct.category && (
                        <span className="inline-flex items-center px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                          {featuredProduct.category}
                        </span>
                      )}
                      {getStockTypeBadge(featuredProduct.stockType)}
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 xl:p-12">
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 group-hover:text-primary-300 transition-colors leading-tight">
                        {featuredProduct.name || featuredProduct.title}
                      </h3>
                      {featuredProduct.description && (
                        <p className="text-white/90 text-xs sm:text-sm lg:text-base xl:text-lg mb-3 sm:mb-4 lg:mb-6 line-clamp-2 leading-relaxed">
                          {featuredProduct.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              )}

              {/* Second Product - Desktop Only */}
              {secondProduct && (
                <Link href={`/produk/${secondProduct.slug}`} className="hidden lg:block lg:float-left lg:w-[34%] lg:pl-4 group">
                  <div className="relative h-[500px] rounded-3xl overflow-visible shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <div className="absolute inset-0 rounded-3xl overflow-hidden">
                      <div className="absolute inset-0">
                        {secondProduct.image ? (
                          <Image
                            src={secondProduct.image}
                            alt={secondProduct.name}
                            fill
                            className="object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            quality={80}
                            sizes="34vw"
                            style={{ willChange: 'transform' }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary-100 to-primary-100"></div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                    </div>

                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                      {secondProduct.category && (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                          {secondProduct.category}
                        </span>
                      )}
                      {getStockTypeBadge(secondProduct.stockType)}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                        {secondProduct.name || secondProduct.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              )}
              <div className="clear-both"></div>
            </div>

            {/* Carousel Section */}
            {carouselProducts.length > 0 && (
              <div className="relative">
                <div 
                  className="overflow-hidden"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  <div
                    className="flex gap-3 sm:gap-4 md:gap-6 transition-transform duration-500 ease-out"
                    style={{
                      transform: `translate3d(-${currentIndex * (100 / Math.min(carouselProducts.length, 4))}%, 0, 0)`,
                      willChange: 'transform'
                    }}
                  >
                    {[...carouselProducts, ...carouselProducts].map((product, index) => (
                      <Link
                        href={`/produk/${product.slug}`}
                        key={`${product.slug}-${index}`}
                        className="flex-shrink-0 w-[70%] sm:w-[45%] md:w-[30%] lg:w-[23%] group"
                      >
                        <div className="relative h-[280px] sm:h-[350px] lg:h-[400px] rounded-2xl overflow-visible shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3" style={{ willChange: 'transform' }}>
                          <div className="absolute inset-0 rounded-2xl overflow-hidden">
                            <div className="absolute inset-0">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-contain bg-neutral-100 transform group-hover:scale-105 transition-transform duration-700"
                                  loading="lazy"
                                  quality={75}
                                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                                  style={{ willChange: 'transform' }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300"></div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            </div>
                          </div>

                          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex justify-between items-start z-10">
                            {product.category && (
                              <span className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold bg-primary-500/90 backdrop-blur-md text-white capitalize shadow-lg">
                                {product.category}
                              </span>
                            )}
                            {getStockTypeBadge(product.stockType)}
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-10">
                            <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-primary-300 transition-colors line-clamp-2">
                              {product.name || product.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {carouselProducts.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 bg-white shadow-xl sm:shadow-2xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Previous"
                    >
                      <ChevronLeft size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 bg-white shadow-xl sm:shadow-2xl rounded-full p-2 sm:p-3 lg:p-4 hover:bg-primary-500 hover:text-white transition-all duration-300 transform hover:scale-110 z-10"
                      aria-label="Next"
                    >
                      <ChevronRight size={20} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7" strokeWidth={2.5} />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {carouselProducts.length > 1 && (
                  <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                    {carouselProducts.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          currentIndex % carouselProducts.length === idx ? 'w-6 sm:w-8 bg-primary-500' : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
