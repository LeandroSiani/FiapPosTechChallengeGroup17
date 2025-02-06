import Cookies from "js-cookie";

const BASE_URL = "http://localhost:5041/api/v1/Horarios";

export const cadastrarHorario = async (horario: any) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(horario),
    });

    if (!response.ok) {
      throw new Error(`Erro ao cadastrar horário: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao cadastrar horário:", error);
    throw error;
  }
};
