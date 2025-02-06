import Cookies from "js-cookie";

const API_URL = "http://localhost:5041/api/v1/Alunos";

export interface Aluno {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  horarioId: number;
  ativo: boolean;
}

export const cadastrarAluno = async (aluno: Aluno) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado! Faça login novamente.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(aluno),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar aluno.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);
    throw error;
  }
};
