// Shared positioning and alignment utilities

/**
 * Get vertical alignment class
 * @param {string} vertical - 'top', 'center', or 'bottom'
 * @returns {string} Tailwind class
 */
export function getVerticalAlignment(vertical) {
  const alignmentMap = {
    top: 'items-start',
    center: 'items-center',
    bottom: 'items-end'
  };
  return alignmentMap[vertical] || 'items-center';
}

/**
 * Get horizontal alignment class
 * @param {string} horizontal - 'left', 'center', or 'right'
 * @returns {string} Tailwind class
 */
export function getHorizontalAlignment(horizontal) {
  const alignmentMap = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };
  return alignmentMap[horizontal] || 'justify-center';
}

/**
 * Get text alignment class
 * @param {string} textAlign - 'left', 'center', or 'right'
 * @returns {string} Tailwind class
 */
export function getTextAlignment(textAlign) {
  const alignmentMap = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right'
  };
  return alignmentMap[textAlign] || 'text-center mx-auto';
}

/**
 * Get title size class
 * @param {string} size - 'small', 'medium', 'large', or 'extra-large'
 * @returns {string} Tailwind class
 */
export function getTitleSize(size) {
  const sizeMap = {
    small: 'text-2xl sm:text-3xl md:text-4xl',
    medium: 'text-3xl sm:text-4xl md:text-5xl',
    large: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
    'extra-large': 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl'
  };
  return sizeMap[size] || 'text-3xl sm:text-4xl md:text-5xl lg:text-7xl';
}

/**
 * Get subtitle size class
 * @param {string} size - 'small', 'medium', or 'large'
 * @returns {string} Tailwind class
 */
export function getSubtitleSize(size) {
  const sizeMap = {
    small: 'text-sm sm:text-base md:text-lg',
    medium: 'text-base sm:text-lg md:text-xl',
    large: 'text-lg sm:text-xl md:text-2xl lg:text-3xl'
  };
  return sizeMap[size] || 'text-base sm:text-lg md:text-xl lg:text-2xl';
}
