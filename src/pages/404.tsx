import React from 'react';
import Layout from '../components/Layout';
import { Container } from '../styles';

const NotFoundPage = () => (
  <Layout>
    <Container>
      <h1>404</h1>
      <p>Oops, looks like that page doesn't exist 🤷‍♂️</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
