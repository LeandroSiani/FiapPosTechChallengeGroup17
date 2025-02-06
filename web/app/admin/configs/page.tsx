"use client";

import { useState } from "react";
import { InputForm } from "@/components/inputForm";
import SiderBar from "@/components/SiderBar";
import Title from "@/components/Title";
import { Horario } from "@/@types/Horario";
import { cadastrarHorario } from "@/service/horariosService";
import {
  RegistroUsuario,
  registrarUsuario,
} from "@/service/registerAuthService";

export default function Configs() {
  // Estado para cadastrar turnos
  const [formData, setFormData] = useState<Horario>({
    id: 0,
    descricao: "",
    horarioEntrada: "",
    horarioSaida: "",
  });

  // Estado para registrar usuários
  const [formDataRegister, setFormDataRegister] = useState<RegistroUsuario>({
    cpf: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });

  const [loading, setLoading] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [messageRegister, setMessageRegister] = useState<string | null>(null);

  // Manipula mudanças nos inputs de turnos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target;

    if (name === "horarioEntrada" || name === "horarioSaida") {
      value = value.length === 5 ? `${value}:00` : value;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Manipula mudanças nos inputs de registro de usuário
  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataRegister({
      ...formDataRegister,
      [e.target.name]: e.target.value,
    });
  };

  // Submissão do formulário de turnos
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await cadastrarHorario(formData);
      setSuccess(`Turno "${response.descricao}" cadastrado com sucesso!`);
    } catch (error) {
      setError("Erro ao cadastrar turno. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Submissão do formulário de registro de usuário
  const handleSubmitRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingRegister(true);
    setMessageRegister(null);
    setErrorRegister(null);

    if (formDataRegister.senha !== formDataRegister.confirmacaoSenha) {
      setErrorRegister("As senhas não coincidem.");
      setLoadingRegister(false);
      return;
    }

    try {
      await registrarUsuario(formDataRegister);
      setMessageRegister("Usuário registrado com sucesso!");
      setFormDataRegister({
        cpf: "",
        email: "",
        senha: "",
        confirmacaoSenha: "",
      });
    } catch (error) {
      setErrorRegister("Erro ao registrar usuário. Tente novamente.");
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14">
        <div className="w-full flex justify-between">
          <Title title="Configurações" />
        </div>

        {/* Cadastro de Turnos */}
        <div>
          <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
            <h3 className="text-xl text-[#1b1b1b] font-semibold">
              Cadastre abaixo os turnos da escola
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <InputForm
                label="Descrição"
                type="text"
                placeholder="Ex: Manhã, Tarde, Noite"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
              />
              <InputForm
                label="Horário de Entrada"
                type="time"
                name="horarioEntrada"
                value={formData.horarioEntrada}
                onChange={handleChange}
              />
              <InputForm
                label="Horário de Saída"
                type="time"
                name="horarioSaida"
                value={formData.horarioSaida}
                onChange={handleChange}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <button
              type="submit"
              className="h-16 py-5 bg-[#16738A] text-[#FFF] w-56 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Adicionando..." : "Adicionar Turno"}
            </button>
          </form>
        </div>

        {/* Registro de Usuários */}
        <div>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmitRegister}
          >
            <h3 className="text-xl text-[#1b1b1b] font-semibold">
              Registre abaixo login e senha para acesso ao sistema
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <InputForm
                label="CPF"
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={formDataRegister.cpf}
                onChange={handleChangeRegister}
              />
              <InputForm
                label="Email"
                type="email"
                name="email"
                placeholder="email@exemplo.com"
                value={formDataRegister.email}
                onChange={handleChangeRegister}
              />
              <InputForm
                label="Senha"
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                value={formDataRegister.senha}
                onChange={handleChangeRegister}
              />
              <InputForm
                label="Confirme a senha"
                type="password"
                name="confirmacaoSenha"
                placeholder="Confirme sua senha"
                value={formDataRegister.confirmacaoSenha}
                onChange={handleChangeRegister}
              />
            </div>

            {errorRegister && <p className="text-red-500">{errorRegister}</p>}
            {messageRegister && (
              <p className="text-green-500">{messageRegister}</p>
            )}

            <button
              type="submit"
              className="w-56 bg-[#16738A] text-[#FFF] h-16 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300"
              disabled={loadingRegister}
            >
              {loadingRegister ? "Registrando..." : "Registrar"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
