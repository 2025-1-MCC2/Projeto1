const pool = require("../config/db");

const Message = {

    async create(senderId, recipientId, content) {
        const [result] = await pool.query(
            "INSERT INTO mensagens (remetente_id, destinatario_id, conteudo) VALUES (?, ?, ?)",
            [senderId, recipientId, content]
        );
        return result.insertId;
    },


    async findByUsers(userId1, userId2) {
        const [rows] = await pool.query(`
            SELECT 
                m.*, 
                u1.nome as remetente_nome, 
                u2.nome as destinatario_nome
            FROM mensagens m
            JOIN usuarios u1 ON m.remetente_id = u1.id
            JOIN usuarios u2 ON m.destinatario_id = u2.id
            WHERE (m.remetente_id = ? AND m.destinatario_id = ?)
               OR (m.remetente_id = ? AND m.destinatario_id = ?)
            ORDER BY m.data_envio ASC
        `, [userId1, userId2, userId2, userId1]);
        
        return rows;
    },


    async findUserConversations(userId) {
        const [rows] = await pool.query(`
            SELECT 
                u.id as user_id,
                u.nome,
                u.email,
                MAX(m.data_envio) as ultima_mensagem,
                SUM(CASE WHEN m.destinatario_id = ? AND m.lida = FALSE THEN 1 ELSE 0 END) as nao_lidas,
                (
                    SELECT conteudo 
                    FROM mensagens 
                    WHERE (remetente_id = u.id AND destinatario_id = ?) 
                       OR (remetente_id = ? AND destinatario_id = u.id)
                    ORDER BY data_envio DESC 
                    LIMIT 1
                ) as ultimo_conteudo
            FROM usuarios u
            JOIN mensagens m ON (
                (m.remetente_id = u.id AND m.destinatario_id = ?) OR
                (m.remetente_id = ? AND m.destinatario_id = u.id)
            )
            WHERE u.id != ?
            GROUP BY u.id, u.nome, u.email
            ORDER BY ultima_mensagem DESC
        `, [userId, userId, userId, userId, userId, userId]);
        
        return rows;
    },


    async markMessagesAsRead(messageIds, userId) {
        if (!messageIds || messageIds.length === 0) {
            return { affectedRows: 0 };
        }

    
        const placeholders = messageIds.map(() => "?").join(",");
        const query = `UPDATE mensagens SET lida = TRUE WHERE id IN (${placeholders}) AND destinatario_id = ?`;
        const values = [...messageIds, userId];

        const [result] = await pool.query(query, values);
        return result;
    },


    async findUnreadMessagesFromSender(senderId, recipientId) {
        const [rows] = await pool.query(`
            SELECT id
            FROM mensagens
            WHERE remetente_id = ? 
              AND destinatario_id = ?
              AND lida = FALSE
        `, [senderId, recipientId]);
        
        return rows;
    },


    async getTotalUnreadCount(recipientId) {
        const [rows] = await pool.query(`
            SELECT COUNT(*) as total
            FROM mensagens
            WHERE destinatario_id = ?
              AND lida = FALSE
        `, [recipientId]);
        
        return rows[0]?.total || 0;
    },

    async getUnreadCountsBySender(recipientId) {
        const [rows] = await pool.query(`
            SELECT 
                remetente_id as sender_id,
                COUNT(*) as count
            FROM mensagens
            WHERE destinatario_id = ?
              AND lida = FALSE
            GROUP BY remetente_id
        `, [recipientId]);
        
        return rows;
    }
};

module.exports = Message;
