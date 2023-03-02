import { RiDashboardFill } from "react-icons/ri";
import { FaHome, FaPlusCircle, FaTicketAlt } from "react-icons/fa";
import { NavLink } from "./NavLink";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="flex flex-col bg-zinc-800 text-white text-base p-3 gap-2">
      {user.role === "ADMIN" ? (
        <NavLink to="/admin">
          <RiDashboardFill size="24" />
          <p>Admin Area</p>
        </NavLink>
      ) : (
        ""
      )}
      {(user.role === "SERVICE" || user.role === "ADMIN") && (
        <NavLink to="/service">
          <FaTicketAlt size="24" />
          <p>Fila</p>
        </NavLink>
      )}
      <NavLink to="/ticket/create">
        <FaPlusCircle size="24" />
        <p>Novo Ticket</p>
      </NavLink>
      <NavLink to="/home">
        <FaHome size="24" />
        <p>Inicio</p>
      </NavLink>
    </nav>
  );
}
