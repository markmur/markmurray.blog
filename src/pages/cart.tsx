import React from 'react';
import Cart from '../components/Cart';
import Layout from '../components/Layout';
import { Container } from '../styles';

const CartPage = () => {
  return (
    <Layout displayTagline={false}>
      <Container maxWidth="600">
        <Cart />
      </Container>
    </Layout>
  );
};

export default CartPage;
