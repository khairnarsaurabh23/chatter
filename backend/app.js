const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./utils/database');
const http = require('http');
const socketIO = require('socket.io');

// Import the routers
const userRouter = require('./routers/user');
const groupRouter = require('./routers/group');
const messageRouter = require('./routers/message');
const friendsRouter = require('./routers/friends');
const { addMessage } = require('./utils/createMesage');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routers
app.use(userRouter);
app.use(messageRouter);
app.use(friendsRouter);
app.use(groupRouter);


io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("chat message", async (data) => {
    console.log(data);
    if (data.groupId) {
      const [formattedData] = await Promise.all([
        addMessage(data.groupId, data.message, data.self),
      ]);
      console.log(formattedData);
      socket.emit("message", formattedData);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
sequelize
  .sync()
  .then(() => {
    server.listen(3000, () => {
      console.log('Listening on 3000');
    });
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
