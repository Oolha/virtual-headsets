import { notification } from "antd";
import css from "./Subscription.module.css";
import { NotificationPlacement } from "antd/es/notification/interface";
import { ChangeEvent, FC, useState } from "react";

interface SubscriptionProps {
  onSubscribe?: (email: string) => void;
  placement?: NotificationPlacement;
}

interface NotificationConfig {
  message: string;
  description: string;
  placement: NotificationPlacement;
}

const Subscription: FC<SubscriptionProps> = ({
  onSubscribe,
  placement = "topRight",
}) => {
  const [email, setEmail] = useState<string>("");

  const validateEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showNotification = (
    type: "success" | "error" | "info",
    config: NotificationConfig
  ): void => {
    notification[type](config);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handleSubmit = (): void => {
    if (!email) {
      showNotification("error", {
        message: "Error",
        description: "Please enter your email address",
        placement,
      });
      return;
    }

    if (!validateEmail(email)) {
      showNotification("error", {
        message: "Error",
        description: "Please enter a valid email address",
        placement,
      });
      return;
    }

    showNotification("success", {
      message: "Success",
      description: "Thank you for subscribing to our newsletter!",
      placement,
    });

    onSubscribe?.(email);
    setEmail("");
  };
  return (
    <div className={css.subscrBox}>
      <h4 className={css.title}>Subscribe Our News Letter</h4>
      <p className={css.text}>
        Sure, please provide your email address to subscribe to newsletter
      </p>
      <div className={css.inputAndBtnBox}>
        <input
          type="text"
          placeholder="Enter your mail..."
          className={css.input}
          value={email}
          onChange={handleEmailChange}
        />
        <button className={css.btn} onClick={handleSubmit} type="button">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Subscription;
