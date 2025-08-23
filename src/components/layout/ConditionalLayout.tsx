"use client"

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
} 