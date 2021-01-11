import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./ReviewCart/Review";
import { HANDLE_ORDER } from "../context/Action_Types";
import { hanldeOrder } from "../context/App_Actions";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUPBLIC_KEY);

const PaymentForm = ({ shippingData, nextStep, backStep, timeOut }) => {
  const {
    state: { cartToken },
    dispatch,
  } = useContext(contextStore);
  // Get Shipping Option Selected Object
  const shippingFees = cartToken.shipping_methods
    .filter(s => s.id === shippingData.shippingOption)
    .pop();

  // Get Total Price With Shipping Fees
  const totalWithShippingFees = `${cartToken.live.currency.symbol}${(
    parseFloat(cartToken.live.subtotal.formatted) +
    parseFloat(shippingFees.price.formatted)
  ).toFixed(2)}`;

  // Handle Submit
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: cartToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: { payment_method_id: paymentMethod.id },
        },
      };
      hanldeOrder(cartToken, orderData, HANDLE_ORDER, dispatch);
      timeOut();
      nextStep();
    }
  };

  return (
    <React.Fragment>
      <Review
        totalWithShippingFees={totalWithShippingFees}
        shippingOption={shippingFees}
      />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment Methods
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay &nbsp;
                  {totalWithShippingFees}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </React.Fragment>
  );
};

export default PaymentForm;
