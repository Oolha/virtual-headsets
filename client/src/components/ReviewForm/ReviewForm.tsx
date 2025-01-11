import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "../../redux/hooks/hooks";
import { selectAuthUser } from "../../redux/auth/selectors";
import Modal from "../Modal/Modal";
import { Icon } from "../Icon/Icon";
import css from "./ReviewForm.module.css";

interface ReviewFormData {
  comment: string;
  rating: number;
}

const reviewSchema = yup.object().shape({
  comment: yup.string().required("Review text is required"),
  rating: yup.number().min(1).max(5).required("Rating is required"),
});

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const user = useAppSelector(selectAuthUser);

  if (!user) {
    return null;
  }
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      rating: 5,
    },
  });

  const currentRating = watch("rating");

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Write a Review">
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <div className={css.userInfo}>
          <span>Reviewing as: {user.name}</span>
        </div>

        <div className={css.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setValue("rating", star)}
              className={css.starButton}
            >
              <Icon
                id={star <= currentRating ? "goldStar" : "emptyStar"}
                size={24}
              />
            </button>
          ))}
          <input type="hidden" {...register("rating")} />
          {errors.rating && (
            <span className={css.error}>{errors.rating.message}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <textarea
            {...register("comment")}
            className={css.textarea}
            placeholder="Share your thoughts about this product..."
          />
          {errors.comment && (
            <span className={css.error}>{errors.comment.message}</span>
          )}
        </div>

        <button type="submit" className={css.submitButton}>
          Submit Review
        </button>
      </form>
    </Modal>
  );
};
