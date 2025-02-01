"use client";

import { FileUpload } from "@/components/fileUpload";
import { InputForm } from "@/components/inputForm";
import SiderBar from "@/components/SiderBar";
import Title from "@/components/Title";

export default function TeacherPerfil() {
  return (
    <main className="w-full h-screen flex overflow-x-hidden relative">
      <SiderBar tenant="teacher" />

      <section className="w-full py-10 px-8 overflow-auto flex flex-col gap-14 ">
        <div className="w-full flex justify-between">
          <Title title="Perfil" />
        </div>

        <form className="w-full flex flex-col gap-5">
          <InputForm label="Nome" type="text" placeholder="Digite seu nome" />

          <div className="grid grid-cols-3 gap-4">
            <InputForm label="CPF" type="text" placeholder="000.000.000-00" />
            <InputForm
              label="Data nasc."
              type="text"
              placeholder="00/00/0000"
            />
            <InputForm label="Gênero" type="text" placeholder="" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputForm label="E-mail" type="text" placeholder="email" />
            <InputForm
              label="telefone  "
              type="text"
              placeholder="(00) 00000-0000"
            />
          </div>

          <h2 className="text-[#1b1b1b] text-3xl font-bold mt-6">
            Informações Profissionais
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <InputForm
              label="Disciplina"
              type="text"
              placeholder="Matemática"
            />
            <InputForm
              label="Séries/Turmas que atende"
              type="text"
              placeholder="801/502 - Manhã"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <InputForm
              label="Data Admissão"
              type="text"
              placeholder="00/00/0000"
            />
            <InputForm
              label="Status (ativo, afastado, etc.)"
              type="text"
              placeholder="Ativo"
            />
          </div>

          <div className="w-full">
            <InputForm
              label="Especializações (texto livre)"
              type="text"
              placeholder="Especialização em Matemática, etc."
            />
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
              className=" p-6 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
            ></textarea>
          </div>
        </form>
      </section>
    </main>
  );
}
