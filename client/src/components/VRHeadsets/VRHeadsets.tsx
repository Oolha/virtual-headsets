import { selectVRHeadsets } from "../../redux/virtual-headsets/selectors";
import { useSelector } from "react-redux";
import { VROneHeadset } from "../VROneHeadset/VROneHeadset";
import { useEffect } from "react";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";

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
      <ul>
        {data.map((item) => {
          return <VROneHeadset item={item} key={item._id} />;
        })}
      </ul>
    </div>
  );
};

export default VRHeadsetsList;
