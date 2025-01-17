import { useSelector } from "react-redux";
import css from "./PersonalData.module.css";
import {
  selectAuthIsLoading,
  selectAuthUser,
} from "../../redux/auth/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { apiLogout } from "../../redux/auth/operations";
import Favorites from "../Favorites/Favorites";
import { useState } from "react";
import Loader from "../Loader/Loader";

type TabType =
  | "favorites"
  | "orders"
  | "subscriptions"
  | "addresses"
  | "payments";

const PersonalData = ({}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const [activeTab, setActiveTab] = useState<TabType>("favorites");
  const isLoading = useAppSelector(selectAuthIsLoading);

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (!user) {
    return <div>User not found. Please log in.</div>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "favorites":
        return <Favorites />;
      case "orders":
        return <div className={css.comingSoon}>Orders - Coming Soon</div>;
      case "subscriptions":
        return (
          <div className={css.comingSoon}>Subscriptions - Coming Soon</div>
        );
      case "addresses":
        return (
          <div className={css.comingSoon}>Delivery Addresses - Coming Soon</div>
        );
      case "payments":
        return (
          <div className={css.comingSoon}>Payment Methods - Coming Soon</div>
        );
      default:
        return <Favorites />;
    }
  };
  return (
    <div className={css.mainBox}>
      <div className={css.avatarContainer}>
        <div className={css.avatar}>{user?.name[0].toUpperCase()}</div>
        <div className={css.nameBox}>
          <h3>{user.name}</h3>
          <button
            className={css.logOut}
            onClick={() => {
              dispatch(apiLogout());
            }}
          >
            Log out
          </button>
        </div>
      </div>
      <div className={css.tabsContainer}>
        <div className={css.tabsList}>
          <button
            className={`${css.tabButton} ${
              activeTab === "favorites" ? css.active : ""
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            My Favorites
          </button>
          <button
            className={`${css.tabButton} ${
              activeTab === "orders" ? css.active : ""
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`${css.tabButton} ${
              activeTab === "subscriptions" ? css.active : ""
            }`}
            onClick={() => setActiveTab("subscriptions")}
          >
            Subscriptions
          </button>
          <button
            className={`${css.tabButton} ${
              activeTab === "addresses" ? css.active : ""
            }`}
            onClick={() => setActiveTab("addresses")}
          >
            Delivery Addresses
          </button>
          <button
            className={`${css.tabButton} ${
              activeTab === "payments" ? css.active : ""
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Payment Methods
          </button>
        </div>
        <div className={css.tabContent}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default PersonalData;
