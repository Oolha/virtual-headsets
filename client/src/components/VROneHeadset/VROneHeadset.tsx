import css from "./VROneHeadset.module.css";
import { VRHeadset } from "../../redux/types";
import { Icon } from "../Icon/Icon";
import { useNavigate } from "react-router-dom";

interface VROneHeadsetProps {
  item: VRHeadset;
}

export const VROneHeadset: React.FC<VROneHeadsetProps> = ({ item }) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    try {
      navigate(`/catalog/${id}`);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };
  return (
    <div className={css.item}>
      <div className={css.vrItem}>
        <div className={css.infoBox}>
          <h4 className={css.title}>{item.name}</h4>
          <p className={css.text}>{item.compatibility}</p>
          <ul className={css.list}>
            <li className={css.listItem}>
              <Icon id="prize" size={16} />
              <p>1st Prize Education Supporter </p>
            </li>
            <li className={css.listItem}>
              <Icon id="warranty" size={16} />
              <p>{item.technicalSpecifications.guarantee} warranty</p>
            </li>
            <li className={css.listItem}>
              <Icon id="safety" size={16} />
              <p>Environment safety</p>
            </li>
          </ul>
          <div className={css.detAndPrice}>
            <div className={css.boxBtn}>
              <button
                className={css.detailsBtn}
                onClick={() => handleClick(item._id)}
              >
                See details
              </button>
              <Icon id="seeDetails" size={13} />
            </div>

            <p className={css.price}>{item.price} $</p>
          </div>
        </div>

        <div className={css.box}></div>
      </div>
      <div className={css.imgBox}>
        <img src={item.photo} alt={item.name} className={css.img} />
      </div>
    </div>
  );
};
