import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { UserCircle } from "phosphor-react";
import { useContext, useState } from "react";

export function UserButton() {
  const { user, signOff } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function signOut() {
    signOff();
    router.push("/");
  }

  return (
    <div className="relative">
      <button
        className="flex items-center justify-between px-1 hover:bg-blue rounded-lg relative"
        onClick={() => toggleIsOpen()}
      >
        <UserCircle size={48} className="text-white1" />
        <div className="flex flex-col items-start gap-0">
          <p className="text-sm">{user?.name ?? "Nome"}</p>
          <span className="text-xs">{user?.role ?? "Função"}</span>
        </div>
      </button>
      {isOpen ? (
        <div className="absolute top-[100%] bg-background-blue w-[200px] text-base-light  right-0 p-4 py-2 shadow-lg rounded-lg mt-2">
          <div className="w-[15px] h-[15px] bg-background-blue text-base-light rotate-45 absolute top-[-5px] left-[50%]"></div>
          <ul className="flex flex-col">
            <li>
              <button className="hover:underline px-1">Minha Conta</button>
            </li>
            <li>
              <button
                className="hover:underline px-1"
                onClick={() => signOut()}
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}
