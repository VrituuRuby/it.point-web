import Layout from "@/Layouts/ServiceLayout";
import { getAPIClient } from "@/services/axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const Ticket: NextPageWithLayout = () => {
  const router = useRouter();
  return <h1>TICKET {router.query.id}</h1>;
};

Ticket.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);

  const ticketResponse = await api.get(`/ticket/${ctx.query.id}`);

  console.log(ticketResponse.data);

  return {
    props: {},
  };
};

export default Ticket;
