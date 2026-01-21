// src/components/ClientLayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import Footer from "./Footer";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAgentRoute = pathname?.startsWith("/agent/");
//   const isAgentRegisterRoute = pathname?.startsWith("/agent-registration");

  return (
    <>
      {!isAgentRoute && <Header />}
      {children}
      {!isAgentRoute && <Footer />}
    </>
  );
}