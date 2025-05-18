const Message = require("../models/messageModel");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Enviar mensagem
exports.sendMessage = async (req, res) => {
    try {
        const { to, content } = req.body;
        const from = req.user.userId;

        if (!to || !content) {
            return res.status(400).json({ message: "Destinatário e conteúdo são obrigatórios." });
        }

        if (from === to) {
            return res.status(400).json({ message: "Não é possível enviar mensagem para si mesmo." });
        }

        const messageId = await Message.create(from, to, content);
        
        // Emitir evento via Socket.IO para notificar destinatário em tempo real
        const io = req.app.get("io");
        if (io) {
            io.to(to.toString()).emit("newMessage", {
                from,
                content,
                messageId,
            });
        }

        res.status(201).json({ 
            message: "Mensagem enviada com sucesso!",
            messageId
        });

    } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        res.status(500).json({ 
            message: "Erro interno do servidor ao enviar mensagem.",
            error: error.message
        });
    }
};

// Obter conversa entre dois usuários
exports.getConversation = async (req, res) => {
    try {
        const { userId } = req.params;
        const currentUserId = req.user.userId;

        const messages = await Message.findByUsers(currentUserId, userId);
        
        // Marcar mensagens como lidas ao abrir a conversa
        const unreadMessages = messages.filter(msg => 
            !msg.lida && msg.destinatario_id === currentUserId
        );
        
        if (unreadMessages.length > 0) {
            const messageIds = unreadMessages.map(msg => msg.id);
            await Message.markMessagesAsRead(messageIds, currentUserId);
        }

        res.status(200).json(messages);

    } catch (error) {
        console.error("Erro ao buscar conversa:", error);
        res.status(500).json({ 
            message: "Erro interno do servidor ao buscar conversa.",
            error: error.message
        });
    }
};

// Obter todas as conversas do usuário com contagem de mensagens não lidas
exports.getUserConversations = async (req, res) => {
    try {
        const currentUserId = req.user.userId;

        const conversations = await Message.findUserConversations(currentUserId);
        
     
        conversations.sort((a, b) => new Date(b.ultima_mensagem) - new Date(a.ultima_mensagem));
        
        res.status(200).json(conversations);

    } catch (error) {
        console.error("Erro ao buscar conversas:", error);
        res.status(500).json({ 
            message: "Erro interno do servidor ao buscar conversas.",
            error: error.message
        });
    }
};

// Marcar mensagens como lidas
exports.markMessagesAsRead = async (req, res) => {
    try {
        const { senderId } = req.body;
        const currentUserId = req.user.userId;

        if (!senderId) {
            return res.status(400).json({ message: "ID do remetente é obrigatório." });
        }

        const unreadMessages = await Message.findUnreadMessagesFromSender(senderId, currentUserId);
        
        if (unreadMessages.length > 0) {
            const messageIds = unreadMessages.map(msg => msg.id);
            await Message.markMessagesAsRead(messageIds, currentUserId);
        }

        res.status(200).json({ 
            message: "Mensagens marcadas como lidas com sucesso.",
            count: unreadMessages.length
        });
        
    } catch (error) {
        console.error("Erro ao marcar mensagens como lidas:", error);
        res.status(500).json({ 
            message: "Erro interno ao marcar mensagens como lidas.",
            error: error.message
        });
    }
};

// Obter contagem de mensagens não lidas por remetente
exports.getUnreadCount = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        
        const unreadCounts = await Message.getUnreadCountsBySender(currentUserId);
        
        res.status(200).json(unreadCounts);
        
    } catch (error) {
        console.error("Erro ao buscar contagem de mensagens não lidas:", error);
        res.status(500).json({
            message: "Erro ao buscar contagem de mensagens não lidas",
            error: error.message
        });
    }
};
