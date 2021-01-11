import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import { Container, Typography } from "@material-ui/core";
import EmptyCard from "./EmptyCard";
import FillCart from "./FillCart";
import useStyles from "./styles";

const Index = () => {
  // Get Cart Items
  const {
    state: { cart },
  } = useContext(contextStore);

  const classes = useStyles();

  // Check If Cart Line Items is Empty, If Empty it will Return Error, So We Handle Error Here
  if (!cart.line_items) return <h3>Loading...</h3>;

  // Return Cart Component
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCard /> : <FillCart />}
    </Container>
  );
};

export default Index;
