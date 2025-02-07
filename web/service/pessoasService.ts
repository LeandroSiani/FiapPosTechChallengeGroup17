import Cookies from "js-cookie";

const API_URL = "http://localhost:5041/api/v1/Alunos"; // Ajuste conforme necessário

// 🔹 Função para obter todos os alunos
export const getAlunos = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado! Faça login novamente.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar a lista de alunos.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro na service de alunos:", error);
    throw error;
  }
};

export const getAlunoByEmail = async () => {
  const token = Cookies.get("token");
  const userId = Cookies.get("userId"); // 🔹 Certifique-se de armazenar o email no login

  if (!token || !userId) {
    throw new Error("Usuário não autenticado ou email não encontrado!");
  }

  try {
    // 🔹 Busca TODOS os alunos
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar a lista de alunos.`);
    }

    const alunos = await response.json();

    // 🔹 Filtra pelo email armazenado no cookie
    const alunoEncontrado = alunos.find(
      (aluno: any) => aluno.id === Number(userId)
    );

    if (!alunoEncontrado) {
      throw new Error(`Nenhum aluno encontrado `);
    }

    return alunoEncontrado; // 🔹 Retorna apenas o objeto do aluno correspondente
  } catch (error) {
    console.error("Erro na service de alunos:", error);
    throw error;
  }
};
