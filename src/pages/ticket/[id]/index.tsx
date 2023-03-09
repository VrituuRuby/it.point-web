import { ReactElement, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { AxiosError, AxiosResponse } from "axios";
import { NextPageWithLayout } from "../../_app";

import Layout from "@/Layouts/ServiceLayout";
import { getAPIClient } from "@/services/axios";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Note } from "./components/Note";
import { Information } from "./components/Information";
import { AddNote } from "./components/AddNote";
import Head from "next/head";
import { parseCookies } from "nookies";
import { User } from "phosphor-react";

dayjs.extend(utc);
interface Props {
  ticketData: {
    id: string;
    status: "OPEN" | "PENDING" | "IN_PROGRESS" | "CLOSED";
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
    notes: note[];
    title: string;
    description: string;
    phone: string;
    category_id: string;
    subcategory_id: string;
    created_at: string;
    updated_at: string;
  };
}

interface note {
  id: string;
  user_id: string;
  status: "OPEN" | "PENDING" | "IN_PROGRESS" | "CLOSED";
  description: string;
  isPublic: boolean;
  created_at: string;
  ticket_id: number;
  user: {
    id: string;
    name: string;
  };
}

function StatusStyleHandler(
  status: "OPEN" | "PENDING" | "IN_PROGRESS" | "CLOSED"
) {
  switch (status) {
    case "OPEN":
      return <span className="text-yellow">EM ABERTO</span>;
    case "IN_PROGRESS":
      return <span className="text-green">EM ANDAMENTO</span>;
    case "PENDING":
      return <span className="text-blue">PENDENTE RETORNO</span>;
    case "CLOSED":
      return <span className="text-green">CONCLUÍDO</span>;
  }
}

const Ticket: NextPageWithLayout<Props> = ({ ticketData }) => {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [notes, setNotes] = useState<note[]>([]);

  const [status, setStatus] = useState(ticketData?.status);

  useEffect(() => {
    setNotes(ticketData?.notes);
  }, [ticketData.notes]);

  function updateNotes(note: note) {
    const newNotes = notes;
    newNotes.unshift(note);
    setNotes(newNotes);

    setStatus(note.status);
    setIsAddingNote(false);
  }

  function toggleAddNote() {
    isAddingNote ? setIsAddingNote(false) : setIsAddingNote(true);
  }

  return (
    <div className="flex flex-col flex-1 w-full p-4 gap-2">
      <Head>
        <title>TICKET {ticketData.id} | it.point</title>
      </Head>
      <div className="flex justify-between items-center font-bold text-4xl text-base-dark">
        <h2>TICKET {ticketData?.id}</h2>
        {StatusStyleHandler(status)}
      </div>
      <div className="flex-1 flex flex-col gap-4 text-base-dark">
        <Information ticketData={ticketData} toggleAddNote={toggleAddNote} />
        <AddNote
          ticket_id={ticketData?.id}
          updateNotes={updateNotes}
          display={isAddingNote}
        />
        {notes?.map((note) => (
          <Note key={note?.id} noteData={note} />
        ))}
      </div>
    </div>
  );
};

Ticket.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const api = getAPIClient(ctx);

  const { ["@it.point-token"]: token, ["@it.point-user"]: userAsJSON } =
    parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let ticketResponse: AxiosResponse;
  try {
    ticketResponse = await api.get(`/tickets/single/${ctx.query.id}`);
  } catch (err: any) {
    console.table(err);

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
