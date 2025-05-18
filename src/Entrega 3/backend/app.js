const express = require('express');
const http = require('http'); 
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const db = require('./config/db'); 

const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/users');
const eventoRoutes = require('./routes/eventoRoutes');

const app = express();
const server = http.createServer(app); 
const io = socketIO(server, {
    cors: {
        origin: "*",
    }
});

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/messages', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/eventos', eventoRoutes);

const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log("Novo usuário conectado:", socket.id);

    socket.on('register', (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on('sendMessage', ({ from, to, content }) => {
        const receiverSocketId = onlineUsers.get(to);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', {
                from,
                content,
            });
        }
    });

    socket.on('disconnect', () => {
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        console.log("Usuário desconectado:", socket.id);
    });
});


app.set("io", io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
