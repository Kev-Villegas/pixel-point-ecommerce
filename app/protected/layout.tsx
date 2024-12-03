import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../_lib/authOptions";

const ProtectedLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
