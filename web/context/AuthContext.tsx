"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; // 🔹 Biblioteca para decodificar JWT

interface AuthContextType {
  token: string | null;
  user: any | null;
  login: (email: string, cpf: string, senha: string) => Promise<void>;
  logout: () => void;
  getUserId: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = Cookies.get("token");
    const storedUserId = Cookies.get("userId");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = async (email: string, cpf: string, senha: string) => {
    try {
      const response = await fetch("http://localhost:5041/api/v1/Users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, cpf, senha }),
      });

      const data = await response.json();
      console.log("🚀 ~ login ~ data:", data);

      if (data.token) {
        Cookies.set("token", data.token, { expires: 1, path: "/" });
        setToken(data.token);

        // 🔹 Decodifica o token para pegar o userId
        const decodedToken: any = jwtDecode(data.token);
        const userId =
          Number(
            decodedToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
            ]
          ) - 1;

        if (userId) {
          Cookies.set("userId", userId.toString(), { expires: 1, path: "/" });
        } else {
          throw new Error("ID do usuário não encontrado no token.");
        }
      } else {
        throw new Error("Token inválido ou não recebido.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("userId");
    Cookies.remove("user");
    setToken(null);
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        getUserId: () => Cookies.get("userId") || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
