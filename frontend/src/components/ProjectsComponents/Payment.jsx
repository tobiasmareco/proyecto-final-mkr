import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';

export const Payment = () => {
  return (
    <>
        <div>Premium</div>
        <StripeCheckout>
            stripeKey={pk_test_51N4DhbGkt4TEGAhYie8YtlBnA2iraPRAdVvT8FwVs0ChmQpjlpdRFaKFGuGsGrczuKcQHWMAZ4fX7P05Tktyzmjr000fZgL1a1}
            label="Pay Now"
            name="Pay With Credit Card"
            billingAddress
            shippingAddress
            amount={priceForStripe}
            description={`Your total is $${product.price}`}
            token={payNow}
        </StripeCheckout>
    </>
    

  )
}
