import { api } from "@/lib/api";

export interface Ticket {
  id: string;
  status: "PENDING" | "OPEN" | "IN_PROGRESS";
  updated_at: string;
  created_at: string;
  category: {
    name: string;
  };
  subcategory: {
    name: string;
  };
  title: string;
  user: {
    name: string;
  };
}

export async function getTickets(): Promise<any> {
  try {
    const response = await api.get("/tickets");
    return response.data;
  } catch (err: any) {
    if (!err.response) {
      throw err;
    }

    const { status } = err.response;
    const { error } = err.response.data;

    return { status, error };
  }
}
