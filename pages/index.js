import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import axios from 'axios';
// import data from '../utils/data';
import db from '../utils/db';
import { Store } from '../utils/store';
import toast from 'react-hot-toast';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error(`Sorry, ${product.name} has reached stock limit`);
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCartHandler={addToCartHandler}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  // Runs before the components
  // Provides data from database to components

  await db.connect();

  const products = await Product.find().lean(); // lean gets only product info
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
