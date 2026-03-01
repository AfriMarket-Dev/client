import {
  RiChat1Line,
  RiChat3Line,
  RiHeartFill,
  RiHeartLine,
  RiPhoneLine,
} from "@remixicon/react";
import type React from "react";
import { Button } from "@/components/ui/button";
import type { Service } from "./types";

interface MobileActionsProps {
  service: Service;
  isInWishlist: boolean;
  onToggleWishlist: () => void;
  onContactClick: () => void;
  trackAndNavigate: (
    type: "CALL_CLICK" | "EMAIL_CLICK" | "WHATSAPP_CLICK",
    href: string,
  ) => void;
}

export const MobileActions: React.FC<MobileActionsProps> = ({
  service,
  isInWishlist,
  onToggleWishlist,
  onContactClick,
  trackAndNavigate,
}) => {
  const phone = service?.company?.phone ?? "";

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-3 py-2 z-50 flex items-center gap-1.5 safe-area-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {phone && (
        <button
          type="button"
          onClick={() => trackAndNavigate("CALL_CLICK", `tel:${phone}`)}
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-muted border border-border text-foreground active:bg-accent transition-colors"
        >
          <RiPhoneLine className="w-4 h-4" />
        </button>
      )}
      {phone && (
        <button
          type="button"
          onClick={() =>
            trackAndNavigate(
              "WHATSAPP_CLICK",
              `https://wa.me/${phone.replace(/\D/g, "")}`,
            )
          }
          className="flex-none w-11 h-11 flex items-center justify-center rounded-sm bg-emerald-500 text-white active:bg-emerald-600 transition-colors"
        >
          <RiChat1Line className="w-5 h-5" />
        </button>
      )}
      <Button
        variant="outline"
        size="icon"
        className="flex-none w-11 h-11 rounded-sm border-primary/20 text-primary active:bg-primary/10 transition-colors"
        onClick={onToggleWishlist}
      >
        {isInWishlist ? (
          <RiHeartFill className="w-5 h-5 text-primary" />
        ) : (
          <RiHeartLine className="w-5 h-5" />
        )}
      </Button>
      <Button
        variant="outline"
        size="lg"
        className="flex-1 font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
        onClick={onContactClick}
      >
        <RiChat3Line className="w-3.5 h-3.5 mr-1.5" />
        Message
      </Button>
      <Button
        size="lg"
        className="flex-[1.5] font-heading font-bold uppercase tracking-widest text-[10px] h-11 rounded-none bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
        onClick={onContactClick}
      >
        Inquire
      </Button>
    </div>
  );
};
