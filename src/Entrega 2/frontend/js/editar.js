document.addEventListener('DOMContentLoaded', function () {
    const BASE_URL = 'http://localhost:3000';

    const modalEditar = document.getElementById('modal-editar');
    const modalNovoEvento = document.getElementById('modal-novo-evento');
    const body = document.body;
    const token = localStorage.getItem('token');

    let imagemTemp = null;
    let cardAtual = null;
    let eventoId = null;

    function abrirModal(modal) {
        modal.style.display = 'block';
        body.classList.add('modal-aberto');
    }

    function fecharModal(modal) {
        modal.style.display = 'none';
        body.classList.remove('modal-aberto');
    }

    function configurarPreviewImagem() {
        document.querySelectorAll('.input-imagem').forEach(input => {
            const previewDiv = input.closest('.campo-formulario').querySelector('.preview-imagem');
            input.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        previewDiv.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
                        previewDiv.style.display = 'block';
                        imagemTemp = file;
                    }
                    reader.readAsDataURL(file);
                }
            });
        });
    }

    function configurarEventosCards() {
        document.addEventListener('click', async function (e) {
            const target = e.target;

            if (target.closest('.botao-editar')) {
                cardAtual = target.closest('.cartao-dashboard');
                if (!cardAtual) return;

                eventoId = cardAtual.dataset.id;
                const titulo = cardAtual.querySelector('.cabecalho-cartao span:first-child').textContent;
                const imagem = cardAtual.querySelector('.imagem-cartao').src;
                const descricao = cardAtual.querySelector('.descricao-cartao').textContent.trim();

                const formEditar = modalEditar.querySelector('.formulario-edicao');
                formEditar.querySelector('.input-titulo').value = titulo;
                formEditar.querySelector('.input-descricao').value = descricao;

                const previewDiv = formEditar.querySelector('.preview-imagem');
                previewDiv.innerHTML = `<img src="${imagem}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
                previewDiv.style.display = 'block';
                imagemTemp = imagem;

                abrirModal(modalEditar);
            }

            if (target.closest('.botao-excluir')) {
                const card = target.closest('.cartao-dashboard');
                if (confirm('Deseja excluir este evento?')) {
                    const success = await excluirEvento(card.dataset.id);
                    if (success) card.remove();
                }
            }
        });
    }

    function configurarNovoEvento() {
        const btnNovoEvento = document.querySelector('.botao-novo-evento');
        btnNovoEvento.addEventListener('click', function () {
            const form = document.getElementById('form-novo-evento');
            form.reset();

            const previewDiv = form.querySelector('.preview-imagem');
            previewDiv.innerHTML = '';
            previewDiv.style.display = 'none';

            imagemTemp = null;
            abrirModal(modalNovoEvento);
        });

        const form = document.getElementById('form-novo-evento');
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const titulo = form.querySelector('.input-titulo').value;
            const descricao = form.querySelector('.input-descricao').value;
            const imagem = form.querySelector('.input-imagem').files[0];

            if (!imagem) {
                alert('Por favor, selecione uma imagem.');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('titulo', titulo);
                formData.append('descricao', descricao);
                formData.append('imagem', imagem);

                const response = await fetch(`${BASE_URL}/api/eventos`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: formData
                });

                const result = await response.json();

                if (!result.success) {
                    alert(result.message || 'Erro ao criar evento');
                    return;
                }

                alert('Evento criado com sucesso!');
                fecharModal(modalNovoEvento);
                carregarEventos();
            } catch (error) {
                console.error('Erro ao criar evento:', error);
                alert('Erro ao criar evento');
            }
        });
    }

    function configurarFechamentoModais() {
        document.querySelectorAll('.fechar-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                fecharModal(modalEditar);
                fecharModal(modalNovoEvento);
            });
        });

        document.addEventListener('click', e => {
            if (e.target === modalEditar) fecharModal(modalEditar);
            if (e.target === modalNovoEvento) fecharModal(modalNovoEvento);
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                fecharModal(modalEditar);
                fecharModal(modalNovoEvento);
            }
        });
    }

    async function atualizarEvento(id, titulo, descricao, imagem) {
        try {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            if (imagem instanceof File) {
                formData.append('imagem', imagem);
            } else if (imagem) {
                formData.append('imagemAtual', imagem);
            }

            const response = await fetch(`${BASE_URL}/api/eventos/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });

            if (!response.ok) throw new Error('Erro ao atualizar evento');

            await carregarEventos();
            alert('Evento atualizado com sucesso!');
            return true;
        } catch (err) {
            console.error(err);
            alert('Erro ao atualizar evento');
            return false;
        }
    }

    async function excluirEvento(id) {
        try {
            const response = await fetch(`${BASE_URL}/api/eventos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Erro ao excluir evento');
                } else {
                    throw new Error('Resposta inesperada do servidor');
                }
            }

            alert('Evento excluído com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            alert(error.message || 'Falha ao excluir evento');
            return false;
        }
    }

    function configurarFormularios() {
        const formEditar = modalEditar.querySelector('.formulario-edicao');
        formEditar.addEventListener('submit', async function (e) {
            e.preventDefault();

            const titulo = this.querySelector('.input-titulo').value;
            const descricao = this.querySelector('.input-descricao').value;
            const novaImagem = this.querySelector('.input-imagem').files[0];

            const success = await atualizarEvento(eventoId, titulo, descricao, novaImagem || imagemTemp);
            if (success) fecharModal(modalEditar);
        });
    }

    async function carregarEventos() {
        try {
            const response = await fetch(`${BASE_URL}/api/eventos`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401) {
                alert("Sessão expirada. Faça login novamente.");
                localStorage.removeItem('token');
                window.location.href = 'login.html';
                return;
            }

            const result = await response.json();
            if (!result.success) {
                alert("Erro ao carregar eventos");
                return;
            }

            renderizarEventos(result.data);
        } catch (err) {
            console.error('Erro ao carregar eventos:', err);
        }
    }

    function renderizarEventos(eventos) {
        const grade = document.querySelector('.grade-dashboard');
        if (!grade) return;
    
        // Remove apenas os cards dinâmicos (que têm o atributo data-id)
        grade.querySelectorAll('.cartao-dashboard[data-id]').forEach(card => card.remove());
    
        if (eventos.length === 0) {
            const mensagemVazia = document.createElement('div');
            mensagemVazia.classList.add('mensagem-vazia');
            mensagemVazia.textContent = 'Nenhum evento encontrado.';
            grade.appendChild(mensagemVazia);
            return;
        }
    
        // Adiciona os novos cards
        eventos.forEach(evento => {
            const card = document.createElement('div');
            card.classList.add('cartao-dashboard');
            card.dataset.id = evento.id;
            card.innerHTML = `
                <div class="cabecalho-cartao">
                    <span>${evento.titulo}</span>
                    <div class="botoes-acoes">
                        <span class="botao-editar"><i class="fas fa-edit"></i></span>
                        <span class="botao-excluir"><i class="fas fa-trash"></i></span>
                    </div>
                </div>
                <div class="corpo-cartao">
                 
                    <img src="${BASE_URL}${evento.imagem}" alt="Evento" class="imagem-cartao">

                    <p class="descricao-cartao">${evento.descricao}</p>
                    <div class="estatisticas-cartao">
                        <span><i class="fas fa-calendar-alt"></i> ${new Date(evento.data_criacao).toLocaleDateString()}</span>
                    </div>
                </div>
            `;
            grade.appendChild(card);
        });
    }
    

    function init() {
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        configurarPreviewImagem();
        configurarEventosCards();
        configurarNovoEvento();
        configurarFechamentoModais();
        configurarFormularios();
        carregarEventos();
    }

    init();
});
