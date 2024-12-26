import css from "./VROneHeadset.module.css";
import { VRHeadset } from "../../redux/types";

interface VROneHeadsetProps {
  item: VRHeadset;
}

export const VROneHeadset: React.FC<VROneHeadsetProps> = ({ item }) => {
  return (
    <div className={css.item}>
      <div className={css.vrItem}>
        <div>
          <h4 className={css.title}>{item.name}</h4>
          <p className={css.text}>Compatibility: {item.compatibility}</p>

          <p className={css.price}>{item.price} $</p>
        </div>

        <div className={css.box}></div>
      </div>
      <img src={item.photo} alt={item.name} className={css.img} />
    </div>
  );
};
