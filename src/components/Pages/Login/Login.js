import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useHistory } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import classes from "./Login.module.css";

const Schema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must atleast 4 characters long")
    .max(15)
    .required(),
});

function Login() {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  function submitHandler(data) {
    // event.preventDefault();
    const email = data.email;
    const password = data.password;

    fetch("https://fashionkart-ecommerce.herokuapp.com/api/v1/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "content-Type": "application/json",
      },
    })
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
        authCtx.login(data.token);
        localStorage.setItem("userId", data.data.user._id);
        history.replace("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3>Login</h3>
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            name="email"
            {...register("email", { required: true })}
          />
          <p className={classes.error}>{errors.email?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            {...register("password", { required: true })}
          />
          <p className={classes.error}>{errors.password?.message}</p>
        </div>
        <div className={classes.actions}>
          <button className={classes.btn} type="submit">
            Login
          </button>
          <h6>
            <Link to="/forgotpassword">Forgot Password?</Link>
          </h6>
        </div>
        <hr />
        <div className={classes.signupactions}>
          <h6>Need an account?</h6>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
