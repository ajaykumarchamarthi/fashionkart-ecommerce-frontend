import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./ForgotPassword.module.css";

const Schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
});

function ForgotPassword() {
  const history = useHistory();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const submitHandler = (data, event) => {
    event.preventDefault();
    const email = data.email;
    fetch(
      "https://pacific-mesa-21424.herokuapp.com/api/v1/users/forgotPassword",
      {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = `${data.message}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then(() => {
        history.replace("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Yo! Forgot Your Password?</h3>
      <p>No worries! Enter your email and we will send you a reset.</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email?.message}
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
