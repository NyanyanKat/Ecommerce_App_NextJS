import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";

const Layout = ({ title, children }) => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

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
                <a className="p-2 font-semibold">
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
              </Link>
              <Link href="/login">
                <a className="p-2 font-semibold">Login </a>
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
