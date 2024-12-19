import React from "react";
import Header from "@/app/_components/Header";
import { UserAddressForm } from "../_components/UserAddressForm";

const page = () => {
  return (
    <section>
      <Header />
      <UserAddressForm />
    </section>
  );
};

export default page;
