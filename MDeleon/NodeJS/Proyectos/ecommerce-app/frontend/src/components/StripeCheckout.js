import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ amount }) => {
  const onToken = (token) => {
    axios.post('http://localhost:5000/api/stripe/pay', {
      amount,
      currency: 'usd',
    })
    .then(response => {
      console.log('Payment successful', response);
    })
    .catch(error => {
      console.error('Payment failed', error);
    });
  };

  return (
    <StripeCheckout
      stripeKey="your-stripe-public-key"
      token={onToken}
      amount={amount * 100} // Stripe expects amount in cents
      name="E-commerce App"
    />
  );
};

export default StripeCheckoutButton;
