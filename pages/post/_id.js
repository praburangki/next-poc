import React, { Component } from "react";
import { withRouter } from "next/router";
import { withNamespaces, i18n } from "../../utils/i18n";

class Post extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ["common"]
    };
  }

  handleChangeLanguage = () => {
    return i18n.changeLanguage(i18n.language === "en" ? "id" : "en");
  };

  render() {
    const { router, t } = this.props;

    return (
      <div>
        <h1>Single Post</h1>
        <p>{router.query.id}</p>
        <button type="button" onClick={this.handleChangeLanguage}>
          {t("changeLang")}
        </button>
      </div>
    );
  }
}

export default withNamespaces("common")(withRouter(Post));
