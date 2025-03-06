import { Server } from "socket.io";
import http from "http";

import { SocketController } from "../services/sockets/socketService";
let io: Server;

export function initializeSockets(server: http.Server) {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173"
        },
    });
    SocketController(io);

    
}

export function getIoInstance(): Server|null {
    if (!io) {
        // throw new Error("Socket.io not initialized");
        return null;
    }
    return io;
}