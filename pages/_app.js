import React from "react";
import App, { Container } from "next/app";
import Router from "next/router";
import { appWithTranslation, i18n } from "../utils/i18n";
import { customRoutes } from "../config/routes";
import { parse } from "url";

class MyApp extends App {
  componentDidMount() {
    Router.events.on("routeChangeComplete", url => {
      const lng = i18n.language;
      const { pathname } = parse(url, true);
      const routePath = pathname.substring(3);

      customRoutes.forEach(route => {
        if (
          Router.router.pathname ===
            route.paths[i18n.options.defaultLanguage] &&
          routePath !== route.paths[lng]
        ) {
          return history.replaceState(null, null, `/${lng}${route.paths[lng]}`);
        } else if (
          route.options &&
          route.options.asPathname &&
          Router.router.pathname === route.options.asPathname &&
          lng !== i18n.options.defaultLanguage &&
          routePath !== route.paths[lng]
        ) {
          const regex = /:[a-zA-Z0-9]*/g;
          let path = `/${lng}${route.paths[lng]}`;
          const params = path.match(regex);

          params.forEach(param => {
            const paramWithoutColon = param.split(":")[1];
            const realParam = Router.router.query[paramWithoutColon];
            path = path.replace(param, realParam);
          });

          return history.replaceState(null, null, path);
        }
      });
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
