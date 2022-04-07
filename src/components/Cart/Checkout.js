import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./Checkout.module.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  postalCode: yup
    .string()
    .min(6, "Enter a valid Postal code")
    .max(6, "Enter a valid Postal code")
    .required("Postal Code is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  mobileNumber: yup
    .string()
    .min(10, "Enter a valid mobile number")
    .max(10, "Enter a valid mobile number")
    .required("Mobile number is required"),
});

const Checkout = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const confirmHandler = (data, event) => {
    event.preventDefault();
    props.onConfirm({
      name: data.name,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
      state: data.state,
      mobileNumber: data.mobileNumber,
    });
    props.onCancel();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(confirmHandler)}>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          {...register("name", { required: true })}
        />
        <p>{errors.name?.message}</p>
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address (Area and Street)</label>
        <input
          type="text"
          id="address"
          name="address"
          {...register("address", { required: true })}
        />
        <p>{errors.address?.message}</p>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="number"
          id="postal"
          name="postalCode"
          {...register("postalCode", {
            required: true,
            minLength: {
              value: 6,
              message: "Postal Code length must be 6 characters long!",
            },
          })}
        />
        <p>{errors.postalCode?.message}</p>
      </div>
      <div className={classes.control}>
        <label htmlFor="mobileNumber">Mobile Number</label>
        <input
          type="number"
          id="mobileNumber"
          name="mobileNumber"
          {...register("mobileNumber", {
            required: true,
          })}
        />
        <p>{errors.mobileNumber?.message}</p>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          {...register("city", { required: true })}
        />
        <p>{errors.city?.message}</p>
      </div>
      <div className={classes.control}>
        <label htmlFor="state">State</label>
        <input
          type="text"
          id="city"
          name="state"
          {...register("state", { required: true })}
        />
        <p>{errors.state?.message}</p>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm Order</button>
      </div>
    </form>
  );
};

export default Checkout;
