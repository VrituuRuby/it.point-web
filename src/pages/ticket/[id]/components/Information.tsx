import dayjs from "dayjs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface TicketDataProps {
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
    notes: {
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
    }[];
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
  toggleAddNote: () => void;
}

export function Information({ ticketData, toggleAddNote }: TicketDataProps) {
  const createdAtDate = dayjs(ticketData?.created_at)
    .utc()
    .format("DD/MM/YYYY - HH:mm")
    .toString();

  return (
    <div className="w-full flex flex-col gap-2 border-b-2 border-dark-blue pb-2">
      <div className="flex flex-row justify-between items-start">
        <h2 className="text-xl text-base-dark font-bold">{ticketData.title}</h2>
        <span className="text-base-light text-sm">
          Criado em {createdAtDate}
        </span>
      </div>
      <p className="text-base-light flex flex-col whitespace-pre-wrap">
        <span>
          <b>Usuário solicitante:</b> {ticketData?.user?.name}
        </span>
        <span>
          <b>Telefone:</b> {ticketData?.phone}
        </span>
        <span>
          <b>Categoria:</b> {ticketData?.category?.name}
        </span>
        <span>
          <b>Sub-Categoria:</b> {ticketData?.subcategory?.name}
        </span>
        <span className="whitespace-pre-wrap">
          <b>Descrição: </b>
          {ticketData?.description}
        </span>
      </p>

      <div className="flex flex-row gap-1 font-bold">
        <button
          className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md hover:brightness-110 transition-all"
          onClick={toggleAddNote}
        >
          Atender <BsFillPlayFill size={20} />
        </button>
        <button className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md">
          Agendar <AiOutlineClockCircle size={20} />
        </button>
      </div>
    </div>
  );
}
