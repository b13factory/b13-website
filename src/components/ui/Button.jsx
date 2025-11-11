// website/src/components/ui/Button.jsx
import Link from 'next/link';

export default function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  href, 
  className = '',
  ...props 
}) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
    outline: 'border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white',
  };

  const sizes = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 sm:py-3 px-4 sm:px-6',
    lg: 'py-3 sm:py-4 px-6 sm:px-8 text-base sm:text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}