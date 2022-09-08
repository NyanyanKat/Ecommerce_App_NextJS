import Head from "next/head";
import Link from "next/link";
import React from "react";

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + "-Ecommerce" : "Jimmy Ecommerce"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/">
              <a className="text-lg font-bold">Ecommerce</a>
            </Link>
            <div className="">
              <Link href="/cart">
                <a className="p-2">Cart </a>
              </Link>
              <Link href="/login">
                <a className="p-2">Login </a>
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-start h-10 shadow-inner">
          <p>Copyright 2022 Jimmy's Ecommerce</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
