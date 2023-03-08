import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

import Layout from "@/Layouts/ServiceLayout";

import { NextPageWithLayout } from "../_app";

import { Ticket } from "@/services/getTickets";
import { TicketsTable } from "@/components/TicketsTable";
import { getAPIClient } from "@/services/axios";

interface FilaProps {
  tickets: Ticket[];
}

const Fila: NextPageWithLayout<FilaProps> = ({ tickets: ticketsOrder }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(ticketsOrder);
  }, [ticketsOrder]);

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Service Desk - Fila</title>
      </Head>
      <div>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["@it.point-token"]: token, ["@it.point-user"]: userAsJson } =
    parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = JSON.parse(userAsJson);

  if (user.role === "USER") {
    return {
      redirect: {
        destination: "/userArea",
        permanent: false,
      },
    };
  }

  const api = getAPIClient(ctx);

  const ticketsResponse = await api.get("/tickets");

  return {
    props: {
      tickets: ticketsResponse.data,
    },
  };
};
