import { selectVRHeadsets } from "../../redux/virtual-headsets/selectors";
import { useSelector } from "react-redux";
import { VROneHeadset } from "../VROneHeadset/VROneHeadset";
import { useEffect } from "react";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import css from "./VRHeadsets.module.css";

const VRHeadsetsList = ({}) => {
  const dispatch = useAppDispatch();
  const data = useSelector(selectVRHeadsets);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllVrHeadsets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch headsets:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <h2 className={css.title}>Featured Gears</h2>
      <ul>
        {data.map((item) => {
          return <VROneHeadset item={item} key={item._id} />;
        })}
      </ul>
    </div>
  );
};

export default VRHeadsetsList;
