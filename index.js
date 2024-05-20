require("dotenv").config();
const http = require("http");
const { app } = require("./app");
const logger = require("./src/libs/lib.logger");
const { API_PORT } = process.env;

if (!API_PORT) {
  logger.error("API_PORT is not defined in the environment variables.");
  process.exit(1);
}

const port = API_PORT;


const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});

server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      logger.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
