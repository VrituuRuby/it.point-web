import { api } from "@/services/api";

export interface Ticket {
  id: number;
  status: "OPEN" | "PENDING" | "IN_PROGRESS";
  title: string;
  description: string;
  phone: string;
  created_at: string;
  updated_at: string;
  category: {
    id: string;
    name: string;
  };
  subcategory: {
    id: string;
    name: string;
  };
  user: {
    branch: {
      name: string;
    };
    email: string;
    name: string;
    id: string;
    username: string;
  };
}

export async function getTickets(): Promise<Ticket[]> {
  const response = await api.get("/tickets");

  const tickets = response.data;
  return tickets;
}

export async function getUserTickets(): Promise<Ticket[]> {
  const response = await api.get("/tickets/user");
  console.log(response.data);

  const tickets = response.data;
  return tickets;
}
