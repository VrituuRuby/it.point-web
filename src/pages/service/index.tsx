import { ReactElement, useContext, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

import Layout from "@/Layouts/ServiceLayout";
import { TicketsTable } from "../../components/TicketsTable";

import { NextPageWithLayout } from "../_app";

import { getTickets, Ticket } from "@/services/getTickets";
import { getAPIClient } from "@/services/axios";
import { isErrored } from "stream";

interface FilaProps {
  tickets: Ticket[];
}

const Fila: NextPageWithLayout = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    async function getTicketsData() {
      const tickets = await getTickets();
      setTickets(tickets);
    }

    getTicketsData();
  }, []);

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
  const user = JSON.parse(userAsJson);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (user.role === "USER") {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
