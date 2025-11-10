import { memo } from 'react';
import Link from 'next/link';

const Button = memo(function Button({ 
  children, 
  href, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false,
  ...props 
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500/20 transform hover:-translate-y-0.5',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-500/20 transform hover:-translate-y-0.5',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500/20 transform hover:-translate-y-0.5',
    ghost: 'text-primary-500 hover:bg-primary-50 focus:ring-primary-500/20',
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    // External link
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return (
        <a
          href={href}
          className={classes}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
        </a>
      );
    }
    
    // Internal link
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // Button element
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
