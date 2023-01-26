import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import {MdUnfoldMore} from "react-icons/md"
import { Status } from "./Status";

const columns = ['Nº', 'Estado', 'Ultima Ação', 'Data de Criação', 'Categoria', 'Título', 'Solicitante']

export interface Ticket{
    id: string,
    status: 'PENDING' | 'OPEN' | 'IN_PROGRESS',
    updated_at: string,
    created_at: string,
    category: {
        name: string,
    },
    subcategory:{
        name: string
    }
    title: string,
    user: {
        name: string
    }
}

interface TicketsTableProps{
    tickets: Ticket[]
}

export function TicketsTable({tickets}: TicketsTableProps){
    return <div className="grid grid-cols-table text-base-dark border-background-dark rounded-lg overflow-hidden">
        <div className="contents">
            {columns.map(col => (
                <div key={col} className="font-bold flex justify-between items-center px-2 py-1.5 first:rounded-tl-lg last:rounded-tr-lg bg-background-dark">
                    {col}
                    <MdUnfoldMore size={20} />
                </div>
            ))}
        </div>
      
        {tickets.map(ticket => {
            return (
                <div className="contents" key={ticket.id}>
                    <div className="p-4 flex justify-center bg-background-light border-background-dark border-b border-r">
                        {ticket.id}
                    </div>
                    <div className="p-4 flex justify-center bg-background-light border-background-dark border-b border-r uppercase font-bold">
                        <Status status={ticket.status}/>
                    </div>
                    <div className="p-4 flex justify-center bg-background-light border-background-dark border-b border-r">
                        {ticket?.updated_at || '-'}
                    </div>
                    <div className="p-4 flex justify-center bg-background-light border-background-dark border-b border-r">
                        {ticket.created_at}
                    </div>
                    <div className="p-4 flex flex-col justify-start bg-background-light border-background-dark border-b border-r">
                        <span className="text-base-light text-sm">{ticket.category.name}</span>
                        {ticket.subcategory.name}
                    </div>
                    <div className="p-4 flex justify-start bg-background-light border-background-dark border-b border-r">
                        {ticket.title}
                    </div>
                    <div className="p-4 flex justify-start bg-background-light border-background-dark border-b border-r">
                        {ticket.user.name}
                    </div>
                </div>
            )
        })}
    </div>
}