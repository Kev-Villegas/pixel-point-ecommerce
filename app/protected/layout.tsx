"use client";
import { useState } from "react";
import AdminLogo from "../_components/admin/AdminLogo";
import AdminNav from "../_components/admin/AdminNav";

const ProtectedLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="flex items-center p-2 md:hidden">
        <button onClick={() => setShowNav(!showNav)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="mr-6 flex grow justify-center">
          <AdminLogo />
        </div>
      </div>
      <div className="flex">
        <AdminNav show={showNav} />
        <div className="flex-grow p-4">{children}</div>
      </div>
    </div>
  );
};

export default ProtectedLayout;
