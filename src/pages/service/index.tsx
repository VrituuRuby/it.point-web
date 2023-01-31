import Layout from "@/Layouts/Layout";
import { getTickets, Ticket } from "@/services/tickets/getTickets";
import { useAuth } from "@/services/useAuth";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import { TicketsTable } from "./components/TicketsTable";

const Fila: NextPageWithLayout = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useAuth();

  useEffect(() => {
    async function setTicketData() {
      const data = await getTickets();
      setTickets(data);
    }

    setTicketData();
  }, []);

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Service Desk - Fila</title>
      </Head>
      <div className="">
        <div className="flex flex-row flex-1 justify-between gap-2">
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">
              {tickets.filter((ticket) => ticket.status === "OPEN").length}
            </p>
            <span className="font-bold text-xl">Em aberto</span>
          </div>
          <div className="flex flex-col rounded-lg bg-background-light p-4 text-base-light justify-center items-center flex-1">
            <p className="text-5xl font-extrabold font-san">
              {tickets.filter((ticket) => ticket.status === "PENDING").length}
            </p>
            <span className="font-bold text-xl">Pendente</span>
          </div>
        </div>
      </div>
      <TicketsTable tickets={tickets} />
    </div>
  );
};

Fila.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Fila;
