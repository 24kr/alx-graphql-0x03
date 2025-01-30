import * as Sentry from '@sentry/react';
import React, { ReactNode, ErrorInfo } from 'react';

interface State {
  hasError: boolean;
  error?: Error; // Add error to the state
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }; // Include the error in the state
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to Sentry
    Sentry.captureException(error, { extra: { componentStack: errorInfo.componentStack } });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <p>{this.state.error?.toString()}</p> {/* Display the error message */}
          <button onClick={() => this.setState({ hasError: false })}>
            Try again?
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;