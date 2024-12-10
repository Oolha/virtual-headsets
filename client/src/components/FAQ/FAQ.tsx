import FAQAccordion from "../Collapse/Collapse";
import css from "./FAQ.module.css";

const FAQ = ({}) => {
  return (
    <div className={css.faqBox}>
      <h3 className={css.title}>F.A.Q.</h3>
      <FAQAccordion />
    </div>
  );
};

export default FAQ;
