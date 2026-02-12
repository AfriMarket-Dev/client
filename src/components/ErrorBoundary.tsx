import React, { type ReactNode, type ReactElement } from "react";
import {
  AlertTriangle,
  RefreshCw,
  Copy,
  Home,
  ChevronDown,
} from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: { componentStack: string } | null;
  expandedSections: {
    stackTrace: boolean;
    componentStack: boolean;
  };
  copyFeedback: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  private copyTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      expandedSections: {
        stackTrace: false,
        componentStack: false,
      },
      copyFeedback: false,
    };
  }

  static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error details to console for debugging
    console.error("🚨 Error caught by ErrorBoundary:", error);
    console.error("📍 Component Stack:", errorInfo.componentStack);

    this.setState({
      error,
      errorInfo,
    });
  }

  componentWillUnmount() {
    if (this.copyTimeoutId) {
      clearTimeout(this.copyTimeoutId);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      expandedSections: {
        stackTrace: false,
        componentStack: false,
      },
    });
  };

  handleCopyError = () => {
    if (this.state.error && this.state.errorInfo) {
      const errorDetails = `Error Report - ${new Date().toISOString()}

📋 Error Message:
${this.state.error.toString()}

📍 Stack Trace:
${this.state.error.stack || "No stack trace available"}

🔍 Component Stack:
${this.state.errorInfo.componentStack}

🌐 Browser Info:
${typeof navigator !== "undefined" ? navigator.userAgent : "Unknown"}

📌 URL:
${typeof window !== "undefined" ? window.location.href : "Unknown"}`;

      navigator.clipboard
        .writeText(errorDetails)
        .then(() => {
          this.setState({ copyFeedback: true });
          this.copyTimeoutId = setTimeout(() => {
            this.setState({ copyFeedback: false });
          }, 2000);
        })
        .catch(() => {
          console.error("Failed to copy error details");
        });
    }
  };

  toggleSection = (section: "stackTrace" | "componentStack") => {
    this.setState((prevState) => ({
      expandedSections: {
        ...prevState.expandedSections,
        [section]: !prevState.expandedSections[section],
      },
    }));
  };

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-primary/20 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl">
            {/* Main Error Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-primary px-8 py-8 text-white">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <AlertTriangle size={40} className="flex-shrink-0" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-bold mb-2">
                      Oops! Something Went Wrong
                    </h1>
                    <p className="text-red-100 text-lg">
                      An unexpected error occurred in the application
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Error Message Card */}
                <div className="bg-gradient-to-r from-red-50 to-primary/10 border-l-4 border-red-500 rounded-lg p-6">
                  <h2 className="text-sm font-bold text-red-900 uppercase tracking-wide mb-3">
                    Error Details
                  </h2>
                  <p className="font-mono text-sm text-red-800 break-words bg-white rounded px-4 py-3 border border-red-200">
                    {this.state.error?.toString() || "Unknown error"}
                  </p>
                </div>

                {/* Stack Trace Section */}
                {this.state.error?.stack && (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                    <button
                      onClick={() => this.toggleSection("stackTrace")}
                      className="w-full px-6 py-4 bg-gray-100 hover:bg-gray-150 transition flex items-center justify-between group"
                    >
                      <span className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        📋 Stack Trace
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-gray-600 transition-transform ${
                          this.state.expandedSections.stackTrace
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {this.state.expandedSections.stackTrace && (
                      <pre className="px-6 py-4 bg-slate-950 text-slate-100 text-xs overflow-x-auto font-mono whitespace-pre-wrap break-words border-t border-gray-200 max-h-48 overflow-y-auto">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                )}

                {/* Component Stack Section */}
                {this.state.errorInfo?.componentStack && (
                  <div className="bg-blue-50 rounded-lg border border-blue-200 overflow-hidden">
                    <button
                      onClick={() => this.toggleSection("componentStack")}
                      className="w-full px-6 py-4 bg-blue-100 hover:bg-blue-150 transition flex items-center justify-between group"
                    >
                      <span className="font-semibold text-blue-900 text-sm uppercase tracking-wide">
                        🔍 Component Stack
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-blue-600 transition-transform ${
                          this.state.expandedSections.componentStack
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                    {this.state.expandedSections.componentStack && (
                      <pre className="px-6 py-4 bg-slate-950 text-blue-100 text-xs overflow-x-auto font-mono whitespace-pre-wrap break-words border-t border-blue-200 max-h-48 overflow-y-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                )}

                {/* Debug Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                      ⏰ Timestamp
                    </p>
                    <p className="font-mono text-xs text-slate-800 break-all">
                      {new Date().toISOString()}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 md:col-span-2">
                    <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                      📍 Location
                    </p>
                    <p className="font-mono text-xs text-slate-800 break-all">
                      {typeof window !== "undefined"
                        ? window.location.href
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-gray-50 border-t border-gray-200 px-8 py-6 flex gap-3 flex-wrap">
                <button
                  onClick={this.handleCopyError}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                    this.state.copyFeedback
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-800"
                  }`}
                >
                  <Copy size={18} />
                  {this.state.copyFeedback ? "Copied!" : "Copy Error"}
                </button>
                <button
                  onClick={this.handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-primary hover:from-red-700 hover:to-primary/90 text-white rounded-lg font-semibold transition-all"
                >
                  <RefreshCw size={18} />
                  Try Again
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/";
                  }}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg font-semibold transition-all ml-auto"
                >
                  <Home size={18} />
                  Go Home
                </button>
              </div>

              {/* Footer */}
              <div className="bg-slate-100 px-8 py-4 border-t border-slate-200">
                <p className="text-xs text-slate-600">
                  <strong>💡 Tip:</strong> Copy the error details using the
                  button above and share them with support for faster
                  resolution. The "Try Again" button will attempt to recover
                  from this error.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
