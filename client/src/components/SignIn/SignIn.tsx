import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./SignIn.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import {
  selectAuthError,
  selectAuthIsLoading,
  selectAuthIsLoggedIn,
} from "../../redux/auth/selectors";
import { apiLogin } from "../../redux/auth/operations";
import { LoginCredentials } from "../../redux/types";

const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignInModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const authError = useAppSelector(selectAuthError);
  const isLoading = useAppSelector(selectAuthIsLoading);
  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginCredentials>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await dispatch(apiLogin(data)).unwrap();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      reset();
      onClose();
    }
  }, [isLoggedIn, onClose, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="signInEmail">Email</label>
          <input
            id="signInEmail"
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
          <label htmlFor="signInPassword">Password</label>
          <input
            id="signInPassword"
            type="password"
            {...register("password")}
            className={css.input}
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className={css.error}>{errors.password.message}</span>
          )}
        </div>
        {authError && <span className={css.error}>{authError}</span>}
        <button type="submit" className={css.submitButton} disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </Modal>
  );
};
