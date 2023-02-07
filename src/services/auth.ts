import { api } from "@/services/api";

interface SignInRequestData {
  username: string;
  password: string;
}

interface ResponseData {
  data: {
    token: string;
    user: {
      name: string;
      role: "SERVICE" | "ADMIN" | "USER";
      email: string;
      username: string;
    };
  };
}

interface UserData {
  name: string;
  branch_id: string;
  branch?: {
    name: string;
  };
  role: "SERVICE" | "ADMIN" | "USER";
  email: string;
  username: string;
}

export async function signInRequest({ username, password }: SignInRequestData) {
  const response = (await api.post("/session", {
    username,
    password,
  })) as ResponseData;

  return response.data;
}

export async function recoverUser(token: string) {
  const response = await api.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}

export async function isService(token: string) {
  const response = await api.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.data.role !== "SERVICE") {
    return false;
  }
  return true;
}
