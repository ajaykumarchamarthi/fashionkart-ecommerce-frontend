import React from "react";
import classes from "./Order.module.css";

function Order({ order }) {
  const date = new Date(order.orderedDate);
  const orderedDate = date.toDateString();

  return (
    <div className={classes.order}>
      <div className={classes.details}>
        <p>Order Date - {orderedDate}</p>
        <p>Order Id - {order._id}</p>
      </div>
      {order.orderedItems.map((item) => (
        <h6 className={classes.name} key={item._id}>
          {item.name} <span className={classes.qty}>QTY - {item.amount}</span>
        </h6>
      ))}
      <div className={classes.total}>
        <p>Total Amount -</p>
        <p className={classes.totalAmount}>₹ {order.amount / 100} /-</p>
      </div>
      <div className={classes.line}>
        <hr />
      </div>
    </div>
  );
}

export default Order;
