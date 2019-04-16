import React, { Component } from "react";
import { withNamespaces, Link, i18n } from "../utils/i18n";

class HomePage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ["common"]
    };
  }

  handleChangeLanguage = () => {
    return i18n.changeLanguage(i18n.language === "en" ? "id" : "en");
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <h1>{t("home")}</h1>
        <Link href="/about">
          <a>{t("goToAbout")}</a>
        </Link>
        <br />
        <button type="button" onClick={this.handleChangeLanguage}>
          {t("changeLang")}
        </button>
        <div>
          <h4>
            <Link
              href={{ pathname: "/post/_id", query: { id: 1 } }}
              as="/post/1"
            >
              <a>Post 1</a>
            </Link>
          </h4>
          <h4>
            <Link
              href={{ pathname: "/post/_id", query: { id: 2 } }}
              as="/post/2"
            >
              <a>Post 2</a>
            </Link>
          </h4>
          <h4>
            <Link
              href={{ pathname: "/post/_id", query: { id: 3 } }}
              as="/post/3"
            >
              <a>Post 3</a>
            </Link>
          </h4>
        </div>
      </div>
    );
  }
}

export default withNamespaces(["common"])(HomePage);
