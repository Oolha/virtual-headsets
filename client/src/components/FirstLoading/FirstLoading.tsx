import css from "./FirstLoading.module.css";

const FirstLoading = ({}) => {
  return (
    <div className={css.loadingMessageWrapper}>
      <p className={css.loadingMessage}>
        Please wait. First load may take up to 40 seconds due to free hosting
        service.
      </p>
      <p className={css.loadingSubMessage}>
        Subsequent loads will be instant thanks to caching 🚀
      </p>
    </div>
  );
};

export default FirstLoading;
