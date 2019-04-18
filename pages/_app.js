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
        if (Router.router.pathname === route.en && routePath !== route[lng]) {
          history.replaceState(null, null, `/${lng}${route[lng]}`);
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
