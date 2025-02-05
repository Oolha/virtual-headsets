import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import css from "./Cart.module.css";
import { RootState } from "../../redux/store";
import { Icon } from "../../components/Icon/Icon";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deleteItem } from "../../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = (id: string) => {
    try {
      navigate(`/catalog/${id}`);
    } catch (error) {
      console.error("Navigation failed:", error);
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleDeleteItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <div className={css.wrapperHeader}>
        <Header />
      </div>
      <div className={css.cartContainer}>
        {cartItems.length === 0 ? (
          <div className={css.emptyCart}>
            <h2 className={css.title}>Your bag is empty</h2>
            <p>Start adding items to your cart to see them here!</p>
          </div>
        ) : (
          <div className={css.cartItems}>
            <h2>Shopping Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className={css.cartItem}>
                <div
                  className={css.photoBox}
                  onClick={() => handleClick(item.id)}
                >
                  <img
                    src={item.photo}
                    alt={item.name}
                    className={css.itemImage}
                  />
                  <div className={css.itemDetails}>
                    <h3>{item.name}</h3>
                    <p>Price: €{item.price}</p>
                  </div>
                </div>

                <div className={css.dumpBox}>
                  <p className="css.quantity">Quantity: {item.quantity}</p>
                  <button
                    className={css.dumpBtn}
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Icon id="dump" className={css.icon} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className={css.cartSummary}>
            <div className={css.totalContainer}>
              <p className={css.totalText}>Total: €{totalPrice.toFixed(2)}</p>
            </div>
            <button className={css.checkoutBtn} disabled>
              Checkout
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
