import Cookies from "js-cookie";

const API_URL = "http://localhost:5041/api/v1/ControleAcessos";

export const registrarEntrada = async (alunoId: number) => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Usuário não autenticado! Faça login novamente.");
  }

  const now = new Date();
  const dataAtual = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;

  const dataHoraFormatada = `${dataAtual}T${String(now.getHours()).padStart(
    2,
    "0"
  )}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;

  const entradaRegistrada = Cookies.get("entradaRegistrada");

  // 🔹 Define se é entrada ou saída
  const tipo = entradaRegistrada ? 2 : 1;

  // 🔹 Impede registro de múltiplas entradas no mesmo dia
  if (entradaRegistrada === dataAtual && tipo === 1) {
    throw new Error("Você já registrou uma entrada hoje.");
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        alunoId,
        tipo,
        dataHora: dataHoraFormatada,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao registrar entrada.");
    }

    const agora = new Date();
    const meiaNoite = new Date();
    meiaNoite.setHours(23, 59, 59, 999);
    const tempoRestante =
      (meiaNoite.getTime() - agora.getTime()) / (1000 * 60 * 60); // Em horas

    if (tipo === 1) {
      // 🔹 Se for entrada, salva o cookie até meia-noite
      Cookies.set("entradaRegistrada", dataAtual, {
        expires: tempoRestante / 24,
        path: "/",
      });
      return "Registro de Entrada com sucesso!";
    } else {
      // 🔹 Se for saída, remove o cookie
      Cookies.remove("entradaRegistrada");
      return "Registro de Saída com sucesso!";
    }
  } catch (error) {
    console.error("Erro na service de Controle de Acessos:", error);
    throw error;
  }
};
