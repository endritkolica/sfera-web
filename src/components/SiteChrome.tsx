"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function SiteChrome() {
  const pathname = usePathname();
  if (pathname.startsWith("/adminedit")) return null;
  return <Navbar />;
}
