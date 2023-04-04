import Link from "next/link";
import { MagnifyingGlass } from "phosphor-react";
import { UserButton } from "./userButton";

export function Header() {
  return (
    <header className="flex flex-row px-4 py-1 bg-light-blue text-white items-center justify-between gap-2 box-border">
      <Link href="/home">
        <h1 className="font-heading font-bold text-2xl px-3">IT.POINT</h1>
      </Link>
      <div className="flex flex-row gap-2 pl-1 bg-white flex-1 rounded-lg items-center overflow-hidden">
        <MagnifyingGlass size={24} className="text-base-dark" weight="bold" />
        <input
          className="flex-1 text-base-light text-base p-1 rounded-lg"
          type="text"
          placeholder="Pesquisa..."
        />
      </div>
      <UserButton />
    </header>
  );
}
