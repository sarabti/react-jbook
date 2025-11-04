import express from "express";
import http from "http";
import { createProxyMiddleware } from "http-proxy-middleware";
import path from "path";

export const serve = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express();
  const server = http.createServer(app);

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: "http://localhost:5173",
        ws: true,
        logger: console,
      })
    );
  } else {
    const packagePath = require.resolve("local-client/dist/index.html");
    app.use(express.static(path.dirname(packagePath)));
  }

  return new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, () => resolve());
  });
};
