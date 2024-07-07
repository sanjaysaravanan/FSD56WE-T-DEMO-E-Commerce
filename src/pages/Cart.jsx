import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { products = [] } = useSelector((state) => state.cart);

  return (
    <div className="container mt-5">
      <h1>Shopping Cart</h1>
      {products.map((item, index) => (
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
        />
      ))}
      {products.length > 0 && (
        <div style={{ display: "flex", justifyContent: "end" }}>
          <h4>
            Grand Total: ${products.reduce((p, c) => p + c.qty * c.price, 0)}
          </h4>
        </div>
      )}
    </div>
  );
};

export default Cart;
