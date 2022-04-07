import React, { useEffect, useState } from "react";
import Order from "./../Orders/Order";
import axios from "axios";
import classes from "./Orders.module.css";

function Orders() {
  const [orders, setOrders] = useState([]);

  const userId = localStorage.getItem("userId");

  const loadOrders = async () => {
    try {
      const response = await axios.get(
        "https://fashionkart-ecommerce.herokuapp.com/api/v1/orders/list-orders"
      );

      const { data } = response.data;
      setOrders(data.orders);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) => order.user._id === userId)
    .map((order) => <Order order={order} key={order._id} />);

  return (
    <>
      <div className={classes.orders}>
        <div className={classes.title}>
          <h3>Orders</h3>
        </div>
        <div>
          <div className={classes.orderslist}>{filteredOrders}</div>
        </div>
      </div>
    </>
  );
}

export default Orders;
