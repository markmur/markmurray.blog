import React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import { Container } from '../styles';

const CartPage = () => {
  return (
    <Layout displayTagline={false}>
      <Container p={0}>
        <Cart open />
      </Container>
    </Layout>
  );
};

export default CartPage;
