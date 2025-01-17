import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./SignUp.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  selectAuthError,
  selectAuthIsLoading,
} from "../../redux/auth/selectors";
import { apiRegister } from "../../redux/auth/operations";
import { RegisterCredentials } from "../../redux/types";
import Loader from "../Loader/Loader";
import { notification } from "antd";

interface SignUpFormData extends RegisterCredentials {
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  openLogin: () => void;
}

export const SignUpModal: React.FC<Props> = ({
  isOpen,
  onClose,
  openLogin,
}) => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const { email, password, name } = data;
      const response = await dispatch(
        apiRegister({ email, password, name })
      ).unwrap();

      if (response) {
        notification.success({
          message: "Registration successful!",
          description: `Welcome ${name}! You have successfully registered.`,
          placement: "topRight",
          duration: 3,
        });
        reset();
        onClose();
      }
    } catch (error) {
      notification.error({
        message: "Registration failed",
        description: "Something went wrong. Please try again.",
        placement: "topRight",
        duration: 3,
      });
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

        <button type="submit" className={css.submitButton} disabled={isLoading}>
          {isLoading ? (
            <Loader height={20} width={20} color="#fff" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
      <div className={css.switchPrompt}>
        <p>
          Already have an account?{" "}
          <button className={css.switchLink} onClick={openLogin} type="button">
            Log in
          </button>
        </p>
      </div>
    </Modal>
  );
};
