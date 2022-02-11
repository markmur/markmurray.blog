import React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';

const CartPage = () => {
  return (
    <Layout displayTagline={false}>
      <Cart open />
    </Layout>
  );
};

export default CartPage;
