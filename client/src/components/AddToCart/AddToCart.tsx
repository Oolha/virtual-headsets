import { VRHeadset } from "../../redux/types";
import css from "./AddToCart.module.css";
import { useState } from "react";
import { FaShippingFast } from "react-icons/fa";

interface AddToCartProps {
  item: VRHeadset;
}

const AddToCart: React.FC<AddToCartProps> = ({ item }) => {
  const [quantity, setQuantity] = useState<string>("1");

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleBlur = () => {
    const parsedValue = parseInt(quantity, 10);
    if (!parsedValue || parsedValue < 1) {
      setQuantity("1");
    } else if (parsedValue > 10) {
      setQuantity("10");
    }
  };

  return (
    <div className={css.container}>
      <h3 className={css.price}>€ {item.price}</h3>
      <div className={css.controls}>
        <div className={css.quantityControl}>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            onBlur={handleBlur}
            className={css.input}
          />
          <span className={css.maxQuantity}>Max: 10</span>
        </div>
        <button className={css.addButton}>Add to cart</button>
      </div>
      <div className={css.shipping}>
        <FaShippingFast />
        <p className={css.text}>
          Free shipping with any laptop/desktop PC within the EU
        </p>
      </div>
      <p className={css.text}>Delivery time: 7-10 days</p>
    </div>
  );
};

export default AddToCart;
