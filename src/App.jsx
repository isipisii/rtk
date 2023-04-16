import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import CartContainer from "./components/CartContainer";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

const App = () => {
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if(isLoading){
    return(
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  } 

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
};

export default App;
