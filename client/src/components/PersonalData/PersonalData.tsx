import { useSelector } from "react-redux";
import css from "./PersonalData.module.css";
import { selectAuthUser } from "../../redux/auth/selectors";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { apiLogout } from "../../redux/auth/operations";

const PersonalData = ({}) => {
  const dispatch = useAppDispatch();
  const user = useSelector(selectAuthUser);

  if (!user) {
    return <div>User not found. Please log in.</div>;
  }
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
    </div>
  );
};

export default PersonalData;
