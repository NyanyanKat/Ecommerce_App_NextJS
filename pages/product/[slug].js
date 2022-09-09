import React from "react";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import data from "../../utils/data";
import Link from "next/link";

export default function ProductScreen() {
  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find((x) => x.slug === slug);

  if (!product) return <div>Product Not Found</div>;

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Back to Home Page</Link>
      </div>

      {/* Four columns total */}
      <div className="grid md:grid-cols-4 md:gap-3">
        {/* Two columns for this div */}
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>

        <div className="">
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>Description: {product.description} </li>
          </ul>
        </div>

        <div className="">
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div className="">Price</div>
              <div className="">${product.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div className="">Status</div>
              <div className="">
                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </div>
            </div>
            <button className="primary-button w-full">Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
