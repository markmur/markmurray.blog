import Cart from '../components/Cart';
import { Container } from '../styles';
import Layout from '../components/Layout';
import React from 'react';

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
