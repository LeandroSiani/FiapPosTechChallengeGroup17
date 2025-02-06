"use client";

import { Aluno } from "@/@types/Aluno";
import { FileUpload } from "@/components/fileUpload";
import { InputForm } from "@/components/inputForm";
import { SelectForm } from "@/components/SelectForm";
import SiderBar from "@/components/SiderBar";
import Title from "@/components/Title";
import { cadastrarAluno } from "@/service/alunoService";
import Link from "next/link";
import { useState } from "react";

export default function EnrollStudent() {
  const [formData, setFormData] = useState<Aluno>({
    id: 0,
    nome: "",
    sobrenome: "",
    cpf: "",
    email: "",
    telefone: "",
    dataNascimento: new Date().toISOString(), // Formato ISO para evitar erro
    horarioId: 0,
    ativo: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const alunoData = {
        ...formData,
        dataNascimento: new Date(formData.dataNascimento).toISOString(),
      };

      const response = await cadastrarAluno(alunoData);
      setSuccess(`Aluno ${response.nome} cadastrado com sucesso!`);
    } catch (error: any) {
      setError(error.message || "Erro ao cadastrar aluno. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="admin" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Link
            href="/admin/alunos"
            className="border border-[#c0c0c0] px-4 py-2 rounded-lg font-bold"
          >
            Voltar
          </Link>
          <Title title="Cadastrar aluno" />
        </div>

        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <InputForm
              label="Nome"
              type="text"
              placeholder="Digite o primeiro nome do Aluno"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <InputForm
              label="Sobrenome"
              type="text"
              placeholder="Digite o sobrenome do Aluno"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <InputForm
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
            />
            <InputForm
              label="Data nasc."
              type="date"
              name="dataNascimento"
              value={formData.dataNascimento.split("T")[0]}
              onChange={handleChange}
            />
            <InputForm label="Gênero" type="text" placeholder="" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputForm
              label="E-mail"
              type="email"
              placeholder="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputForm
              label="Telefone"
              type="text"
              placeholder="(00) 00000-0000"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputForm
              label="Data de matrícula"
              type="text"
              placeholder="00/00/0000"
            />
            <InputForm
              label="Status da matrícula (Ativo, Inativo, Transferido)"
              type="text"
              placeholder="Ativo"
            />
          </div>

          <h2 className="text-[#1b1b1b] text-3xl font-bold mt-6">
            Informações Acadêmicas
          </h2>

          <div className="w-full">
            <InputForm
              label="Série/Ano Escolar"
              type="text"
              placeholder="8º ano "
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SelectForm
              label="Turno"
              name="horarioId"
              value={formData.horarioId}
              onChange={handleChange}
              options={[
                { value: 1, label: "Manhã" },
                { value: 2, label: "Tarde" },
                { value: 3, label: "Noite" },
              ]}
            />
            <InputForm label="Turmas" type="text" placeholder="801" />
          </div>

          <div className="w-full">
            <InputForm
              label="Disciplinas"
              type="text"
              placeholder="Matemática, Português, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputForm label="Média Geral" type="text" placeholder="85" />
            <InputForm label="Frequência" type="text" placeholder="90%" />
          </div>

          <h2 className="text-[#1b1b1b] text-3xl font-bold mt-6">
            Documentação
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <FileUpload
              onFileChange={(file) => console.log("Arquivo selecionado:", file)}
            />
            <FileUpload
              onFileChange={(file) => console.log("Arquivo selecionado:", file)}
            />
          </div>

          <h2 className="text-[#1b1b1b] text-3xl font-bold mt-6">
            Observações:
          </h2>

          <div className="w-full">
            <textarea
              name="observacao"
              className="p-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            ></textarea>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-56 bg-[#16738A] text-[#FFF] h-16 rounded-lg hover:bg-[#1b1b1b] transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
