import type { Metadata } from "next";
import BottomNav from "@/components/bottom-nav";

export const metadata: Metadata = {
  title: "Espace Membre",
  description: "Espace membre de la CCJA",
};

export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen pb-16">
      {children}
      <BottomNav />
    </div>
  );
}
