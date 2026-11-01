"use client";
import { UserContent } from "@/components/admin/UserContent";
import { OrderContent } from "@/components/admin/OrderContent";
import { useState } from "react";
export default function Page() {
  const [selectedButton, setSelectedButton] = useState("orders");
  return (
    <>
      {selectedButton === "orders" && <OrderContent />}
      {selectedButton === "users" && <UserContent />}
    </>
  );
}
