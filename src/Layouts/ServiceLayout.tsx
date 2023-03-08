import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="flex flex-row flex-1 h-full">
        <Sidebar />
        {children}
      </main>
      <footer className="p-4 bg-dark-blue text-white flex items-center justify-center font-heading font-bold">
        ©Victor Velozo 2023
      </footer>
    </>
  );
}
