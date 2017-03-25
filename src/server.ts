import * as http from 'http';
import * as debug from 'debug';
// import * as mongoose from 'mongoose'; // export variables individually
import mongoose = require('mongoose');
import DevspaceUtils = require('./utils/DevspaceUtils'); // export = bla bla
import App from './App'; // export default
import io = require('socket.io');
const config = require('../config');

/**
 * @todo Implement a database acces layer
 */
mongoose.Promise = Promise
// mongoose.connect('mongodb://localhost:auth/devspace');
mongoose.connect(`mongodb://${config.mongoLabAuth}@ds035016.mlab.com:35016/calinortandb`).catch((error) => {
  console.log(error);
});


debug('ts-express:server');
const port = DevspaceUtils.normalizePort(process.env.PORT || 3000);
App.set('port', port);

const server = http.createServer(App);
server.listen(port);

const webSocketServer = io(server);
webSocketServer.on('connect', (socket) => {
  console.log(socket.id, ' connected');
  socket.on('disconnect', () => {
    console.log(socket.id, ' disconnected');
  });
});

server.on('error', (error) => {
  DevspaceUtils.onError(error, port);
});
server.on('listening', () => {
  DevspaceUtils.onListening(server)
});
