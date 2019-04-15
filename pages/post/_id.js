import React from "react";
import { withRouter } from "next/router";

const Post = ({ router }) => (
  <div>
    <h1>Single Post</h1>
    <p>{router.query.id}</p>
  </div>
);

export default withRouter(Post);
