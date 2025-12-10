"use client";

import { useAuthModal } from "@/app/_hooks/useAuthModal";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/app/_components/ui/dialog";

export default function AuthModal() {
  const { isOpen, view, onClose } = useAuthModal();

  const handleOpenChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="border-none bg-transparent p-0 shadow-none sm:max-w-md">
        <DialogTitle className="sr-only">
          {view === "signin" ? "Iniciar Sesión" : "Crear Cuenta"}
        </DialogTitle>
        <div className="hide-scrollbar max-h-[85vh] w-full overflow-y-auto rounded-xl border bg-white shadow-sm md:max-h-[95vh]">
          {view === "signin" && <SignInForm isModal />}
          {view === "signup" && <SignUpForm isModal />}
        </div>
      </DialogContent>
    </Dialog>
  );
}
