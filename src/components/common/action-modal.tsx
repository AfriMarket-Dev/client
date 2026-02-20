import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
  onConfirm?: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: ReactNode;
  showFooter?: boolean;
}

export function ActionModal({
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
  onConfirm = () => {},
  onCancel,
  isLoading = false,
  isDisabled = false,
  children,
  showFooter = true,
}: ActionModalProps) {
  const colorConfig = {
    delete: {
      media: "bg-red-100",
      iconColor: "text-red-600",
      variant: "destructive" as const,
      warning: "bg-red-50 border-red-200 text-red-800",
    },
    suspend: {
      media: "bg-yellow-100",
      iconColor: "text-yellow-600",
      variant: "default" as const,
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    },
    warning: {
      media: "bg-primary/10",
      iconColor: "text-primary",
      variant: "default" as const,
      warning: "bg-primary/5 border-primary/20 text-primary",
    },
    success: {
      media: "bg-green-100",
      iconColor: "text-green-600",
      variant: "default" as const,
      warning: "bg-green-50 border-green-200 text-green-800",
    },
    info: {
      media: "bg-blue-100",
      iconColor: "text-blue-600",
      variant: "default" as const,
      warning: "bg-blue-50 border-blue-200 text-blue-800",
    },
  };

  const config = colorConfig[type];

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          {(icon || config.media) && (
            <AlertDialogMedia className={config.media}>
              <div className={config.iconColor}>{icon}</div>
            </AlertDialogMedia>
          )}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <div className="space-y-4 py-2">
          {message && (
            <div className={`border rounded-lg p-4 text-sm ${config.warning}`}>
              {message}
            </div>
          )}

          {children}

          {inputLabel && onInputChange && (
            <div className="space-y-2">
              <Label>{inputLabel}</Label>
              <Input
                type="text"
                value={inputValue || ""}
                onChange={(e) => onInputChange(e.target.value)}
                placeholder={inputPlaceholder}
                className="h-11 shadow-none"
              />
              {confirmValue && (
                <p className="text-xs text-muted-foreground">
                  Enter "{confirmValue}" exactly to enable confirm button
                </p>
              )}
            </div>
          )}
        </div>

        {showFooter && (
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onCancel} disabled={isLoading}>
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                onConfirm();
              }}
              disabled={isDisabled || isLoading}
              variant={config.variant}
            >
              {isLoading ? "Processing..." : confirmText}
            </AlertDialogAction>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
