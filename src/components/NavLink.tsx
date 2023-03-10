import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactElement, ReactNode } from "react";

interface NavLinkProps {
  children: ReactNode;
  to: string;
}
export function NavLink({ children, to, ...rest }: NavLinkProps) {
  const router = useRouter();
  return (
    <Link
      className={`flex flex-row gap-2 px-2 py-1 font-bold hover:bg-zinc-700 rounded-lg transition-all ${
        router.asPath === to && "bg-zinc-600"
      }`}
      {...rest}
      href={to}
    >
      {children}
    </Link>
  );
}
