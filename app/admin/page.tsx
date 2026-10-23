"use client";
import { UserContent } from "@/components/admin/UserContent";
import { OrderContent } from "@/components/admin/OrderContent";
import { useState } from "react";
export default function Page() {
  const [selectedButton, setSelectedButton] = useState("orders");
  return (
    <>
      {selectedButton === "users" && <UserContent />}
      {selectedButton === "orders" && <OrderContent />}
    </>
  );
}
