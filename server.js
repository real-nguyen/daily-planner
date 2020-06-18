// node.js import syntax
const http = require('http');
const debug = require('debug')("node-angular");
// Listener for incoming requests; handled by ExpressJS
const app = require('./backend/app');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // Named pipe
    return val;
  }

  if (port >= 0) {
    // Port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  switch(error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + port;
  debug("Listening on " + bind);
}

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Pass middleware app as parameter so it can handle requests
const server = http.createServer(app);
// Bind Node event listeners
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
