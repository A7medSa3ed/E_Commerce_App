import React, { useContext } from "react";
import { contextStore } from "../context/App_Context";
import { Grid } from "@material-ui/core";
import Product from "./Product";
import useStyles from "./styles";

const Index = () => {
  const {
    state: { products },
  } = useContext(contextStore);
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Index;
