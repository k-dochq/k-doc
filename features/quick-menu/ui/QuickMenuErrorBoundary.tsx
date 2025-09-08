'use client';

import { Component, type ReactNode } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { QuickMenuError } from './QuickMenuError';

interface Props {
  children: ReactNode;
  lang: Locale;
  dict: Dictionary;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class QuickMenuErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('QuickMenu Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <QuickMenuError
            lang={this.props.lang}
            dict={this.props.dict}
            error={this.state.error}
            onRetry={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      );
    }

    return this.props.children;
  }
}
