const socketIo = require('socket.io');
const http = require('http');
const app = require('./app');
const Employe = require("./Models/Employe") ; 

const server = http.createServer(app);
const io = socketIo(server, {
    serveClient: true, // Serve the client files
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listening for salary updates
  socket.on('salaryAlert', async (data) => {
      try {
          const employee = await Employe.findById(data.id);
          if (employee && employee.Salary > 4000) {
              // Emitting an alert if salary exceeds 4000 DT
              io.emit('salaryAlert', { employeeId: employee.id, message: 'Employee salary exceeds 4000 DT' });
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });

  // Disconnect event
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

module.exports = io;
