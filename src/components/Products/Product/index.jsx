import React, { useContext } from "react";
import { contextStore } from "../../context/App_Context";
import { handleAddToCart } from "../../context/App_Actions";
import { HANDLE_CART_ADD } from "../../context/Action_Types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import useStyles from "./styles";

const Index = ({ product }) => {
  const { dispatch } = useContext(contextStore);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add To Cart"
          onClick={() =>
            handleAddToCart(product.id, 1, HANDLE_CART_ADD, dispatch)
          }
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Index;
