import Cookies from "js-cookie";

const API_URL = "http://localhost:5041/api/v1/ControleAcessos";

export const registrarEntrada = async (alunoId: number) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado! Faça login novamente.");
  }

  const now = new Date();
  const dataHoraFormatada = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        alunoId,
        tipo: 2,
        dataHora: dataHoraFormatada,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar entrada.");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na service de Controle de Acessos:", error);
    throw error;
  }
};
