import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import useStyles from "./styles";
const EmptyCard = () => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle1">
      You Have No Item In Your Shopping Cart,
      <Link to="/" className={classes.link}>
        Start Adding Some !
      </Link>
    </Typography>
  );
};

export default EmptyCard;
