import { api } from "@/lib/api";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TOKEN_KEY = "@it.point-token-v1";

const tempServiceToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzUxODM1NTMsImV4cCI6MTY3NTI2OTk1Mywic3ViIjoiMTdlZGE3MjYtODcwYS00YmJkLTgzYzEtMzVhMTM4MjdhOTM4In0.8ykkQveyd5qTVvL1vxdvU52DZoHCDM9FN7BtQFeXD8M";

function useAuth(redirect: boolean = true) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token && redirect) {
      router.push("/login");
    } else if (token) {
      login(token);
    }
  }, []);

  function login(token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem(TOKEN_KEY, token);
  }

  return {
    login,
  };
}

export { useAuth };
