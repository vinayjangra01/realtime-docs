import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

import Connection from "./db/db.js";
import { getDocument, updateDocument } from "./controller/document.controller.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
}));

const PORT = process.env.PORT || 9000;

Connection();

app.get("/hi", (req, res) => {
  res.send("Socket server running ✅");
});

// ✅ Create HTTP server from express
const server = http.createServer(app);

// ✅ Attach socket.io to same server
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("✅ Socket connected:", socket.id);

  socket.on("get-document", async (documentId) => {
    const document = await getDocument(documentId);

    socket.join(documentId);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await updateDocument(documentId, data);
    });
  });
});

// ✅ Listen only once
server.listen(PORT, () => {
  console.log(`✅ Server + Socket running on port ${PORT}`);
});
