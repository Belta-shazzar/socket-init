import "reflect-metadata";
import http from "http";
import initialize from "./initialize";
import config from "./config";
import log from "./lib/logger";
import stoppable from "stoppable";

const startServer = async () => {
  (global as any).isStartingUp = true;

  const app = (await import("./app")).default;
  const server = stoppable(http.createServer(app));

  server.listen(config.app.port, () => {
    log.info(
      `! Server Started and Listening on Port: ${config.app.port} with PID: ${process.pid}`
    );
    (global as any).isStartingUp = false;
  });

  process.on("SIGTERM", async () => {
    (global as any).isShuttingDown = true;

    log.info("Starting graceful server shutdown");

    // wait for readiness probe to start failing before stopping the server
    await new Promise((resolve) => setTimeout(resolve, 15 * 1000));

    server.stop(() => {
      log.info("Graceful server shutdown completed");
      setTimeout(() => process.exit(0), 1000);
    });
  });
};

const start = async () => {
  try {
    await initialize();
    await startServer();
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
};

export default start();
