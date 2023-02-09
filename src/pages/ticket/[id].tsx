import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { AxiosResponse } from "axios";
import { NextPageWithLayout } from "../_app";

import Layout from "@/Layouts/ServiceLayout";
import { getAPIClient } from "@/services/axios";

import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
interface Props {
  ticketData: {
    id: string;
    status: string;
    user_id: string;
    user: {
      name: string;
      email: string;
      branch: {
        name: string;
        id: string;
      };
    };
    category: {
      name: string;
      id: string;
    };
    subcategory: {
      name: string;
      id: string;
    };
    title: string;
    description: string;
    phone: string;
    category_id: string;
    subcategory_id: string;
    created_at: string;
    updated_at: string;
  };
}
const Ticket: NextPageWithLayout<Props> = ({ ticketData }) => {
  const createdAt = dayjs(ticketData?.created_at).local();
  const createdAtText = createdAt.format("DD/MM/YYYY - HH:mm");

  return (
    <div className="flex flex-col w-full p-4 gap-2">
      <div className="flex justify-between items-center font-bold text-4xl text-base-dark">
        <h2>TICKET {ticketData.id}</h2>
        <span>{ticketData.status}</span>
      </div>
      <div className="flex-1 flex flex-col gap-2 text-base-dark">
        <div className="bg-background-blue rounded-lg p-4 w-full flex flex-col  gap-2">
          <div className="flex flex-row justify-between items-start">
            <h2 className="text-xl text-base-dark font-bold">
              {ticketData.title}
            </h2>
            <span className="text-base-light text-sm">
              Criado em {createdAtText}
            </span>
          </div>
          <p className="text-base-light flex flex-col">
            <span>
              <b>Usuário solicitante:</b> {ticketData?.user?.name}
            </span>
            <span>
              <b>Categoria:</b> {ticketData?.category?.name}
            </span>
            <span>
              <b>Sub-Categoria:</b> {ticketData?.subcategory?.name}
            </span>
            <span>
              <b>Descrição: </b>
              {ticketData?.description}
            </span>
          </p>

          <div className="bg-background-dark rounded-lg flex flex-row gap-1 p-1 font-bold">
            <button className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md">
              Atender <BsFillPlayFill size={20} />
            </button>
            <button className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md">
              Agendar <AiOutlineClockCircle size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Ticket.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);

  let ticketResponse: AxiosResponse;
  try {
    ticketResponse = await api.get(`/tickets/${ctx.query.id}`);
  } catch {
    return {
      redirect: {
        destination: "/service",
        permanent: false,
      },
    };
  }

  return {
    props: {
      ticketData: ticketResponse.data,
    },
  };
};

export default Ticket;
