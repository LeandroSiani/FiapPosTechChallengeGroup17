const API_URL = "http://localhost:5041/api/v1/Users/login";

export const login = async (email: string, cpf: string, senha: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, CPF: cpf, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao fazer login. Verifique suas credenciais.");
    }

    const data = await response.json();
    return data.token; // Retorna o token JWT
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};
