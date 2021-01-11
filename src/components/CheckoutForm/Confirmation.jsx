import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import {
  Button,
  Divider,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./Checkout/styles";
import { REFRESH_CART } from "../context/Action_Types";
import { refreshCart } from "../context/App_Actions";
const Confirmation = ({ isFinished }) => {
  const {
    state: { order },
    dispatch,
  } = useContext(contextStore);
  const classes = useStyles();

  if (order.customer)
    return (
      <React.Fragment>
        <div>
          <Typography variant="h5">
            Thank You For Your Purchase, {order.cutomer.firstname}
            {order.cutomer.lastname}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant="subtitle2">
            Order Ref : {order.cutomer_refrence}
          </Typography>
        </div>
        <br />
        <Button
          variant="outlined"
          type="button"
          component={Link}
          to="/"
          onClick={() => refreshCart(REFRESH_CART, dispatch)}
        >
          Back To Home
        </Button>
      </React.Fragment>
    );

  if (isFinished) {
    return (
      <React.Fragment>
        <div>
          <Typography variant="h5">Thank You For Your Purchase</Typography>
          <Divider className={classes.divider} />
        </div>
        <br />
        <Button
          variant="outlined"
          type="button"
          component={Link}
          to="/"
          onClick={() => refreshCart(REFRESH_CART, dispatch)}
        >
          Back To Home
        </Button>
      </React.Fragment>
    );
  } else {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }
};

export default Confirmation;
