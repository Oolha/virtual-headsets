import css from "./Subscription.module.css";

const Subscription = ({}) => {
  return (
    <div className={css.subscrBox}>
      <h4 className={css.title}>Subscribe Our News Letter</h4>
      <p className={css.text}>
        Sure, please provide your email address to subscribe to newsletter
      </p>
      <div className={css.inputAndBtnBox}>
        <input
          type="text"
          placeholder="Enter your mail..."
          className={css.input}
        />
        <button className={css.btn}>Subscribe</button>
      </div>
    </div>
  );
};

export default Subscription;
