"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname().replace(/\/$/, "");
  const active = href === "/admin" ? pathname === "/admin" : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link aria-current={active ? "page" : undefined} href={href}>
      {children}
    </Link>
  );
}
