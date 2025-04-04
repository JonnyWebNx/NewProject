import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="layout">
        <Header />
      <main>
        <Outlet />
      </main>
        <Footer />
    </div>
  );
};

export default Layout;
