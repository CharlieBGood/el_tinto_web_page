import * as React from 'react';

function StripeButton(props) {
  // Paste the stripe-buy-button snippet in your React component
  return (
    <stripe-buy-button
      buy-button-id={props.id}
      publishable-key={process.env.REACT_APP_STRIPE_API_KEY}
    >
    </stripe-buy-button>
  );
}

export default StripeButton;