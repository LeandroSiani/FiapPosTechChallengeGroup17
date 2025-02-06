const API_URL = "http://localhost:5041/api/v1/Users/register";

export interface RegistroUsuario {
  cpf: string;
  email: string;
  senha: string;
  confirmacaoSenha: string;
}

export const registrarUsuario = async (dados: RegistroUsuario) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error(
        "Erro ao registrar usuário. Verifique os dados informados."
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
};
