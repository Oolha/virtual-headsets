import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import css from "./Reviews.module.css";
import { Icon } from "../Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { notification } from "antd";
import {
  selectError,
  selectIsLoading,
  selectVRHeadsets,
} from "../../redux/virtual-headsets/selectors";
import {
  fetchAllVrHeadsets,
  addReview,
} from "../../redux/virtual-headsets/operations";
import {
  selectAuthIsLoggedIn,
  selectAuthUser,
} from "../../redux/auth/selectors";
import { SignInModal } from "../SignIn/SignIn";
import ReviewForm from "../ReviewForm/ReviewForm";
import Loader from "../Loader/Loader";

interface ReviewsProps {
  onReviewAdded: () => void;
}

const Reviews = ({ onReviewAdded }: ReviewsProps) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const reviewsRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = useAppSelector(selectAuthIsLoggedIn);
  const user = useAppSelector(selectAuthUser);
  const items = useAppSelector(selectVRHeadsets);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchAllVrHeadsets());
    }
  }, [dispatch, items.length]);

  const item = items.find((item) => item._id === id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!item) {
    return <p>Virtual headset not found</p>;
  }

  const handleReviewClick = () => {
    if (isLoggedIn && user) {
      setIsReviewModalOpen(true);
    } else {
      setIsSignInModalOpen(true);
    }
  };

  const handleReviewSubmit = async (formData: {
    comment: string;
    rating: number;
  }) => {
    if (!id) return;

    try {
      await dispatch(
        addReview({
          productId: id,
          comment: formData.comment,
          reviewer_rating: formData.rating,
        })
      ).unwrap();
      setIsReviewModalOpen(false);
      onReviewAdded();
      notification.success({
        message: "Review Added",
        description: "Your review has been successfully published",
        placement: "top",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add review. Please try again.",
        placement: "top",
      });
    }
  };

  return (
    <div ref={reviewsRef} className={css.reviewsContainer}>
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
      <button
        className={css.reviewBtn}
        onClick={() => {
          console.log("Button clicked");
          handleReviewClick();
        }}
      >
        Leave a review
      </button>

      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
      />

      <ReviewForm
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default Reviews;
