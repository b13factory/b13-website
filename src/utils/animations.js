// Shared animation utilities

/**
 * Get animation duration based on speed setting
 * @param {string} speed - 'slow', 'medium', or 'fast'
 * @returns {number} Duration in milliseconds
 */
export function getAnimationDuration(speed) {
  const durationMap = {
    slow: 20000,
    medium: 15000,
    fast: 10000
  };
  return durationMap[speed] || 15000;
}

/**
 * Create optimized CSS transform for carousel
 * @param {number} index - Current index
 * @param {number} itemsPerView - Number of items visible
 * @returns {object} Transform style object
 */
export function getCarouselTransform(index, itemsPerView = 4) {
  return {
    transform: `translate3d(-${index * (100 / itemsPerView)}%, 0, 0)`,
    willChange: 'transform'
  };
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for scroll/resize events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in ms
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Request animation frame wrapper for smooth animations
 * @param {Function} callback - Animation callback
 * @returns {number} Request ID
 */
export function smoothAnimation(callback) {
  return requestAnimationFrame(callback);
}
