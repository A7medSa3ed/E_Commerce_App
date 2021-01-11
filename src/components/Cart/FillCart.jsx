import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import { Grid, Typography, Button } from "@material-ui/core";
import { handleEmpty } from "../context/App_Actions";
import { HANDLE_CART_EMPTY } from "../context/Action_Types";
import CartItem from "./CartItem";
import useStyles from "./styles";
import { Link } from "react-router-dom";
const FillCart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(contextStore);

  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        {cart.line_items.map(item => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem cartItem={item} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal : {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={() => handleEmpty(HANDLE_CART_EMPTY, dispatch)}
          >
            Empty Card
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default FillCart;
