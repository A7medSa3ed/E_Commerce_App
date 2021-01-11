import React, { useState, useContext, useEffect } from "react";
import { contextStore } from "../../context/App_Context";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import { AddressForm, PaymentForm, Confirmation } from "../index";
import useStyles from "./styles";
import { generateToken } from "../../context/App_Actions";
import { GET_TOKEN } from "../../context/Action_Types";
import { useHistory } from "react-router-dom";

const steps = ["Shipping Address", "Payment Details"];

const Index = () => {
  const {
    state: { cart, cartToken },
    dispatch,
  } = useContext(contextStore);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState();
  const classes = useStyles();
  const history = useHistory();
  console.log(history);

  // time out here to skip loading after pay, because we have visa card to continue
  const timeOut = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  useEffect(() => {
    /* we define variable to control useEffect when we use Async functions, 
    set it to false after finish in return */
    let isMounted = false;

    !isMounted && generateToken(cart, GET_TOKEN, dispatch, history);

    return () => {
      // Set It To False After Finish Usage Of useEffect
      isMounted = true;
    };
  }, [cart, dispatch, history]);

  const nextStep = () => setActiveStep(prevStep => prevStep + 1);
  const backStep = () => setActiveStep(prevStep => prevStep - 1);

  const goToPayment = data => {
    setShippingData(data);
    nextStep();
  };

  // Switch Between Forms By Steps
  const CheckoutForms = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={cartToken} goToPayment={goToPayment} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        timeOut={timeOut}
      />
    );

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(step => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation isFinished={isFinished} />
          ) : (
            cartToken && <CheckoutForms />
          )}
        </Paper>
      </main>
    </React.Fragment>
  );
};

export default Index;
