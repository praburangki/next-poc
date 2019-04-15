import React, { Component } from "react";
import { withNamespaces, Link, i18n } from "../utils/i18n";

class AboutPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ["index"]
    };
  }

  handleChangeLanguage = () => {
    return i18n.changeLanguage(i18n.language === "en" ? "id" : "en");
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <h1>{t("about")}</h1>
        <Link href="/">
          <a>{t("goToHome")}</a>
        </Link>
        <br />
        <button type="button" onClick={this.handleChangeLanguage}>
          {t("changeLang")}
        </button>
      </div>
    );
  }
}

export default withNamespaces(["index"])(AboutPage);
