// Custom hook for Intersection Observer (lazy loading, animations)
import { useEffect, useRef, useState } from 'react';

/**
 * Hook to detect when element enters viewport
 * @param {Object} options - Intersection Observer options
 * @returns {Array} [ref, isIntersecting, hasIntersected]
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    };

    const observer = new IntersectionObserver(([entry]) => {
      const isElementIntersecting = entry.isIntersecting;
      setIsIntersecting(isElementIntersecting);
      
      // Track if element has ever intersected (for one-time animations)
      if (isElementIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, defaultOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options.threshold, options.rootMargin, hasIntersected]);

  return [ref, isIntersecting, hasIntersected];
}

export default useIntersectionObserver;