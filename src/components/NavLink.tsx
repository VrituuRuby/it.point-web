import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { ReactElement, ReactNode } from "react"

interface NavLinkProps{
    children: ReactNode,
    to: string,
}
export function NavLink({children, to, ...rest}: NavLinkProps){    

    const router = useRouter();
    return <Link 
        {...rest}
        href={to}
        className={`flex flex-row gap-2 px-2 py-1 font-bold hover:bg-zinc-700 rounded-lg ${router.asPath === to && 'bg-zinc-600'}`}
    >
        {children}
    </Link>
}