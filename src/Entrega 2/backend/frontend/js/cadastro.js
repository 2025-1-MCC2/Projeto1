document.querySelector('.btn-cadastro').addEventListener('click', async () => {
    const nome = document.getElementById('nome').value; // Acessando o valor do campo nome
    const email = document.getElementById('email').value; // Acessando o valor do campo email
    const senha = document.getElementById('senha').value; // Acessando o valor do campo senha

    // Verificando se todos os campos foram preenchidos
    if (!nome || !email || !senha) {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        // Fazendo a requisição para o servidor
        const response = await fetch('http://localhost:3000/api/cadastro', {
            method: 'POST', // Método POST para enviar os dados
            headers: {
                'Content-Type': 'application/json', // Definindo o tipo de conteúdo como JSON
            },
            body: JSON.stringify({ nome, email, senha }) // Enviando os dados do formulário em formato JSON
        });

        // Processando a resposta do servidor
        const data = await response.json();

        if (response.ok) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = 'login.html'; // Redireciona para a página de login após o cadastro
        } else {
            alert(data.message || 'Erro no cadastro');
        }
    } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert('Erro ao conectar com o servidor.');
    }
});
