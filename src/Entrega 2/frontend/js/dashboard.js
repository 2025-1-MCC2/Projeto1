document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const nome = localStorage.getItem("nome");

    if (!token) {
        window.location.href = "login.html";
        return;
    }

    // Exibe o nome do usuário logado
    const nomeElemento = document.getElementById("nomeusuarios");
    if (nomeElemento && nome) {
        nomeElemento.textContent = nome;
    }

    // Verifica o token (sem carregar eventos aqui!)
    fetch("http://localhost:3000/api/auth/verify", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
        if (!res.ok) {
            console.error("Token inválido ou erro no servidor de autenticação");
            throw new Error("Token inválido");
        }
        return res.json();
    })
    .catch((err) => {
        console.error("Erro na verificação do token:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("nome");
        window.location.href = "login.html";
    });

    // Configura o botão de sair da conta
    const botaoSair = document.querySelector(".botao-sair");
    if (botaoSair) {
        botaoSair.addEventListener("click", () => {
            if (confirm("Deseja realmente sair da sua conta?")) {
                localStorage.removeItem("token");
                localStorage.removeItem("nome");
                window.location.href = "login.html";
            }
        });
    }
});
