import Link from "next/link";
import React, { useContext } from "react";
import { Store } from "../utils/store";
import toast from "react-hot-toast";

const ProductItem = ({ product }) => {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = (item) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      toast.error("Sorry, product has reached stock limit");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a href="">
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="">${product.price}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
