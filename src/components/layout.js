import React from "react";
import { Link } from "gatsby";
import classNames from "classnames";
import SEO from "./seo";
import Logo from "./logo";
import Cover from "./cover";
import { isIndexPage } from "../utils";

const Layout = ({ location, title, description, children }) => {
  const seo = isIndexPage(location) ? (
    <SEO />
  ) : (
    <SEO title={title} description={description} />
  );
  const header = isIndexPage(location) ? (
    <Logo />
  ) : (
    <Logo to={`/`} component={Link} variant="small" />
  );

  const cover = <Cover />;

  return (
    <div
      className={classNames("Layout", {
        isIndexPage
      })}
    >
      {seo}
      <header>{header}</header>
      <main>{children}</main>
      <footer>{cover}</footer>
    </div>
  );
};

export default Layout;
