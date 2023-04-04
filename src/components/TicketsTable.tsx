import { Ticket } from "@/services/getTickets";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdUnfoldMore } from "react-icons/md";
import { Status } from "../pages/service/components/Status";

const columns: columnName[] = [
  "Nº",
  "Estado",
  "Ultima Ação",
  "Data de Criação",
  "Categoria",
  "Título",
  "Solicitante",
];

type columnName =
  | "Nº"
  | "Estado"
  | "Ultima Ação"
  | "Data de Criação"
  | "Categoria"
  | "Título"
  | "Solicitante";

interface TicketsTableProps {
  tickets: Ticket[];
}

const SORTER = {
  Categoria: (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.category.name > ticketB.category.name) return 1;
      if (ticketA.category.name < ticketB.category.name) return -1;
      return 0;
    });
  },
  "Data de Criação": (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.created_at > ticketB.created_at) return 1;
      if (ticketA.created_at < ticketB.created_at) return -1;
      return 0;
    });
  },
  Estado: (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.status > ticketB.status) return 1;
      if (ticketA.status < ticketB.status) return -1;
      return 0;
    });
  },
  Nº: (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.id > ticketB.id) return 1;
      if (ticketA.id < ticketB.id) return -1;
      return 0;
    });
  },
  Solicitante: (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.user.name > ticketB.user.name) return 1;
      if (ticketA.user.name < ticketB.user.name) return -1;
      return 0;
    });
  },
  Título: (func: Ticket[]) => {
    return func.sort((ticketA, ticketB) => {
      if (ticketA.title > ticketB.title) return 1;
      if (ticketA.title < ticketB.title) return -1;
      return 0;
    });
  },
  "Ultima Ação": (func: Ticket[]) => {
    const lists = func.sort((ticketA, ticketB) => {
      if (ticketA.updated_at > ticketB.updated_at) return 1;
      if (ticketA.updated_at < ticketB.updated_at) return -1;
      return 0;
    });
    console.log(lists);

    return lists;
  },
} as const;

export function TicketsTable({ tickets: ticketsInOrder }: TicketsTableProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(ticketsInOrder);
  }, [ticketsInOrder]);

  let desc = false;
  function changeOrderBy(string: columnName) {
    desc = !desc;
    const tickets = SORTER[string];
    const orderedTickets = tickets(ticketsInOrder);
    setTickets([...orderedTickets]);
  }

  return (
    <div className="grid grid-cols-ticket-table text-base-dark border border-background-dark rounded-lg overflow-hidden">
      <div className="contents">
        {columns.map((col) => (
          <button
            onClick={() => changeOrderBy(col)}
            key={col}
            className="font-bold flex justify-between items-center px-2 py-1.5 bg-background-dark border-r border-gray-400 last:border-r-0"
          >
            {col}
            <MdUnfoldMore size={20} />
          </button>
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
