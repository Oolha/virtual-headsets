import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import css from "./Reviews.module.css";
import { Icon } from "../Icon/Icon";
import { useAppDispatch } from "../../redux/hooks/hooks";
import {
  selectError,
  selectIsLoading,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import { fetchAllVrHeadsets } from "../../redux/virtual-headsets/operations";

const Reviews = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const items = useSelector(selectVRHeadsets);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchAllVrHeadsets());
    }
  }, [dispatch, items.length]);

  const item = items.find((item) => item._id === id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!item) {
    return <p>Virtual headset not found</p>;
  }

  return (
    <div className={css.reviewsContainer}>
      {item.reviews.map((review, index) => (
        <div key={index} className={css.reviewCard}>
          <div className={css.box}>
            <div className={css.avatar}>
              {review.reviewer_name[0].toUpperCase()}
            </div>
            <div className={css.reviewContent}>
              <h4 className={css.reviewerName}>{review.reviewer_name}</h4>
              <div className={css.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < review.reviewer_rating
                        ? css.starFilled
                        : css.starEmpty
                    }
                  >
                    <Icon
                      id={i < review.reviewer_rating ? "goldStar" : "emptyStar"}
                      size={16}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className={css.comment}>{review.comment}</p>
        </div>
      ))}
          <button className={css.reviewBtn}>Leave a review</button>
    </div>
  );
};

export default Reviews;
