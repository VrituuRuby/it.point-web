import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import { MagnifyingGlass } from "phosphor-react";
import { useContext, useState } from "react";

export function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="flex flex-row px-4 py-2 bg-light-blue text-white items-center justify-between gap-4 box-border">
      <Link href="/">
        <h1 className="font-heading font-bold text-2xl">IT.POINT</h1>
      </Link>
      <div className="flex flex-row gap-2 bg-white flex-1 rounded-lg p-1 items-center">
        <MagnifyingGlass size={24} className="text-base-dark" weight="bold" />
        <input
          className="flex-1 text-base-light text-base"
          type="text"
          placeholder="Pesquisa..."
        />
      </div>
      <div className="flex flex-col">
        <p>{user?.name ?? "Nome"}</p>
        <span>{user?.role ?? "Função"}</span>
      </div>
    </header>
  );
}
