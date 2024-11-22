import { VRHeadset } from "../../redux/types";

interface VROneHeadsetProps {
  item: VRHeadset;
}

export const VROneHeadset: React.FC<VROneHeadsetProps> = ({ item }) => {
  return (
    <div>
      <img src={item.photo} alt={item.name} />
      <h4>{item.name}</h4>
      <p>Compatibility: {item.compatibility}</p>
      <p>Screen resolution{item.screenResolution}</p>
      <p>{item.price} $</p>
    </div>
  );
};
