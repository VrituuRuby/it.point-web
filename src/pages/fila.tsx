import { TicketsTable, Ticket } from "@/components/TicketsTable";
import { api } from "@/lib/api";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Fila() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    useEffect(() => {
        api.get('/tickets').then(res => setTickets(res.data))
    }, [])

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Create Next App</title>
        <title>Titulo foda</title>
      </Head>
      <div className="">
        <div className="flex flex-row flex-1 justify-between gap-2">
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">{tickets.filter(ticket => ticket.status === 'OPEN').length}</p>
            <span className="font-bold text-xl">Em aberto</span>
          </div>
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">{tickets.filter(ticket => ticket.status === 'PENDING').length}</p>
            <span className="font-bold text-xl">Pendente</span>
          </div>
        </div>
      </div>
      <TicketsTable tickets={tickets}/>
    </div>
  );
}
