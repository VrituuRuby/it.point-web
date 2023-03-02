import { Ticket } from "@/services/getTickets";
import dayjs from "dayjs";
import Link from "next/link";
import { MdUnfoldMore } from "react-icons/md";
import { Status } from "../pages/service/components/Status";

const columns = [
  "Nº",
  "Estado",
  "Ultima Ação",
  "Data de Criação",
  "Categoria",
  "Título",
  "Solicitante",
];

interface TicketsTableProps {
  tickets: Ticket[];
}

export function TicketsTable({ tickets }: TicketsTableProps) {
  return (
    <div className="grid grid-cols-ticket-table text-base-dark border border-background-dark rounded-lg overflow-hidden">
      <div className="contents">
        {columns.map((col) => (
          <div
            key={col}
            className="font-bold flex justify-between items-center px-2 py-1.5 bg-background-dark border-r border-gray-400 last:border-r-0"
          >
            {col}
            <MdUnfoldMore size={20} />
          </div>
        ))}
      </div>

      {tickets.map((ticket) => {
        return (
          <Link
            className="contents"
            key={ticket.id}
            href={`/ticket/${ticket.id}`}
          >
            <div className="px-4 py-2 flex justify-center items-center bg-background-light border-background-dark border-b border-r">
              {ticket.id}
            </div>
            <div className="px-4 py-2 flex justify-center items-center bg-background-light border-background-dark border-b border-r uppercase font-bold">
              <Status status={ticket.status} />
            </div>
            <div className="px-4 py-2 flex flex-col justify-center items-center bg-background-light border-background-dark border-b border-r">
              {ticket?.updated_at ? (
                <>
                  <span>
                    {dayjs(ticket.updated_at).format("DD/MM/YY").toString()}
                  </span>
                  <span>
                    {dayjs(ticket.updated_at).format("HH:mm").toString()}
                  </span>
                </>
              ) : (
                "-"
              )}
            </div>
            <div className="px-4 py-2 flex flex-col justify-center items-center bg-background-light border-background-dark border-b border-r">
              <span>{dayjs(ticket?.created_at).format("DD/MM/YY")}</span>
              <span>{dayjs(ticket?.created_at).format("HH:mm")}</span>
            </div>
            <div className="px-4 py-2 flex flex-col justify-center bg-background-light border-background-dark border-b border-r">
              <span className="text-base-light text-sm">
                {ticket.category.name}
              </span>
              {ticket.subcategory.name}
            </div>
            <div className="px-4 py-2 flex justify-start items-center bg-background-light border-background-dark border-b border-r">
              {ticket.title}
            </div>
            <div className="px-4 py-2 flex justify-start text-base-light items-center bg-background-light border-background-dark border-b">
              {ticket.user.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
