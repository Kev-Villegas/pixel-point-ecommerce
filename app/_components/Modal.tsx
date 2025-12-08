"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";

interface ModalProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  padding?: string;
  hideCloseButton?: boolean;
  enableScroll?: boolean;
  onClose?: () => void;
}

export function Modal({
  children,
  title = "Authentication",
  description = "Authentication Form",
  maxWidth = "sm:max-w-md",
  minHeight,
  maxHeight,
  padding = "p-0",
  hideCloseButton = false,
  enableScroll = false,
  onClose,
}: ModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsOpen(false);
      if (onClose) {
        onClose();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <Dialog defaultOpen={true} open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        hideCloseButton={hideCloseButton}
        className={`border-none bg-transparent shadow-none ${maxWidth} ${minHeight || ""} ${maxHeight || ""} ${padding} ${enableScroll ? "overflow-y-auto" : ""}`}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
