"use client";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { AlertDialogDemo } from "../Alert";

interface Props {
  id: number;
}

export default function DeleteButton({ id }: Props) {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/products/${id}`);
      location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  return (
    <AlertDialogDemo
      button="Borrar"
      confirmation="Estas seguro?"
      description="El producto se eliminara permanentemente"
      handleAction={() => handleDelete(id)}
      icon={<Trash2 />}
    />
  );
}
