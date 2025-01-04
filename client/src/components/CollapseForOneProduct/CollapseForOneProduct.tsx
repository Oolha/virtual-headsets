import { Collapse } from "antd";
import css from "./CollapseForOneProduct.module.css";
import { VRHeadset } from "../../redux/types";

interface CollapseForOneProductProps {
  item: VRHeadset;
}

const CollapseForOneProduct: React.FC<CollapseForOneProductProps> = ({
  item,
}) => {
  const technicalSpecs = item.technicalSpecifications;

  const formatList = (items: string[]): JSX.Element => {
    if (!Array.isArray(items)) return <>{items}</>;
    return (
      <ul className={css.subList}>
        {items.map((item, index) => (
          <li key={index} className={css.subListItem}>
            <div className={css.bulletPoint} />
            {item}
          </li>
        ))}
      </ul>
    );
  };

  const items = [
    {
      key: "1",
      label: "Technical Specifications",
      children: (
        <div className={css.specsContainer}>
          <ul className={css.mainList}>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Compatibility: </span>
              <span className={css.specValue}>{item.compatibility}</span>
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Built-in Memory: </span>
              <span className={css.specValue}>
                {technicalSpecs.builtInMemory}
              </span>
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Sound: </span>
              <span className={css.specValue}>{technicalSpecs.sound}</span>
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Guarantee: </span>
              <span className={css.specValue}>{technicalSpecs.guarantee}</span>
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Sensors: </span>
              {formatList(technicalSpecs.sensors)}
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Connectors: </span>
              {formatList(technicalSpecs.connectors)}
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Hardware Requirements: </span>
              {formatList(technicalSpecs.recommendedHardwareRequirements)}
            </li>
            <li className={css.mainListItem}>
              <span className={css.specLabel}>Manufacturer: </span>
              <span className={css.specValue}>
                {technicalSpecs.manufacturer}
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      key: "2",
      label: "Reviews",
      children: (
        <div className={css.reviewsContainer}>
          <p className={css.noReviews}>No reviews yet</p>
        </div>
      ),
    },
  ];

  return (
    <div className={css.container}>
      <Collapse items={items} expandIconPosition="end" />
    </div>
  );
};

export default CollapseForOneProduct;
