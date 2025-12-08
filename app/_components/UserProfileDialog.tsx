"use client";

import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User } from "lucide-react";
import { Button } from "./ui/button";
import { useUserInfoStore } from "@/store/useUserInfoStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { updateEmail } from "@/app/actions/users/updateEmail";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    // firstName,
    // lastName,
    // email,
    phoneNumber,
    streetName,
    streetNumber,
    province,
    city,
    postalCode,
    apartment,
    floor,
    observations,
    updateUser,
    fetchUserInfo,
  } = useUserInfoStore();

  const session = useSession();

  const [email, setEmail] = React.useState("");
  //@ts-ignore
  const isEmailVerified = !!session?.data?.user?.emailVerified;

  useEffect(() => {
    if (session?.data?.user?.email) {
      setEmail(session.data.user.email);
    }
  }, [session?.data?.user?.email]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    const userData = {
      phoneNumber,
      streetName,
      streetNumber,
      province,
      city,
      postalCode,
      apartment,
      floor,
      observations,
    };

    try {
      await axios.put("/api/users", userData);

      // Handle Email Update
      if (email !== session.data?.user?.email && !isEmailVerified) {
        const result = await updateEmail(email);
        if (result.error) {
          alert(result.error); // Simple feedback
          return;
        } else {
          alert(result.success);
        }
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Hubo un error al actualizar el usuario:", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserInfo();
    }
  }, [open, fetchUserInfo]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </DialogTitle>
          <DialogDescription>
            Actualiza tu información personal y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <Label htmlFor="firstName">Nombre</Label>
            <Input
              id="firstName"
              value={session?.data?.user?.name ?? ""}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isEmailVerified}
              placeholder={
                isEmailVerified
                  ? "Email verificado (no se puede cambiar)"
                  : "Email"
              }
            />
            {isEmailVerified && (
              <span className="text-xs text-green-600">Verificado</span>
            )}
            {!isEmailVerified && (
              <span className="text-xs text-yellow-600">
                No verificado (Editable)
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <Label htmlFor="phoneNumber">Teléfono</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="streetName">Calle</Label>
            <Input id="streetName" value={streetName} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="streetNumber">Número de calle</Label>
            <Input
              id="streetNumber"
              value={streetNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="province">Provincia</Label>
            <Input id="province" value={province} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="city">Ciudad</Label>
            <Input id="city" value={city} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="postalCode">Código Postal</Label>
            <Input id="postalCode" value={postalCode} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="apartment">Departamento (Opcional) </Label>
            <Input id="apartment" value={apartment} onChange={handleChange} />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="floor">Piso (Opcional)</Label>
            <Input id="floor" value={floor} onChange={handleChange} />
          </div>
          <div className="col-span-1 flex flex-col sm:col-span-2">
            <Label htmlFor="observations">Observaciones (Opcional)</Label>
            <Input
              id="observations"
              value={observations || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
