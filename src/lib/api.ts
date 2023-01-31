import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api/",
  timeout: 1000,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { api };
