"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Me", href: "/"},
  { label: "Experience", href: "/experience"},
  { label: "Projects", href: "/projects"},
  // { label: "Skills", href: "/#skills"},
  { label: "Ask AI", href: "/chat"},
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between pt-8 sm:pt-12 pb-6 border-b border-[#161616]/10">
      <Link
        href="/"
        className="text-[15px] font-semibold tracking-[-0.04em] text-[#161616] transition-opacity hover:opacity-70"
      >
        Xavi Far.
      </Link>

      <nav className="flex items-center gap-4 sm:gap-6 text-[13.5px] tracking-[-0.03em]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-center gap-1.5"
            >
              <span
                className={
                  isActive
                    ? "font-medium text-[#161616] underline underline-offset-4 decoration-[#161616]/40"
                    : "text-[#161616]/60 transition-colors duration-200 group-hover:text-[#161616]"
                }
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
