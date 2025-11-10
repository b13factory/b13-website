// website/src/components/layout/Header.jsx
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { siteConfig } = useSiteConfig();
  const router = useRouter();
  const isHomePage = router.pathname === '/';
  
  // Use ref to track throttle timeout for proper cleanup
  const throttleTimeoutRef = useRef(null);

  // Check if current page is a product detail page (dynamic route)
  const isProductDetailPage = router.pathname.startsWith('/produk/') && router.pathname !== '/produk';
  const isPortfolioDetailPage = router.pathname.startsWith('/portofolio/') && router.pathname !== '/portofolio';
  const isArtikelDetailPage = router.pathname.startsWith('/artikel/') && router.pathname !== '/artikel';
  const isDetailPage = isProductDetailPage || isPortfolioDetailPage || isArtikelDetailPage;

  // Memoized scroll handler with proper throttle implementation
  const handleScroll = useCallback(() => {
    if (throttleTimeoutRef.current) return;
    
    setIsScrolled(window.scrollY > 10);
    
    throttleTimeoutRef.current = setTimeout(() => {
      throttleTimeoutRef.current = null;
    }, 100);
  }, []);

  useEffect(() => {
    // Add scroll event listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Cleanup throttle timeout on unmount
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Default navigation jika CMS belum load
  const defaultNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Produk', href: '/produk' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Portofolio', href: '/portofolio' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
  ];
  
  // Gunakan navigation dari CMS atau fallback ke default
  const navigation = siteConfig?.header_navigation 
    ? [...siteConfig.header_navigation].sort((a, b) => a.order - b.order)
    : defaultNavigation;

  // Background style berdasarkan kondisi - solid untuk detail pages, transparent untuk pages dengan banner
  const getHeaderBackground = () => {
    // Detail pages always have solid background
    if (isDetailPage) {
      return 'bg-white shadow-sm';
    }
    // Other pages: transparent when at top, solid when scrolled
    return isScrolled 
      ? 'bg-white/95 backdrop-blur-md shadow-sm' 
      : 'bg-transparent';
  };

  // Text color berdasarkan kondisi
  const getTextColor = () => {
    // Detail pages always have dark text
    if (isDetailPage) {
      return 'text-neutral-900';
    }
    // Other pages: white when at top, dark when scrolled
    if (!isScrolled) {
      return 'text-white';
    } else {
      return 'text-neutral-900';
    }
  };

  const getLinkColor = () => {
    // Detail pages always have dark text with hover
    if (isDetailPage) {
      return 'text-neutral-700 hover:text-primary-500';
    }
    // Other pages: white when at top, dark when scrolled
    if (!isScrolled) {
      return 'text-white/90 hover:text-white';
    } else {
      return 'text-neutral-700 hover:text-primary-500';
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderBackground()} ${getTextColor()}`}>
      <nav className="container-custom px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Logo - Mobile Optimized */}
          <Link href="/" className="flex items-center space-x-2">
            {siteConfig?.logo ? (
              <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                <Image 
                  src={siteConfig.logo} 
                  alt={siteConfig.title || 'B13 Factory'}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ) : (
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors ${
              !isScrolled && !isDetailPage ? 'bg-white/20' : 'bg-primary-500'
            }`}>
              <span className="text-white font-bold text-sm sm:text-base">B13</span>
            </div>
            )}
            <span className="text-base sm:text-lg font-bold truncate max-w-[150px] sm:max-w-none">
              {siteConfig?.title || 'B13 Factory'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium text-sm lg:text-base transition-colors duration-200 ${getLinkColor()}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden p-2 transition-colors ${getTextColor()}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Improved */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-colors ${
            !isScrolled && !isDetailPage ? 'border-white/20' : 'border-neutral-200'
          }`}>
            <div className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium py-2 px-2 text-base transition-colors ${getLinkColor()}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
