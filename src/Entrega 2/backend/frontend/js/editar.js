document.addEventListener('DOMContentLoaded', function() {
    // Elementos dos modais
    const modalEditar = document.getElementById('modal-editar');
    const modalNovoEvento = document.getElementById('modal-novo-evento');
    const body = document.body;
    const token = localStorage.getItem('token');

    // Variáveis de estado
    let imagemTemp = null;
    let cardAtual = null;
    let eventoId = null;

    // ==================== FUNÇÕES BÁSICAS ====================
    function abrirModal(modal) {
        if (!modal) {
            console.error('Modal não encontrado!');
            return;
        }
        modal.style.display = 'block';
        body.classList.add('modal-aberto');
    }

    function fecharModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        body.classList.remove('modal-aberto');
    }

    // ==================== CONFIGURAÇÕES DE UI ====================
    function configurarPreviewImagem() {
        document.querySelectorAll('.input-imagem').forEach(input => {
            const previewDiv = input.closest('.campo-formulario').querySelector('.preview-imagem');
            
            input.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
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
        document.addEventListener('click', function(e) {
            // Editar card
            if (e.target.closest('.botao-editar')) {
                cardAtual = e.target.closest('.cartao-dashboard');
                if (!cardAtual) return;
                
                eventoId = cardAtual.dataset.id;
                const titulo = cardAtual.querySelector('.cabecalho-cartao span:first-child').textContent;
                const imagem = cardAtual.querySelector('.imagem-cartao').src;
                const descricao = cardAtual.querySelector('.descricao-cartao').textContent.trim();
                
                // Preenche o formulário de edição
                const formEditar = modalEditar.querySelector('.formulario-edicao');
                formEditar.querySelector('.input-titulo').value = titulo;
                formEditar.querySelector('.input-descricao').value = descricao;
                
                // Configura o preview da imagem existente
                const previewDiv = formEditar.querySelector('.preview-imagem');
                previewDiv.innerHTML = `<img src="${imagem}" alt="Preview" style="max-width: 100%; max-height: 200px;">`;
                previewDiv.style.display = 'block';
                imagemTemp = imagem;
                
                abrirModal(modalEditar);
            }
            
            // Excluir card
            if (e.target.closest('.botao-excluir')) {
                const card = e.target.closest('.cartao-dashboard');
                if (confirm('Tem certeza que deseja excluir este evento?')) {
                    excluirEvento(card.dataset.id).then(success => {
                        if (success) card.remove();
                    });
                }
            }
        });
    }

    function configurarNovoEvento() {
        const btnNovoEvento = document.querySelector('.botao-novo-evento');
        if (!btnNovoEvento) {
            console.error('Botão de novo evento não encontrado!');
            return;
        }
        
        btnNovoEvento.addEventListener('click', function() {
            const form = document.getElementById('form-novo-evento');
            form.reset();
            
            const previewDiv = form.querySelector('.preview-imagem');
            previewDiv.innerHTML = '';
            previewDiv.style.display = 'none';
            
            imagemTemp = null;
            abrirModal(modalNovoEvento);
        });
    }

    function configurarBotaoSair() {
        const btnSair = document.querySelector('.botao-sair');
        if (btnSair) {
            btnSair.addEventListener('click', function() {
                if (confirm('Deseja realmente sair da conta?')) {
                    localStorage.removeItem('token');
                    window.location.href = 'login.html';
                }
            });
        }
    }

    function configurarFechamentoModais() {
        // Fechar ao clicar no X
        document.querySelectorAll('.fechar-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                fecharModal(modalEditar);
                fecharModal(modalNovoEvento);
            });
        });

        // Fechar ao clicar fora
        document.addEventListener('click', function(e) {
            if (e.target === modalEditar) fecharModal(modalEditar);
            if (e.target === modalNovoEvento) fecharModal(modalNovoEvento);
        });

        // Fechar com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                fecharModal(modalEditar);
                fecharModal(modalNovoEvento);
            }
        });
    }

    // ==================== INTEGRAÇÃO COM API ====================
    async function carregarEventos() {
        try {
            const response = await fetch('/api/events', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao carregar eventos');
            }
            
            const eventos = await response.json();
            renderizarEventos(eventos);
        } catch (error) {
            console.error('Erro ao carregar eventos:', error);
            mostrarMensagemErro('Não foi possível carregar os eventos. Tente recarregar a página.');
        }
    }

    function renderizarEventos(eventos) {
        const grade = document.querySelector('.grade-dashboard');
        if (!grade) return;
        
        if (eventos.length === 0) {
            grade.innerHTML = '<div class="mensagem-vazia">Nenhum evento encontrado. Crie seu primeiro evento!</div>';
            return;
        }
        
        grade.innerHTML = eventos.map(evento => `
            <div class="cartao-dashboard" data-id="${evento.id}">
                <div class="cabecalho-cartao">
                    <span>${evento.titulo}</span>
                    <div class="botoes-acoes">
                        <span class="botao-editar"><i class="fas fa-edit"></i></span>
                        <span class="botao-excluir"><i class="fas fa-trash"></i></span>
                    </div>
                </div>
                <div class="corpo-cartao">
                    <img src="${evento.imagem}" alt="Evento" class="imagem-cartao">
                    <p class="descricao-cartao">${evento.descricao}</p>
                    <div class="estatisticas-cartao">
                        <span><i class="fas fa-calendar-alt"></i> ${new Date(evento.data_criacao).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
    async function criarEvento(titulo, descricao, imagem) {
        try {
          const formData = new FormData();
          formData.append('titulo', titulo);
          formData.append('descricao', descricao);
          formData.append('imagem', imagem);
      
          const response = await fetch('http://localhost:5500/api/events', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      
          console.log('Resposta do servidor:', response);
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao criar evento');
          }
      
          const data = await response.json();
          await carregarEventos();
          mostrarMensagemSucesso('Evento criado com sucesso!');
          return true;
        } catch (error) {
          console.error('Erro detalhado:', {
            message: error.message,
            stack: error.stack
          });
          mostrarMensagemErro(error.message || 'Falha ao criar evento');
          return false;
        }
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

            const response = await fetch(`/api/events/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar evento');
            }
            
            await carregarEventos();
            mostrarMensagemSucesso('Evento atualizado com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            mostrarMensagemErro(error.message || 'Falha ao atualizar evento');
            return false;
        }
    }

    async function excluirEvento(id) {
        try {
            const response = await fetch(`/api/events/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao excluir evento');
            }
            
            mostrarMensagemSucesso('Evento excluído com sucesso!');
            return true;
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            mostrarMensagemErro(error.message || 'Falha ao excluir evento');
            return false;
        }
    }

    // ==================== FUNÇÕES AUXILIARES ====================
    function mostrarMensagemSucesso(mensagem) {
        // Implemente com seu sistema de notificações preferido
        alert(mensagem); // Temporário - substitua por algo mais elegante
    }

    function mostrarMensagemErro(mensagem) {
        // Implemente com seu sistema de notificações preferido
        alert(mensagem); // Temporário - substitua por algo mais elegante
    }

    function configurarFormularios() {
        // Formulário de novo evento
        const formNovo = document.getElementById('form-novo-evento');
        if (formNovo) {
            formNovo.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const titulo = this.querySelector('.input-titulo').value;
                const descricao = this.querySelector('.input-descricao').value;
                const imagem = this.querySelector('.input-imagem').files[0];
                
                const success = await criarEvento(titulo, descricao, imagem);
                if (success) {
                    fecharModal(modalNovoEvento);
                    this.reset();
                }
            });
        }

        // Formulário de edição
        const formEditar = modalEditar.querySelector('.formulario-edicao');
        if (formEditar) {
            formEditar.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const titulo = this.querySelector('.input-titulo').value;
                const descricao = this.querySelector('.input-descricao').value;
                const novaImagem = this.querySelector('.input-imagem').files[0];
                
                const success = await atualizarEvento(
                    eventoId, 
                    titulo, 
                    descricao, 
                    novaImagem || imagemTemp
                );
                
                if (success) {
                    fecharModal(modalEditar);
                }
            });
        }
    }

    // ==================== INICIALIZAÇÃO ====================
    function init() {
        if (!token) {
            window.location.href = 'login.html';
            return;
        }
        
        // Verificação inicial
        console.log('Token:', token);
        console.log('Modal Editar:', modalEditar);
        console.log('Modal Novo Evento:', modalNovoEvento);
        
        // Configurações
        configurarPreviewImagem();
        configurarEventosCards();
        configurarNovoEvento();
        configurarBotaoSair();
        configurarFechamentoModais();
        configurarFormularios();
        
        // Carrega os eventos iniciais
        carregarEventos();
    }

    init();
});