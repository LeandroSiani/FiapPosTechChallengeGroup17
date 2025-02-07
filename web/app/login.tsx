"use client";

import InputLogin from "@/components/InputLogin";
import Image from "next/image";
import { LockSimple, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // 🔹 Agora usa o AuthProvider

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cpf = "06114292090";

    try {
      await login(email, cpf, senha);

      // 🔹 Redirecionamento baseado no tipo de usuário
      if (email.includes("admin")) {
        router.push("/admin/dashboard");
      } else if (email.includes("teacher")) {
        router.push("/teacher/dashboard");
      } else if (email.includes("sponsor")) {
        router.push("/sponsor/dashboard");
      } else if (email.includes("student")) {
        router.push("/student/dashboard");
      }
    } catch (error) {
      setError("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <section className="w-full flex items-center ml-[10%] z-10">
        <Image
          src="/logo_edu.png"
          alt="logo"
          width={100}
          height={100}
          className="absolute top-5 left-5"
        />

        <div className="w-1/3 min-w-[500px] max-w-[700px]">
          <div className="justify-center flex items-center flex-col mb-24 gap-2">
            <h3 className="text-[#16738A] text-5xl font-bold">Acessar conta</h3>
            <div className="w-full border-t border-[#16738A]"></div>
          </div>

          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <InputLogin
              label="Email"
              id="email"
              type="email"
              placeholder="Digite seu email"
              icon={<UserCircle size={35} color="#16738A" />}
              required
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <InputLogin
              label="Senha"
              id="password"
              type="password"
              placeholder="Digite sua senha"
              icon={<LockSimple size={35} color="#16738A" />}
              required
              value={senha}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSenha(e.target.value)
              }
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className="bg-[#75D0C1] rounded-full py-4 text-4xl text-white font-semibold hover:bg-[#16738A] transition-all duration-300"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-28">
            <button className="text-[#16738A] text-2xl font-semibold underline hover:no-underline">
              Esqueceu a senha?
            </button>
          </div>
        </div>
      </section>

      <div className="w-full h-full absolute flex items-center justify-center top-1 left-2/4">
        <div className="w-full h-full bg-[#C5ECE4] rounded-full flex items-center justify-center">
          <div className="w-[85%] h-[85%] bg-[#99DDCF] rounded-full flex items-center justify-center">
            <div className="w-[80%] h-[80%] bg-[#75D0C1] rounded-full flex items-center relative ">
              <p className="text-[#16738A] font-semibold text-[96px] absolute left-[-8%]">
                <span className="text-[130px]">Saber</span> <br /> Conecta
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
