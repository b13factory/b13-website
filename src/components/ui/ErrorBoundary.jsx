// Error Boundary component for better error handling
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to performance monitoring
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
        custom_map: {
          component: this.props.componentName || 'Unknown',
          stack: error.stack
        }
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  render() {
    if (this.state.hasError) {
      const { fallback: Fallback, showDetails = false } = this.props;
      
      // Custom fallback component
      if (Fallback) {
        return <Fallback onRetry={this.handleRetry} />;
      }

      // Default error UI
      return (
        <div className="min-h-[200px] flex items-center justify-center p-8 bg-red-50 rounded-lg border border-red-200">
          <div className="text-center max-w-md">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>
            
            <h3 className="text-lg font-semibold text-red-900 mb-2">
              Something went wrong
            </h3>
            
            <p className="text-red-700 mb-4 text-sm">
              {this.props.message || 'An unexpected error occurred while loading this component.'}
            </p>
            
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm font-medium"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>

            {showDetails && process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left">
                <summary className="text-sm font-medium text-red-800 cursor-pointer">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 p-3 bg-red-100 text-red-800 text-xs rounded border overflow-auto max-h-32">
                  {this.state.error && this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const WithErrorBoundaryComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

export default ErrorBoundary;