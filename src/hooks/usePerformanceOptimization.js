// Advanced performance optimization hook
import { useEffect, useRef, useCallback, useMemo } from 'react';
import { debounce, throttle } from '@/utils/animations';
import { measureRenderTime, isLowEndDevice } from '@/utils/performance';

/**
 * Hook for performance optimization utilities
 * @param {Object} options - Configuration options
 * @returns {Object} Performance utilities
 */
export function usePerformanceOptimization(options = {}) {
  const {
    componentName = 'UnknownComponent',
    enableRenderTracking = process.env.NODE_ENV === 'development',
    enableResourceHints = true
  } = options;

  const renderTimeRef = useRef(null);
  const isLowEnd = useRef(null);
  
  // Memoized low-end device detection
  if (isLowEnd.current === null) {
    isLowEnd.current = isLowEndDevice();
  }

  // Performance tracking
  useEffect(() => {
    if (enableRenderTracking) {
      renderTimeRef.current = measureRenderTime(componentName);
      
      return () => {
        if (renderTimeRef.current) {
          renderTimeRef.current();
        }
      };
    }
  });

  // Optimized debounce with cleanup
  const createOptimizedDebounce = useCallback((func, delay = 300) => {
    const debouncedFn = debounce(func, delay);
    
    return (...args) => {
      // Reduce delay for low-end devices
      if (isLowEnd.current && delay > 100) {
        return debounce(func, Math.max(delay * 0.7, 100))(...args);
      }
      return debouncedFn(...args);
    };
  }, []);

  // Optimized throttle with cleanup
  const createOptimizedThrottle = useCallback((func, limit = 100) => {
    const throttledFn = throttle(func, limit);
    
    return (...args) => {
      // Increase limit for low-end devices
      if (isLowEnd.current && limit < 200) {
        return throttle(func, Math.min(limit * 1.5, 200))(...args);
      }
      return throttledFn(...args);
    };
  }, []);

  // Prefetch resources for better performance
  const prefetchResources = useCallback((resources = []) => {
    if (!enableResourceHints || typeof window === 'undefined') return;

    resources.forEach(({ href, as = 'fetch', type = 'prefetch' }) => {
      const link = document.createElement('link');
      link.rel = type;
      link.as = as;
      link.href = href;
      
      // Add to head if not already present
      if (!document.querySelector(`link[href="${href}"]`)) {
        document.head.appendChild(link);
      }
    });
  }, [enableResourceHints]);

  // Memory cleanup utility
  const cleanup = useCallback(() => {
    // Clear any timeouts, intervals, or event listeners
    // This should be called in useEffect cleanup
    if (renderTimeRef.current) {
      renderTimeRef.current = null;
    }
  }, []);

  // Memoized performance config based on device capabilities
  const performanceConfig = useMemo(() => ({
    shouldReduceAnimations: isLowEnd.current,
    shouldLazyLoad: isLowEnd.current,
    imageQuality: isLowEnd.current ? 60 : 75,
    animationDuration: isLowEnd.current ? 200 : 300,
    throttleDelay: isLowEnd.current ? 150 : 100,
    debounceDelay: isLowEnd.current ? 200 : 300
  }), []);

  return {
    isLowEndDevice: isLowEnd.current,
    performanceConfig,
    createOptimizedDebounce,
    createOptimizedThrottle,
    prefetchResources,
    cleanup
  };
}

export default usePerformanceOptimization;