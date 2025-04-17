const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');



const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  });

const connectedUsers = {

};
  
io.on('connection', socket => {
    const { user_id } = socket.handshake.query;
    connectedUsers[user_id] = socket.id;

});

app.use((req, res, next)=> {
    req.io = io;
    req.connectedUsers = connectedUsers;
    return next();
})

app.use(cors({
  origin: 'http://localhost:3000' // apenas seu front pode fazer requisições
}));

mongoose.connect('mongodb+srv://omnistack:omnistack@tutorialrocketseat.hj1lyio.mongodb.net/?retryWrites=true&w=majority&appName=TutorialRocketseat', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json()); 
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes); 


server.listen(3333, () => {
  console.log("Servidor rodando na porta 3333!");
});
