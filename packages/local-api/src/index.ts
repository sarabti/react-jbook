import express from "express";
import http from "http";

export const serve = (port: number, filename: string, dir: string) => {
  const app = express();
  const server = http.createServer(app);

  return new Promise<void>((resolve, reject) => {
    server.on("error", reject);
    server.listen(port, () => resolve());
  });
};
