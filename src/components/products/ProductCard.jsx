import { memo } from 'react';
import Image from 'next/image';
import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';

// Blur placeholder for better loading UX
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f3f4f6" offset="20%" />
      <stop stop-color="#e5e7eb" offset="50%" />
      <stop stop-color="#f3f4f6" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f3f4f6" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const imageUrl = product.card_image || product.image;
  
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 sm:p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4 md:gap-6">
          <div className="w-full md:w-48 lg:w-56 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg overflow-hidden relative flex-shrink-0" style={{ aspectRatio: '4/5' }}>
            {product.stockType && (
              <div className="absolute top-2 right-2 z-10">
                <span className={`px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                  product.stockType === 'ready' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {product.stockType === 'ready' ? 'Ready Stock' : 'By Order'}
                </span>
              </div>
            )}
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                loading="lazy"
                quality={75}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 48vw, 224px"
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(224, 280))}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-center text-neutral-600 px-2">
                <p className="text-xs sm:text-sm">No Image</p>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 sm:mb-2 text-neutral-900 line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 items-center mb-3">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary-600">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
                {product.originalPrice && (
                  <span className="text-xs sm:text-sm text-neutral-500 line-through">
                    Rp {product.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
              <span className="bg-primary-100 text-primary-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs capitalize">
                {product.category}
              </span>
              <span className="text-xs text-neutral-600">
                Min. Order: {product.minOrder} pcs
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button href={`/produk/${product.slug}`} variant="primary" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                Detail
              </Button>
              <Button href="/contact-us" variant="outline" className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
                Konsultasi
              </Button>
              {product.katalog && (
                <Button 
                  href={product.katalog}
                  variant="outline"
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
                >
                  <Download size={14} className="mr-1 sm:mr-2" />
                  Katalog
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid View - Optimized with next/image
  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 card-hover" style={{ willChange: 'transform' }}>
      <div className="bg-gradient-to-br from-primary-100 to-secondary-100 rounded-t-lg sm:rounded-t-xl overflow-hidden relative" style={{ aspectRatio: '4/5' }}>
        {product.stockType && (
          <div className="absolute top-2 right-2 z-10">
            <span className={`px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
              product.stockType === 'ready' 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {product.stockType === 'ready' ? 'Ready' : 'Order'}
            </span>
          </div>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            loading="lazy"
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(400, 500))}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-center text-neutral-600 px-2">
            <div>
              <p className="text-[10px] sm:text-xs">No Image</p>
              <p className="text-[9px] sm:text-[11px] mt-1 line-clamp-2">{product.name}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="text-sm sm:text-base md:text-xl font-semibold mb-1 sm:mb-2 text-neutral-900 line-clamp-2 leading-snug">
          {product.name}
        </h3>
        <p className="text-[11px] sm:text-xs md:text-sm text-neutral-600 mb-2 sm:mb-3 md:mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-start mb-2 sm:mb-3 md:mb-4 gap-2">
          <div className="flex-1">
            <span className="text-sm sm:text-lg md:text-2xl font-bold text-primary-600 block">
              Rp {product.price.toLocaleString('id-ID')}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-neutral-500 line-through">
                Rp {product.originalPrice.toLocaleString('id-ID')}
              </span>
            )}
          </div>
          <span className="bg-primary-100 text-primary-600 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs capitalize flex-shrink-0">
            {product.category}
          </span>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button 
            href={`/produk/${product.slug}`} 
            variant="primary" 
            className="flex-1 text-[11px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 justify-center"
          >
            Detail
          </Button>
          {product.katalog && (
            <Button 
              href={product.katalog}
              variant="outline"
              className="px-2 sm:px-3 py-1.5 sm:py-2"
              aria-label={`Download katalog ${product.name}`}
            >
              <Download size={14} className="sm:w-4 sm:h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Optimized memo comparison - only re-render if essential props change
export default memo(ProductCard, (prevProps, nextProps) => {
  return (
    prevProps.product.slug === nextProps.product.slug &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.stockType === nextProps.product.stockType
  );
});
