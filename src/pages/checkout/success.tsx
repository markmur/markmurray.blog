import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { useShoppingCart } from 'use-shopping-cart';

import { Box, Container, PageHeading, Text } from '../../styles';
import Layout from '../../components/Layout';
import BackgroundLines from '../../components/BackgroundLines';

const CheckoutSuccessPage = () => {
  const { clearCart } = useShoppingCart();

  React.useEffect(() => {
    // Clear the cart when the user makes it to this page
    clearCart();
  }, []);

  return (
    <Layout wide displayTagline={false}>
      <BackgroundLines />

      <Container py={[5, 6]} pt={[5, 5]} pb={[3, 4]} minHeight="60vh">
        <Box textAlign="center">
          <Box>
            <FiCheckCircle size={50} color="blue" />
          </Box>

          <Box my={4}>
            <PageHeading>Checkout Successful</PageHeading>
          </Box>

          <Box maxWidth={700} margin="auto" textAlign="center">
            <Text as="h3" mb={3}>
              Thank you so much for your purchase.
            </Text>

            <Text>
              Shipping can take up to 10 working days. If your items take longer
              that this to arrive, please reach out to me at{' '}
              <a href="mailto:orders@markmurray.co">orders@markmurray.co</a>.
            </Text>

            <Text as="h5">
              (It really means a lot for you to support my work)
            </Text>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default CheckoutSuccessPage;
