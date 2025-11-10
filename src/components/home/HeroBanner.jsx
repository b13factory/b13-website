'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useHomeData } from '@/contexts/HomeContext';
import { 
  getVerticalAlignment, 
  getHorizontalAlignment, 
  getTextAlignment,
  getTitleSize,
  getSubtitleSize
} from '@/utils/positioning';
import { 
  getMarqueeBgColor, 
  getMarqueeTextColor 
} from '@/utils/colors';
import { 
  getAnimationDuration 
} from '@/utils/animations';
import { formatMarkdown } from '@/utils/markdown';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [fadeVisible, setFadeVisible] = useState(true);
  const [currentMarqueeIndex, setCurrentMarqueeIndex] = useState(0);
  const { homeData, isLoading } = useHomeData();

  const defaultHeroData = {
    slides: [
      {
        id: 1,
        image: '/uploads/hero-1.jpg',
        title: 'GARMENT AND ADVERTISING',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
    ]
  };

  const defaultMarqueeData = {
    enabled: true,
    texts: [{ text: "✦ Buka Setiap Hari Pukul 09.00 - 17.00 WIB" }],
    bg_color: "primary",
    text_color: "white",
    speed: "medium"
  };

  // Transform homeData menjadi heroData dan marqueeData
  const { heroData, marqueeData } = useMemo(() => {
    if (!homeData) {
      return { heroData: defaultHeroData, marqueeData: defaultMarqueeData };
    }

    // Transform hero banners data dari CMS format ke format slides
    const heroBanners = homeData.hero_banners || [];
    
    const slides = heroBanners.map((banner, index) => ({
      id: index + 1,
      image: banner.image || '/uploads/hero-1.jpg',
      title: banner.title || 'GARMENT AND ADVERTISING',
      description: banner.subtitle || ' ',
      button_text: banner.button_text,
      button_link: banner.button_link,
      text_position: banner.text_position
    }));
    
    // Fallback jika tidak ada banners
    if (slides.length === 0) {
      slides.push({
        id: 1,
        image: '/uploads/hero-1.jpg',
        title: 'GARMENT AND ADVERTISING',
        description: ' ',
        button_text: 'Lihat Produk',
        button_link: '/produk'
      });
    }

    // Get marquee settings from home content
    const marquee = homeData.marquee_banner;
    const transformedMarquee = marquee ? {
      enabled: marquee.enabled !== false,
      texts: marquee.texts && marquee.texts.length > 0 ? marquee.texts : [{ text: "✦ Buka Setiap Hari Pukul 09.00 - 17.00 WIB" }],
      bg_color: marquee.bg_color || 'primary',
      text_color: marquee.text_color || 'white',
      speed: marquee.speed || 'medium'
    } : defaultMarqueeData;
    
    return { 
      heroData: { slides }, 
      marqueeData: transformedMarquee 
    };
  }, [homeData]);

  // Use useCallback untuk stable function references
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (!heroData?.slides) return 0;
      return (prev + 1) % heroData.slides.length;
    });
  }, [heroData]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => {
      if (!heroData?.slides) return 0;
      return (prev - 1 + heroData.slides.length) % heroData.slides.length;
    });
  }, [heroData]);

  // Auto slide effect
  useEffect(() => {
    if (isLoading || !heroData?.slides || heroData.slides.length <= 1 || isHovering) {
      return;
    }

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isLoading, heroData, isHovering, nextSlide]);

  // Sequential marquee animation
  useEffect(() => {
    if (!marqueeData || !marqueeData.enabled || marqueeData.texts.length === 0) return;
    
    const animationDuration = getAnimationDuration(marqueeData.speed);
    
    // Reset animation by toggling state
    const restartInterval = setInterval(() => {
      setFadeVisible(false);
      setTimeout(() => {
        setFadeVisible(true);
        // If multiple texts, cycle through them
        if (marqueeData.texts.length > 1) {
          setCurrentMarqueeIndex((prev) => (prev + 1) % marqueeData.texts.length);
        }
      }, 100);
    }, animationDuration);

    return () => clearInterval(restartInterval);
  }, [marqueeData]);

  // Loading state
  if (isLoading || !heroData || !marqueeData) {
    return (
      <section 
        className="relative h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center" 
        style={{ marginTop: '-64px' }}
      >
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  const { slides } = heroData;
  
  // Get current marquee text
  const currentMarqueeText = marqueeData?.texts?.[currentMarqueeIndex]?.text || "✦ Buka Setiap Hari Pukul 09.00 - 17.00 WIB";

  // Pastikan currentSlide valid
  const safeCurrentSlide = Math.min(currentSlide, slides.length - 1);
  const currentSlideData = slides[safeCurrentSlide] || slides[0];

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ marginTop: '-64px' }}
    >
      {/* Background Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === safeCurrentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ willChange: index === safeCurrentSlide ? 'opacity' : 'auto' }}
          >
            {slide.image ? (
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                loading={index === 0 ? undefined : 'lazy'}
                quality={85}
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-2xl mb-4">B13 Factory</p>
                  <p className="text-lg">{slide.title}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

      {/* Hero Content - Mobile Optimized with Dynamic Positioning */}
      <div className={`relative z-30 h-full flex px-4 pt-16 ${getVerticalAlignment(currentSlideData.text_position?.vertical)} ${getHorizontalAlignment(currentSlideData.text_position?.horizontal)}`}>
        <div className={`max-w-4xl ${getTextAlignment(currentSlideData.text_position?.text_align)}`}>
          <h1 className={`font-bold mb-4 sm:mb-6 leading-tight text-white ${getTitleSize(currentSlideData.text_position?.title_size)}`}>
            {currentSlideData.title}
          </h1>
          <div 
            className={`mb-6 sm:mb-8 leading-relaxed max-w-3xl text-white prose prose-invert ${getSubtitleSize(currentSlideData.text_position?.subtitle_size)}`}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(currentSlideData.description) }}
          />
          {currentSlideData.button_text && (
            <Button 
              href={currentSlideData.button_link}
              variant="primary"
            >
              {currentSlideData.button_text}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Controls - Mobile Optimized */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-40 flex space-x-2 sm:space-x-4">
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all hover:scale-110 border border-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 sm:p-3 transition-all hover:scale-110 border border-white/30"
            aria-label="Next slide"
          >
            <ChevronRight size={20} className="text-white sm:w-6 sm:h-6" />
          </button>
        </div>
      )}

      {/* Marquee Banner - Sequential Scrolling Animation */}
      {marqueeData?.enabled && (
        <div className={`absolute bottom-0 left-0 right-0 ${getMarqueeBgColor(marqueeData.bg_color)} backdrop-blur-sm py-4 sm:py-5 overflow-hidden z-30`}>
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: '2rem' }}>
            {fadeVisible && (
              <div 
                className="absolute w-full flex items-center justify-center animate-marquee-single"
                style={{
                  animationDuration: `${getAnimationDuration(marqueeData.speed)}ms`
                }}
              >
                <span className={`${getMarqueeTextColor(marqueeData.text_color)} font-semibold text-base sm:text-lg whitespace-nowrap`}>
                  {currentMarqueeText}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide Indicators - Mobile Optimized */}
      {slides.length > 1 && (
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-40 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === safeCurrentSlide ? 'bg-white scale-125' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
