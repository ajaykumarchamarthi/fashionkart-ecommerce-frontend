import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useHistory } from "react-router-dom";
import classes from "./PasswordReset.module.css";

const Schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "Password must atleast 6 characters long")
    .max(15)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

function PasswordReset() {
  const history = useHistory();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  function submitHandler(data) {
    // event.preventDefault();
    const password = data.password;
    const passwordConfirm = data.confirmPassword;

    const token = params.token;

    fetch(
      `https://fashionkart-ecommerce.herokuapp.com/api/v1/users/resetPassword/${token}`,
      {
        method: "PATCH",
        body: JSON.stringify({ password, passwordConfirm }),
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
            // if (data && data.message) {
            //   errorMessage = data.message;
            // }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3>Reset Password</h3>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            {...register("password", { required: true })}
          />
          <p className={classes.error}>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your Confirm password"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
          <p className={classes.error}>{errors.password?.message}</p>
        </div>
        <div className={classes.actions}>
          <button className={classes.btn} type="submit">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordReset;
