import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/store";
import { ToastContainer } from "react-toastify";
import { signOut, useSession } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Menu } from "@headlessui/react";
import DropdownLink from "./DropdownLink";
import Cookies from "js-cookie";

const Layout = ({ title, children }) => {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <>
      <Head>
        <title>{title ? title + "-Ecommerce" : "Jimmy Ecommerce"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href="/">
              <a className="text-lg font-bold">Ecommerce</a>
            </Link>
            <div className="flex">
              <div className="p-2">
                {" "}
                {status === "loading" ? (
                  "Loading"
                ) : session?.user ? (
                  <Menu as="div" className="relative inline-block">
                    <Menu.Button className="text-blue-800 text-bold">
                      Welcome, {session.user.name}
                    </Menu.Button>
                    <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg bg-gray-100">
                      <Menu.Item>
                        <DropdownLink className="dropdown-link" href="/profile">
                          Profile
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/order-history"
                        >
                          Order History
                        </DropdownLink>
                      </Menu.Item>
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="#"
                          onClick={logoutClickHandler}
                        >
                          Logout
                        </DropdownLink>
                      </Menu.Item>
                    </Menu.Items>
                  </Menu>
                ) : (
                  <Link href="/login">
                    <a className="p-2 font-semibold">Login </a>
                  </Link>
                )}
              </div>

              <div className="p-2 cursor-pointer flex">
                <Link href="/cart">
                  {/* <a className="p-2 font-semibold"> */}
                  <ShoppingCartIcon className="h-7 w-7" />
                </Link>
                <div className="">
                  {cartItemsCount > 0 && (
                    <span className="object-cover rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </div>
              </div>
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
