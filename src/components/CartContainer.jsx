import { clearCart } from "../features/cart/cartSlice";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const { cartItems, total, amount } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h2>
            total <span>${total.toFixed(2)}</span>
          </h2>
        </div>
      </footer>
      <button className="btn clear-btn" onClick={() =>  dispatch(openModal())}>clear cart</button>
    </section>
  );
};

export default CartContainer;
