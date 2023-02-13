import { AiOutlineSend } from "react-icons/ai";

export function AddNote() {
  return (
    <div className="bg-background-blue rounded-lg p-4 w-full flex flex-col gap-2">
      <h2 className="text-xl text-base-dark font-bold">Atendendo</h2>
      <select
        className="w-full px-2 py-1 bg-white rounded-lg border border-background-light text-base-light"
        defaultValue=""
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
        name="description"
        className="w-full rounded-lg border border-background-light p-2 text-base-light"
      ></textarea>
      <div className="flex justify-start gap-4">
        <label htmlFor="isPublic" className="flex gap-2">
          <input
            type="checkbox"
            id="isPublic"
            value="isPublic"
            defaultChecked
          />
          Público
        </label>
        <label htmlFor="send_email" className="flex gap-2">
          <input
            type="checkbox"
            id="send_email"
            value="sendEmail"
            defaultChecked
          />
          Enviar e-mail
        </label>
      </div>
      <div className="bg-background-dark rounded-lg flex flex-row gap-1 p-1 font-bold">
        <button className="flex flex-row gap-2 py-1 items-center justify-center flex-1 bg-blue text-white px-2 rounded-md">
          Enviar <AiOutlineSend size={20} />
        </button>
      </div>
    </div>
  );
}
