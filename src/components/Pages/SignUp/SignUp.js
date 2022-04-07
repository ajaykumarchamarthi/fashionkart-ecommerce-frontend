import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../../store/auth-context";
import * as yup from "yup";
import classes from "./SignUp.module.css";

const Schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must atleast 6 characters long")
    .max(15)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match"),
});

function SignUp() {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });

  const submitHandler = (data, event) => {
    event.preventDefault();

    const name = data.name;
    const email = data.email;
    const password = data.password;
    const passwordConfirm = data.confirmPassword;

    fetch("https://pacific-mesa-21424.herokuapp.com/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password, passwordConfirm }),
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
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.token);
        history.push("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>Sign up</h3>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          <p className={classes.error}>{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter your confirm password"
            name="confirmPassword"
            {...register("confirmPassword", { required: true })}
          />
          <p className={classes.error}>{errors.confirmPassword?.message}</p>
        </div>
        <div className={classes.actions}>
          <button className={classes.btn} type="submit">
            Sign up
          </button>
          <h6>Already have an account?</h6>
          <Link to="/login">
            <h6 className={classes.link}>Click here to Login</h6>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
