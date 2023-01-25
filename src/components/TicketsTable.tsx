import {MdUnfoldMore} from "react-icons/md"

const columns = ['Nº', 'Estado', 'Ultima Ação', 'Data de Criação', 'Categoria', 'Título', 'Solicitante']

const tickets = [
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
    {
        id: "123",
        status: "Em aberto",
        updated_at: new Date('2023-01-24'),
        created_at: new Date('2023-01-20'),
        category: "Softawre",
        title: "Instalar Coisa",
        caller: "Jonh Doe"
    },
]

export function TicketsTable(){
    return <div className="grid grid-cols-table bg-background-light text-base-dark text-base border-1 border-background-dark rounded-lg">
        {columns.map(col => (
            <div 
                key={col}
                className="flex flex-row items-center justify-between px-2 py-1.5 bg-background-dark text-base-dark font-bold ">
                <span>{col}</span>
                <MdUnfoldMore size={20} />
            </div>
        ))}

        {tickets.map(ticket => (
            <>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2">
                    {ticket.id}
                </div>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2 font-bold">
                    {ticket.status.toUpperCase()}
                </div>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2">
                    {ticket.updated_at.toLocaleDateString()}
                </div>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2">
                    {ticket.created_at.toLocaleDateString()}
                </div>
                <div className="p-4 flex items-center justify-start text-base-light border-r-2 border-b-2 border-background-dark">
                    {ticket.category}
                </div>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2">
                    {ticket.title}
                </div>
                <div className="p-4 flex items-center justify-center border-background-dark border-r-2 border-b-2">
                    {ticket.caller}
                </div>
            </>
        ))}

    </div>
}