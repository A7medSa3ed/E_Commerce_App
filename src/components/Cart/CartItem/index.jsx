import React, { useContext } from "react";
import { contextStore } from "../../context/App_Context";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import { handleUpdateQty, handleRemoveItem } from "../../context/App_Actions";
import {
  HANDLE_CART_UPDATE_QTY,
  HANDLE_CART_REMOVE_ITEM,
} from "../../context/Action_Types";
import useStyles from "./styles";

const Index = ({ cartItem }) => {
  const { dispatch } = useContext(contextStore);
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={cartItem.media.source}
        alt={cartItem.name}
        className={classes.media}
      />
      <CardContent className={classes.cardContent}>
        <Typography variant="h4">{cartItem.name}</Typography>
        <Typography variant="h5">
          {cartItem.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
            type="button"
            size="small"
            onClick={() =>
              handleUpdateQty(
                cartItem.id,
                cartItem.quantity - 1,
                HANDLE_CART_UPDATE_QTY,
                dispatch
              )
            }
          >
            -
          </Button>
          <Typography>{cartItem.quantity}</Typography>
          <Button
            type="button"
            size="small"
            onClick={() =>
              handleUpdateQty(
                cartItem.id,
                cartItem.quantity + 1,
                HANDLE_CART_UPDATE_QTY,
                dispatch
              )
            }
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() =>
            handleRemoveItem(cartItem.id, HANDLE_CART_REMOVE_ITEM, dispatch)
          }
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default Index;
