const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const { authenticateToken } = require("../middlewares/authMiddleware");


router.post("/", authenticateToken, chatController.sendMessage);


router.get("/:userId", authenticateToken, chatController.getConversation);


router.get("/", authenticateToken, chatController.getUserConversations);


router.put("/read", authenticateToken, chatController.markMessagesAsRead);


router.get("/unread/count", authenticateToken, chatController.getUnreadCount);

module.exports = router;
