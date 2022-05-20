import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Cart.module.css";
import Modal from "./../../UI/Modal";
import CartContext from "../../store/cart-context";
import AuthContext from "../../store/auth-context";
import Checkout from "./Checkout";
import CartItem from "./CartItem";
import axios from "axios";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);

  const userId = localStorage.getItem("userId");

  const history = useHistory();

  const cartCtx = useContext(CartContext);
  const totalAmount = `₹ ${cartCtx.totalAmount.toFixed(2)}/-`;
  const hasItems = cartCtx.items.length > 0;

  const authCtx = useContext(AuthContext);

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const clearCartHandler = () => {
    cartCtx.clearCart();
  };

  const orderHandler = () => {
    authCtx.isLoggedIn ? setIsCheckOut(true) : history.replace("/login");
  };

  const loadRazorPay = (customerAddress) => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };

    script.onload = async () => {
      try {
        const result = await axios.post(
          "https://fashionkart-ecommerce.herokuapp.com/api/v1/orders/create-order",
          {
            amount: cartCtx.totalAmount + "00",
          }
        );

        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(
          "https://fashionkart-ecommerce.herokuapp.com/api/v1/orders/get-razorpay-key"
        );

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: "Fashionkart",
          description: "Fashionkart transaction",
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post(
              "https://fashionkart-ecommerce.herokuapp.com/api/v1/orders/pay-order",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
                orderedItems: cartCtx.items,
                deliveryAddress: customerAddress,
                user: userId,
              }
            );
            alert(result.data.message);
            history.push("/orders");
            clearCartHandler();
          },
          prefill: {
            name: "example name",
            email: "email@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "@Fashionkart",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
      }
    };
    document.body.appendChild(script);
  };

  const cartItem = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onCloseCart}>
      {cartItem}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && (
        <Checkout onConfirm={loadRazorPay} onCancel={props.onCloseCart} />
      )}
      {!isCheckOut && modalActions}
    </Modal>
  );
};

export default Cart;
