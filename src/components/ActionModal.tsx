import { X } from "lucide-react";
import { type ReactNode } from "react";

interface ActionModalProps {
  isOpen: boolean;
  type: "delete" | "suspend" | "warning" | "success" | "info";
  title: string;
  description?: string;
  message?: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmValue?: string;
  inputValue?: string;
  inputPlaceholder?: string;
  inputLabel?: string;
  onInputChange?: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
}

export default function ActionModal({
  isOpen,
  type,
  title,
  description,
  message,
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmValue,
  inputValue,
  inputPlaceholder,
  inputLabel,
  onInputChange,
  onConfirm,
  onCancel,
  isLoading = false,
  isDisabled = false,
  children,
}: ActionModalProps) {
  if (!isOpen) return null;

  // Color configuration based on type
  const colorConfig = {
    delete: {
      icon: "bg-red-100",
      iconColor: "text-red-600",
      button: "bg-red-600 hover:bg-red-700 disabled:bg-gray-300",
      warning: "bg-red-50 border-red-200 text-red-800",
    },
    suspend: {
      icon: "bg-yellow-100",
      iconColor: "text-yellow-600",
      button: "bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    warning: {
      icon: "bg-primary/10",
      iconColor: "text-primary",
      button: "bg-primary hover:bg-primary/90 disabled:bg-gray-300",
      warning: "bg-primary/5 border-primary/20 text-primary",
    },
    success: {
      icon: "bg-green-100",
      iconColor: "text-green-600",
      button: "bg-green-600 hover:bg-green-700 disabled:bg-gray-300",
      warning: "bg-green-50 border-green-200 text-green-800",
    },
    info: {
      icon: "bg-blue-100",
      iconColor: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300",
      warning: "bg-blue-50 border-blue-200 text-blue-800",
    },
  };

  const colors = colorConfig[type];

  return (
    <div className="fixed inset-[-50px] bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            {icon && (
              <div
                className={`w-12 h-12 ${colors.icon} rounded-full flex items-center justify-center flex-shrink-0`}
              >
                {icon}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {message && (
            <div className={`border rounded-lg p-4 ${colors.warning}`}>
              <p className="text-sm">{message}</p>
            </div>
          )}

          {children && <div>{children}</div>}

          {inputLabel && onInputChange && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inputLabel}
              </label>
              <input
                type="text"
                value={inputValue || ""}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {confirmValue && (
                <p className="text-xs text-gray-500 mt-2">
                  Enter "{confirmValue}" exactly to enable confirm button
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isDisabled || isLoading}
            className={`flex-1 px-4 py-3 text-white font-medium rounded-lg disabled:cursor-not-allowed transition-colors ${colors.button}`}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
