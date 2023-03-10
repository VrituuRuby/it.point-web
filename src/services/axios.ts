import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "@it.point-token": token } = parseCookies(ctx);

  let api: AxiosInstance;

  if (process.env.DOCKER && ctx) {
    api = axios.create({
      baseURL: "http://it.point-backend:3333/api",
      timeout: 1000,
    });
  } else {
    api = axios.create({
      baseURL: "http://localhost:3333/api",
      timeout: 1000,
    });
  }

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return api;
}
