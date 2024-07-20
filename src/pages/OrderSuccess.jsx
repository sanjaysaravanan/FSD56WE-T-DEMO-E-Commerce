import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { handledAPIPost } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const processOrder = async () => {
    try {
      setLoading(true);
      const response = await handledAPIPost("/order/place-order", cart);

      alert(response.msg);

      dispatch({ type: "cart_clear" });

      navigate(`/orderSuccess?orderNo=${response.orderNo}`);
    } catch (err) {
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!params.get("orderNo")) {
      processOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <h1 style={{ color: "greenyellow" }}>
      Your Order Placed Successfully{" "}
      {params.get("orderNo") && `OrderId: ${params.get("orderNo")}`}
    </h1>
  );
};

export default OrderSuccess;
