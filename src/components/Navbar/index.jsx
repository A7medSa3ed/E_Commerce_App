import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import logo from "../../assets/commerce.png";
import useStyles from "./styles";

const Index = () => {
  const { state } = useContext(contextStore);
  const location = useLocation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link} // Act As Router Link By Call Link Component Here
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="E-Commerce-App"
              height="25px"
              className={classes.image}
            />
            E-Commerce-App
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link} // Act As Router Link By Call Link Component Here
                to="/cart"
                aria-label="Show Cart Items"
                color="inherit"
              >
                <Badge
                  badgeContent={state.cart && state.cart.total_items}
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Index;
