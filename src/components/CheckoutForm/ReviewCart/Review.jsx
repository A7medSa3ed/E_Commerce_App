import React, { useContext } from "react";
import { contextStore } from "../../context/App_Context";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";
const Review = ({ shippingOption, totalWithShippingFees }) => {
  const {
    state: { cartToken },
  } = useContext(contextStore);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {cartToken.live.line_items.map(product => (
          <ListItem style={{ padding: "10px 0" }} key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography variant="body2">
              {product.line_total.formatted_with_symbol}
            </Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText
            primary="Shipping Fees"
            secondary={shippingOption.description}
          />
          <Typography variant="body2">
            {shippingOption.price.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem style={{ padding: "10px 0" }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" style={{ fontWeight: 700 }}>
            {totalWithShippingFees}
          </Typography>
        </ListItem>
      </List>
    </React.Fragment>
  );
};

export default Review;
