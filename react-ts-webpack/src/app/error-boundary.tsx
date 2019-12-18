import * as React from 'react';

interface ComponentProps {}

interface ComponentState {
  hasError: boolean;
  error?: Error;
  info?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ info, error, hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Error</div>;
    }
    return this.props.children;
  }
}
