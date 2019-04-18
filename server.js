const express = require("express");
const next = require("next");
const nextI18NextMiddleware = require("next-i18next/middleware");
const { parse } = require("url");
const { customRoutes } = require("./config/routes");

const nextI18next = require("./utils/i18n");

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(nextI18NextMiddleware(nextI18next));

  customRoutes.forEach(route => {
    const routeValues = Object.values(route.paths).map(val => val);
    routeValues.forEach(routePath => {
      server.get(routePath, (req, res) => {
        const parsedUrl = parse(req.url, true);
        const query =
          route.options && route.options.asPathname
            ? req.params
            : parsedUrl.query;
        const pathname =
          route.options && route.options.asPathname
            ? route.options.asPathname
            : route.paths[nextI18next.i18n.options.defaultLanguage];
        app.render(req, res, pathname, query);
      });
    });
  });

  server.get("*", (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
