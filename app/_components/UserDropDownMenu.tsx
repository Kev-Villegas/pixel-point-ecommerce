"use client";

import Link from "next/link";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import React, { useState } from "react";
import UserProfileDialog from "./UserProfileDialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BookHeart, LogOut, Shield, User, WalletCards } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "./ui/dropdown-menu";

interface UserDropDownMenuProps {
  session: Session;
}

const UserDropDownMenu: React.FC<UserDropDownMenuProps> = ({ session }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const userName = session.user?.name || session.user?.email?.split("@")[0];
  const userInitial = userName ? userName[0].toUpperCase() : "U";

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user?.image || ""}
                referrerPolicy="no-referrer"
                alt={session.user?.name || "Usuario"}
              />
              <AvatarFallback>{userInitial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name || "Usuario"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email || "usuario@ejemplo.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem
              className="cursor-pointer hover:bg-muted"
              onClick={() => {
                setIsDialogOpen(true);
                setIsDropdownOpen(false);
              }}
            >
              <User className="h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted">
              <Link href="/orders" className="flex items-center">
                <WalletCards className="h-4 w-4" />
                <span>Mis Pedidos</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted">
              <Link href="/favorites" className="flex items-center">
                <BookHeart className="h-4 w-4" />
                <span>Favoritos</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {session.user?.role === "ADMIN" && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/protected/dashboard" className="flex items-center">
                  <Shield className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
            )}
            {session.user?.role === "ADMIN" && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/protected/products" className="flex items-center">
                  <Shield className="h-4 w-4" />
                  <span>Productos</span>
                </Link>
              </DropdownMenuItem>
            )}
            {session.user?.role === "ADMIN" && (
              <DropdownMenuItem
                asChild
                className="cursor-pointer hover:bg-muted"
              >
                <Link href="/protected/orders" className="flex items-center">
                  <Shield className="h-4 w-4" />
                  <span>Ordenes</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="group cursor-pointer hover:bg-muted-foreground">
            <Link href="/api/auth/signout" className="flex w-full items-center">
              <LogOut className="mr-2 h-4 w-4 font-bold group-hover:font-extrabold group-hover:text-red-800" />
              <span>Cerrar sesión</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
};

export default UserDropDownMenu;
