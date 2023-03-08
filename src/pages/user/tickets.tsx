import { ReactElement, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";

import Layout from "@/Layouts/ServiceLayout";
import { TicketsTable } from "../../components/TicketsTable";

import { NextPageWithLayout } from "../_app";

import { getUserTickets, Ticket } from "@/services/getTickets";
import { AxiosResponse } from "axios";
import { api } from "@/services/api";
import { getAPIClient } from "@/services/axios";

interface UserTickets {
  userTickets: Ticket[];
}

const UserTickets: NextPageWithLayout<UserTickets> = ({ userTickets }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    setTickets(userTickets);
  }, []);

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <Head>
        <title>Meus Tickets | it.point</title>
      </Head>
      <h3>Meus tickets</h3>
      <TicketsTable tickets={tickets} />
    </div>
  );
};

UserTickets.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UserTickets;

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

  const api = getAPIClient(ctx);

  const ticketsResponse = await api.get(`/tickets/user`);

  return {
    props: {
      userTickets: ticketsResponse.data,
    },
  };
};
