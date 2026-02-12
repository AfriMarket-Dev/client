import { AlertTriangle, CheckCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "delete" | "suspend" | "confirm";
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "confirm",
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const isDanger = type === "delete" || type === "suspend";
  const icon =
    type === "delete" || type === "suspend" ? AlertTriangle : CheckCircle;
  const Icon = icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full">
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div
              className={`p-3 rounded-full ${
                isDanger ? "bg-red-100" : "bg-primary/10"
              }`}
            >
              <Icon
                size={28}
                className={isDanger ? "text-red-600" : "text-primary"}
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 text-center mb-2">
            {title}
          </h2>

          <p className="text-gray-600 text-center text-sm mb-6">{message}</p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`flex-1 px-4 py-2.5 text-white font-medium rounded-lg transition-all disabled:opacity-50 ${
                isDanger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gradient-to-r from-primary to-amber-500 hover:from-primary hover:to-amber-600"
              }`}
            >
              {isLoading ? "Processing..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
