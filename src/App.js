import React, { useState, useContext, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Products from "./components/Pages/Products/Products";
import SignUp from "./components/Pages/SignUp/SignUp";
import Login from "./components/Pages/Login/Login";
import Orders from "./components/Pages/Orders/Orders";
import ForgotPassword from "./components/Pages/Forgot Password/ForgotPassword";
import PasswordReset from "./components/Pages/Password Reset/PasswordReset";
import Footer from "./components/Footer/Footer";
import Cart from "./components/Cart/Cart";
import { AuthContextProvider } from "./store/auth-context";
import CartProvider from "./store/Cart-Provider";
import AuthContext from "./store/auth-context";
import LoadingSpinner from "./UI/LoadingSpinner";
import classes from "./App.module.css";

const Men = React.lazy(() => import("./components/Pages/Men/Men"));
const Women = React.lazy(() => import("./components/Pages/Women/Women"));
const Accessories = React.lazy(() =>
  import("./components/Pages/Accessories/Accessories")
);
const ProductDetails = React.lazy(() =>
  import("./components/Pages/Products/ProductDetails")
);

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const authCtx = useContext(AuthContext);

  const showCartCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      <AuthContextProvider>
        {cartIsShown && <Cart onCloseCart={hideCartHandler} />}
        <NavBar showCart={showCartCartHandler} />

        <div className={classes.container}>
          <div className={classes.wrapper}>
            <Suspense fallback={<LoadingSpinner />}>
              <Switch>
                <Route path="/" exact>
                  <Products />
                </Route>
                <Route path="/men">
                  <Men />
                </Route>
                <Route path="/women">
                  <Women />
                </Route>
                <Route path="/accessories">
                  <Accessories />
                </Route>
                <Route path="/products/:productId">
                  <ProductDetails />
                </Route>

                <Route path="/orders">
                  <Orders />
                </Route>

                {!authCtx.isLoggedIn && (
                  <Route path="/signup">
                    <SignUp />
                  </Route>
                )}
                {!authCtx.isLoggedIn && (
                  <Route path="/login">
                    <Login />
                  </Route>
                )}
                <Route path="/forgotpassword">
                  <ForgotPassword />
                </Route>
                {!authCtx.isLoggedIn && (
                  <Route path="/resetpassword/:token" exact>
                    <PasswordReset />
                  </Route>
                )}
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
        <Footer />
      </AuthContextProvider>
    </CartProvider>
  );
}

export default App;
