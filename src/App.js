import React from "react";
import { Products, Navbar, Cart, Checkout } from "./components";
import AppContext from "./components/context/App_Context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <AppContext>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Products} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </AppContext>
    </Router>
  );
}

export default App;
