// Performance monitoring utilities

/**
 * Measure component render time
 * @param {string} componentName - Component name for logging
 * @returns {Function} Cleanup function
 */
export function measureRenderTime(componentName) {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    if (renderTime > 16.67) { // More than one frame (60fps)
      console.warn(`⚠️ ${componentName} render took ${renderTime.toFixed(2)}ms`);
    }
  };
}

/**
 * Report Web Vitals to analytics
 * @param {Object} metric - Web Vital metric
 */
export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production' && window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

/**
 * Create performance observer for monitoring
 * @param {string} type - Type of entry to observe
 * @param {Function} callback - Callback function
 */
export function createPerformanceObserver(type, callback) {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
    return null;
  }

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry);
      }
    });

    observer.observe({ type, buffered: true });
    return observer;
  } catch (e) {
    console.warn('PerformanceObserver not supported:', e);
    return null;
  }
}

/**
 * Measure API call performance
 * @param {string} endpoint - API endpoint
 * @param {Function} apiCall - API call function
 * @returns {Promise} API response
 */
export async function measureAPICall(endpoint, apiCall) {
  const startTime = performance.now();
  
  try {
    const response = await apiCall();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 1000) {
      console.warn(`⚠️ API call to ${endpoint} took ${duration.toFixed(2)}ms`);
    }
    
    return response;
  } catch (error) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.error(`❌ API call to ${endpoint} failed after ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}

/**
 * Check if device is low-end
 * @returns {boolean}
 */
export function isLowEndDevice() {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check memory (if available)
  const memory = navigator.deviceMemory || 4;
  
  // Check connection speed
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const slowConnection = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
  
  return cores < 4 || memory < 4 || slowConnection;
}

/**
 * Prefetch resources for better performance
 * @param {string} url - URL to prefetch
 * @param {string} type - Resource type (script, style, image)
 */
export function prefetchResource(url, type = 'fetch') {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = type;
  link.href = url;
  
  document.head.appendChild(link);
}

/**
 * Preload critical resources
 * @param {string} url - URL to preload
 * @param {string} type - Resource type
 */
export function preloadResource(url, type = 'fetch') {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = type;
  link.href = url;
  
  document.head.appendChild(link);
}