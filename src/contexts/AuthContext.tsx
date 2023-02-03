import {
  createContext,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";

import { recoverUser, signInRequest } from "@/services/auth";
import { api } from "@/services/api";

const TOKEN_KEY = "@it.point-token";

interface SignInData {
  username: string;
  password: string;
}

interface UserData {
  name: string;
  role: "SERVICE" | "ADMIN" | "USER";
  email: string;
  username: string;
  branch?: {
    name: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (data: SignInData) => Promise<void>;
  user: UserData | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@it.point-token": token } = parseCookies();

    if (token) {
      recoverUser(token).then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  async function signIn({ username, password }: SignInData) {
    const { token, user } = await signInRequest({ username, password });

    setCookie(undefined, TOKEN_KEY, token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);

    router.push("/service");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
