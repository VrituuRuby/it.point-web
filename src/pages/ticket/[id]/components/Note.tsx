import { AuthContext } from "@/contexts/AuthContext";
import { spawn } from "child_process";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { motion } from "framer-motion";

dayjs.extend(utc);

interface NoteProps {
  noteData: {
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
  };
}

function handleStatus(status: "OPEN" | "PENDING" | "IN_PROGRESS" | "CLOSED") {
  switch (status) {
    case "CLOSED":
      return "Concluído";
    case "IN_PROGRESS":
      return "Em andamento";
    case "OPEN":
      return "Em aberto";
    case "PENDING":
      return "Pendente retorno";
  }
}

function handlePublicStatus(isPublic: boolean) {
  const className = "rounded-lg p-4 w-full flex flex-col gap-1";

  if (isPublic) {
    return className + " bg-background-yellow";
  }
  return className + " bg-background-dark";
}

export function Note({ noteData }: NoteProps) {
  const createdAtDate = dayjs(noteData.created_at)
    .utcOffset(-3)
    .format("DD/MM/YYYY - HH:mm")
    .toString();

  return (
    <motion.div
      initial={{ scaleY: 0, opacity: 0, display: "hidden" }}
      animate={{ scaleY: 1, opacity: 1, display: "flex" }}
      transition={{ ease: "easeInOut", delay: 0.2 }}
      className={handlePublicStatus(noteData.isPublic)}
    >
      <h2 className="text-xl text-base-dark font-bold">
        {noteData.user.name} - {handleStatus(noteData.status)}
      </h2>
      <span className="text-base-light text-sm">
        {noteData.isPublic ? "Público" : "Privado"}
      </span>
      <p className="text-base-light flex flex-col whitespace-pre-wrap">
        {noteData.description}
      </p>
      <span className="text-base-light text-sm text-right">
        Ação realizada em em {createdAtDate}
      </span>
    </motion.div>
  );
}
