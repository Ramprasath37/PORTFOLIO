import { ReactNode } from "react";
import { Header } from "./Header";
import { BottomNav } from "./BottomNav";
import { MobileThemeToggle } from "./MobileThemeToggle";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <MobileThemeToggle />
      <main className="pb-24 md:pb-0 md:pt-24">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
