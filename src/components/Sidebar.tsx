import { RiDashboardFill } from "react-icons/ri";
import { FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { NavLink } from "./NavLink";
export function Sidebar() {

  const router = useRouter();

  return (
    <div className="flex flex-col bg-zinc-800 text-white text-base p-3 gap-2">
      <a
        href="#dashboard"
        className="flex flex-row gap-2 px-2 py-1 font-bold hover:bg-zinc-700 rounded-lg"
      >
        <RiDashboardFill size="24" />
        <p>Dashboard</p>
      </a>
      <NavLink to="/fila">
        <FaTicketAlt size="24" />
        <p>Fila</p>
      </NavLink>
      <a
        href="#novo"
        className="flex flex-row gap-2 px-2 py-1 font-bold hover:bg-zinc-700 rounded-lg"
      >
        <FaPlusCircle size="24" />
        <p>Novo Ticket</p>
      </a>
    </div>
  );
}
