import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks/hooks";
import css from "./ProductDetails.module.css";
import {
  selectError,
  selectIsLoading,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import { useEffect } from "react";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";
import { useParams } from "react-router-dom";
import { Icon } from "../Icon/Icon";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const items = useSelector(selectVRHeadsets);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAllVrHeadsets()).unwrap();
      } catch (error) {
        console.error("Failed to fetch virtual headsets", error);
      }
    };
    fetchData();
  }, [dispatch]);

  const item = items.find((item) => item._id === id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Product not found</div>;
  }

  return (
    <div className={css.mainBox}>
      <div className={css.info}>
        <h2 className={css.title}>{item.name}</h2>
        <p className={css.description}>{item.description}</p>
        <p className={css.price}>Starting at ${item.price}</p>
      </div>
      <div className={css.photoBox}>
        <img src={item.photo} alt={item.name} className={css.img} />
      </div>
      <div className={css.techInfo}>
        <p className={css.text}>High-end VR-Headset</p>
        <ul className={css.list}>
          <li className={css.listItem}>
            <Icon id="star" size={10} />
            <p>Resolution: {item.screenResolution}</p>
          </li>
          <li className={css.listItem}>
            <Icon id="star" size={10} />
            <p>
              Refresh rate: up to {item.technicalSpecifications.refreshRate}
            </p>
          </li>
          <li className={css.listItem}>
            <Icon id="star" size={10} />
            <p>Field of view: {item.technicalSpecifications.fieldOfView}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetails;
