"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Users,
  CalendarDays,
  UserCircle,
  Briefcase,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/me/home", label: "Accueil", icon: House },
  { href: "/me/vie-associative", label: "Vie asso.", icon: Users },
  { href: "/me/activites", label: "Activités", icon: CalendarDays },
  { href: "/me/job", label: "Job", icon: Briefcase },
  { href: "/me/documents", label: "Documents", icon: FileText },
  { href: "/me/profil", label: "Profil", icon: UserCircle },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-card pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-500 active:text-gray-900"
              }`}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
