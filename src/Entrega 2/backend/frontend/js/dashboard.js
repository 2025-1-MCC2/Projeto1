document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        // Se não houver token, redireciona pro login
        window.location.href = "login.html";
        return;
    }

    fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Token inválido");
        }
    })
    .catch(() => {
        // Token inválido ou erro → redireciona
        window.location.href = "login.html";
    });
});



