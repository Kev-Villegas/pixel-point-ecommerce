"use client";

import React from "react";
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

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    streetName,
    streetNumber,
    province,
    city,
    postalCode,
    apartment,
    floor,
    updateUser,
  } = useUserInfoStore();

  // here we handle the form directly with the state managed by Zustand.!
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser({ [e.target.id]: e.target.value });
  };

  const handleSave = async () => {
    // console.log("Usuario actualizado:", {
    //   firstName,
    //   lastName,
    //   email,
    //   phoneNumber,
    //   streetName,
    //   streetNumber,
    //   province,
    //   city,
    //   postalCode,
    //   apartment,
    //   floor,
    // });
    const userData = {
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
    };

    try {
      const response = await axios.put("/api/users", userData, {
        // headers: {
        // "Content-Type": "application/json",
        // Si necesitas autenticación, agrega el token:
        // Authorization: `Bearer ${token}`,
        // },
      });

      console.log("Usuario actualizado:", response.data);
      onOpenChange(false);
    } catch (error) {
      console.error("Hubo un error al actualizar el usuario:", error);
    }

    onOpenChange(false);
  };

  const session = useSession();
  console.log(session);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span>Perfil</span>
          </DialogTitle>
          <DialogDescription>
            Actualiza tu información personal y guarda los cambios.
          </DialogDescription>
        </DialogHeader>

        {/* Formulario */}
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
          {/* <div className="flex flex-col">
            <Label htmlFor="lastName">Apellido</Label>
            <Input id="lastName" value={lastName} onChange={handleChange} disabled/>
          </div> */}
          <div className="flex flex-col">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={session?.data?.user?.name ?? ""}
              onChange={handleChange}
              disabled
            />
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
        </div>

        <DialogFooter>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileDialog;
