import { Container } from '../styles';
import Layout from '../components/Layout';
import React from 'react';

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>404</h1>
      <p>Oops, looks like that page doesn't exist 🤷‍♂️</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
