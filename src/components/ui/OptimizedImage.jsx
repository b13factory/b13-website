// Optimized Image component with better loading strategies and error handling
import { useState, useCallback, memo } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

// Optimized shimmer placeholder
const createShimmer = (width, height) => `
<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="#f6f7f8" />
  <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  quality = 75,
  className = '',
  fill = false,
  sizes,
  onLoad,
  onError,
  loading = 'lazy',
  placeholder = 'blur',
  objectFit = 'cover',
  ...props
}) {
  const [imageState, setImageState] = useState('loading');
  const [ref, isIntersecting, hasIntersected] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  const handleLoad = useCallback((e) => {
    setImageState('loaded');
    onLoad?.(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    setImageState('error');
    onError?.(e);
  }, [onError]);

  // Don't load image until it's in viewport (for non-priority images)
  const shouldLoad = priority || hasIntersected;

  if (imageState === 'error') {
    return (
      <div 
        ref={ref}
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height }}
      >
        <span className="text-gray-400 text-sm">Image not available</span>
      </div>
    );
  }

  // Wrapper for fill images to ensure proper parent positioning
  const WrapperComponent = fill ? 'div' : 'div';
  const wrapperStyle = fill 
    ? { position: 'relative', width: '100%', height: '100%' } 
    : { width, height, position: 'relative' };

  return (
    <WrapperComponent 
      ref={ref} 
      className={fill ? `relative w-full h-full ${className}` : className}
      style={wrapperStyle}
    >
      {shouldLoad && src && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          loading={priority ? undefined : loading}
          placeholder={placeholder}
          blurDataURL={`data:image/svg+xml;base64,${toBase64(createShimmer(width, height))}`}
          sizes={sizes || (fill ? '100vw' : `${width}px`)}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit: objectFit,
            willChange: imageState === 'loading' ? 'opacity' : 'auto',
            ...props.style
          }}
          {...props}
        />
      )}
      
      {/* Loading placeholder */}
      {imageState === 'loading' && shouldLoad && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ willChange: 'opacity' }}
        />
      )}
    </WrapperComponent>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;