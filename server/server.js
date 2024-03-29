 const express = require('express') 
 const app = express() 
 const cors = require("cors");
 const { Server: SocketIO } = require('socket.io');

 const server = require("http").createServer(app); 
 const io = require("socket.io")(server, {
 	cors: {
 		origin: "http://localhost:3000",
 		
 	}
 });


app.get('/' , (req,res)=>{
    res.send('welcome to server')
 })

 const emailToSocketIdMap = new Map();
 const socketidToEmailMap = new Map();
 

 io.on('connection' , (socket)=> {

    console.log('user is connected' ,socket.id) 

   
     // get user data from client
     socket.on("room:join", (data) => {
        const { email, room } = data;
        emailToSocketIdMap.set(email, socket.id);
        socketidToEmailMap.set(socket.id, email);
        io.to(room).emit("user:joined", { email, id: socket.id });
        socket.join(room);
        io.to(socket.id).emit("room:join", data);

        socket.on("user:call", ({ to, offer }) => {
            io.to(to).emit("incomming:call", { from: socket.id, offer });
          });
        
          socket.on("call:accepted", ({ to, ans }) => {
            io.to(to).emit("call:accepted", { from: socket.id, ans });
          });
        
          socket.on("peer:nego:needed", ({ to, offer }) => {
            console.log("peer:nego:needed", offer);
            io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
          });
        
          socket.on("peer:nego:done", ({ to, ans }) => {
            console.log("peer:nego:done", ans);
            io.to(to).emit("peer:nego:final", { from: socket.id, ans });
          });
      });
})


//socket server activated
 server.listen('8000' , ()=>{
     console.log('server is running')
 })



 








