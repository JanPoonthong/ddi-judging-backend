import { Server } from "socket.io";

export default async function socket(req, res) {
    let socketList = [];
    console.log(res);
    const io = new Server(res.socket.server, { cors: { origin: "*" } });

    io.on("connection", (socket) => {
        socketList.push(socket);
        console.log("a user connected");

        socket.on("disconnect", () => {
            console.log("user disconnected");
            socketList.splice(socketList.indexOf(socket), 1);
        });
    });

    return socketList;
}
