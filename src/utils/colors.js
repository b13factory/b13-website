// Shared color mapping utilities

/**
 * Get Tailwind background color class based on color name
 * @param {string} color - Color name
 * @returns {string} Tailwind class
 */
export function getMarqueeBgColor(color) {
  const colorMap = {
    primary: 'bg-primary-600/90',
    blue: 'bg-blue-600/90',
    green: 'bg-green-600/90',
    red: 'bg-red-600/90',
    purple: 'bg-purple-600/90',
    orange: 'bg-orange-600/90',
    teal: 'bg-teal-600/90',
    slate: 'bg-slate-600/90',
    black: 'bg-black/90'
  };
  return colorMap[color] || 'bg-primary-600/90';
}

/**
 * Get Tailwind text color class based on color name
 * @param {string} color - Color name
 * @returns {string} Tailwind class
 */
export function getMarqueeTextColor(color) {
  const colorMap = {
    white: 'text-white',
    black: 'text-black',
    gray: 'text-gray-700'
  };
  return colorMap[color] || 'text-white';
}

/**
 * Get gradient color classes for services/features
 * @param {string} color - Color name
 * @returns {string} Tailwind gradient classes
 */
export function getGradientColorClasses(color) {
  const gradientMap = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-green-500 to-emerald-500',
    orange: 'from-orange-500 to-red-500',
    purple: 'from-purple-500 to-pink-500',
    red: 'from-red-500 to-orange-500',
    teal: 'from-teal-500 to-cyan-500'
  };
  return gradientMap[color] || 'from-primary-500 to-secondary-500';
}

/**
 * Get color by index for dynamic color assignment
 * @param {number} index - Array index
 * @returns {string} Color name
 */
export function getColorByIndex(index) {
  const colors = ['blue', 'green', 'orange', 'purple', 'red', 'teal'];
  return colors[index % colors.length];
}
