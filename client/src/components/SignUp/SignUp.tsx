import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./SignUp.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { selectAuthError } from "../../redux/auth/selectors";
import { apiRegister } from "../../redux/auth/operations";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const signUpSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const SignUpModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { email, password, name } = data;
      const response = await dispatch(
        apiRegister({ email, password, name })
      ).unwrap();

      if (response) {
        setSuccessMessage("Registration successful!");
        reset();
        setTimeout(() => {
          onClose();
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up">
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        {authError && <span className={css.error}>{authError}</span>}
        {successMessage && (
          <span className={css.success}>{successMessage}</span>
        )}
        <div className={css.formGroup}>
          <label htmlFor="signUpName">Name</label>
          <input
            id="signUpName"
            type="text"
            {...register("name")}
            className={css.input}
            placeholder="Enter your name"
          />
          {errors.name && (
            <span className={css.error}>{errors.name.message}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="signUpEmail">Email</label>
          <input
            id="signUpEmail"
            type="email"
            {...register("email")}
            className={css.input}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className={css.error}>{errors.email.message}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="signUpPassword">Password</label>
          <input
            id="signUpPassword"
            type="password"
            {...register("password")}
            className={css.input}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="signUpConfirmPassword">Confirm Password</label>
          <input
            id="signUpConfirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={css.input}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <span className={css.error}>{errors.confirmPassword.message}</span>
          )}
        </div>

        <button type="submit" className={css.submitButton}>
          Sign Up
        </button>
      </form>
    </Modal>
  );
};
