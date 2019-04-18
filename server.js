const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware");
const { parse } = require("url");

const nextI18next = require("./utils/i18n");

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  server.get(/\/(about|tentang)/, (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { query } = parsedUrl;

    app.render(req, res, "/about", query);
  });

  server.get("/post/:id", (req, res) => {
    app.render(req, res, "/post/_id", { id: req.params.id });
  });

  server.get("*", (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
