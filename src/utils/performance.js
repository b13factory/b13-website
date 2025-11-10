// Performance monitoring utilities

/**
 * Measure component render time in development
 * @param {string} componentName - Name of the component
 * @param {Function} callback - Render function
 */
export function measureRender(componentName, callback) {
  if (process.env.NODE_ENV === 'development' && typeof performance !== 'undefined') {
    const startTime = performance.now();
    const result = callback();
    const endTime = performance.now();
    console.log(`[Performance] ${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`);
    return result;
  }
  return callback();
}

/**
 * Report Core Web Vitals
 * @param {Object} metric - Web Vital metric
 */
export function reportWebVitals(metric) {
  if (process.env.NODE_ENV === 'production') {
    // You can send metrics to analytics service here
    // Example: analytics.track('Web Vitals', metric)
    
    // For now, log to console in development
    console.log(metric);
  }
}

/**
 * Measure time to interactive (TTI)
 */
export function measureTTI() {
  if (typeof window === 'undefined') return;
  
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('[Performance] LCP:', entry.startTime);
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.error('Performance observer error:', e);
    }
  }
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - DOM element to check
 * @returns {boolean}
 */
export function isElementInViewport(element) {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Prefetch resource for better performance
 * @param {string} url - URL to prefetch
 * @param {string} type - Resource type ('script', 'style', 'image')
 */
export function prefetchResource(url, type = 'script') {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  link.as = type;
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 * @param {string} selector - CSS selector for images
 */
export function lazyLoadImages(selector = 'img[data-src]') {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const images = document.querySelectorAll(selector);
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });
  
  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Get bundle size estimate
 */
export function logBundleSize() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(r => r.name.endsWith('.js'));
    const totalSize = jsResources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    console.log(`[Performance] Total JS Bundle Size: ${(totalSize / 1024).toFixed(2)} KB`);
  }
}
