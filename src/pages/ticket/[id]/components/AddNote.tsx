import { api } from "@/services/api";
import { easeInOut, motion } from "framer-motion";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import { AiOutlineSend } from "react-icons/ai";

interface AddNoteProps {
  ticket_id: string;
  updateNotes: (note: any) => void;
  display: boolean;
}

interface FormData {
  status: "PENDING" | "OPEN" | "CLOSED" | "IN_PROGRESS";
  description: string;
  isPublic: boolean;
  sendEmail: boolean;
}

export function AddNote({ ticket_id, updateNotes, display }: AddNoteProps) {
  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      isPublic: true,
      sendEmail: true,
      description: "",
    },
  });

  async function onSubmit({
    description,
    isPublic,
    sendEmail,
    status,
  }: FormData) {
    const response = await api.post(`/tickets/${ticket_id}/notes/create`, {
      description,
      isPublic,
      status,
    });

    reset();
    updateNotes(response.data);
  }

  const transitionList = {
    hidden: { height: 0, opacity: 0, display: "hidden", padding: 0 },
    visible: { height: "auto", opacity: 1, display: "flex" },
  };

  return (
    <motion.div
      className="bg-background-blue rounded-lg p-4 w-full flex flex-col justify-between gap-2 overflow-hidden"
      initial={{ height: 0, opacity: 0, display: "hidden" }}
      animate={display ? "visible" : "hidden"}
      variants={transitionList}
      transition={{ ease: "easeInOut", duration: 0.2 }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
        <h2 className="text-xl text-base-dark font-bold">Atendendo</h2>
        <select
          className="w-full px-2 py-1 bg-white rounded-lg border border-background-light text-base-light"
          {...register("status", { required: true })}
        >
          <option value="" disabled hidden className="text-background-light">
            Estado
          </option>
          <option value="OPEN">EM ABERTO</option>
          <option value="PENDING">PENDENTE RETORNO</option>
          <option value="IN_PROGRESS">EM ATENDIMENTO</option>
          <option value="CLOSED">CONCLUÍDO</option>
        </select>
        <textarea
          className="w-full rounded-lg border border-background-light p-2 text-base-light"
          {...register("description", { required: true })}
        ></textarea>
        <div className="flex justify-start gap-4">
          <label htmlFor="isPublic" className="flex gap-2">
            <input id="isPublic" type="checkbox" {...register("isPublic")} />
            Público
          </label>
          <label htmlFor="send_email" className="flex gap-2">
            <input type="checkbox" id="send_email" {...register("sendEmail")} />
            Enviar e-mail
          </label>
        </div>
        <div className="bg-background-dark rounded-lg flex flex-row gap-1 p-1 font-bold">
          <button
            type="submit"
            className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md"
          >
            Enviar <AiOutlineSend size={20} />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
