import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar className="z-50" />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
