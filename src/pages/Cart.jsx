import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { handledAPIPost } from "../apis/apis";
import { useState } from "react";
import Loader from "../components/Loader";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const processOrder = async () => {
    try {
      setLoading(true);
      const response = await handledAPIPost("/order/place-order", cart);
      alert(response.msg);
      dispatch({ type: "cart_clear" });
    } catch (err) {
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      {(cart.products || []).map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          sku={item.sku}
          images={item.images}
          price={item.price}
          description={item.description}
          category={item.category}
          sellerInfo={item.sellerInfo}
          qty={item.qty}
          animDelay={index * 250}
        />
      ))}
      {cart.products.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
          className="mb-4"
        >
          <h4>
            Grand Total: $
            {cart.products.reduce((p, c) => p + c.qty * c.price, 0)}
          </h4>
          <button onClick={processOrder} className="btn btn-primary">
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
