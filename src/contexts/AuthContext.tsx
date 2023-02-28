import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { parseCookies, setCookie, destroyCookie } from "nookies";

import { recoverUser, signInRequest } from "@/services/auth";
import { api } from "@/services/api";

const TOKEN_KEY = "@it.point-token";
const USER_KEY = "@it.point-user";

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
  user: UserData;
  signOff: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserData>({} as UserData);
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

    const ageTime = 60 * 60 * 5; // 5 hours

    setCookie(undefined, TOKEN_KEY, token, {
      maxAge: ageTime,
    });

    setCookie(undefined, USER_KEY, JSON.stringify(user), {
      maxAge: ageTime,
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);

    router.push("/service");
  }

  async function signOff() {
    destroyCookie(undefined, TOKEN_KEY);
    destroyCookie(undefined, USER_KEY);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user, signOff }}>
      {children}
    </AuthContext.Provider>
  );
}
