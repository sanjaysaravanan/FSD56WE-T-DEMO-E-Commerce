import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { handledAPIGet } from "../apis/apis";
import { useSelector } from "react-redux";
import ProductForm from "../components/ProductForm";

const Product = ({ name, price, images, animDelay = 0 }) => {
  return (
    <div
      className="card m-1 d-inline-block zoom-in-animation"
      style={{ animationDelay: `${animDelay}ms` }}
    >
      <img
        src={images[0]}
        className="card-img-top"
        alt={name}
        style={{ height: 200, width: 300, objectFit: "contain" }}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src =
            "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg";
        }}
      />
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  animDelay: PropTypes.number,
};

const ProductListing = () => {
  const { userInfo = { userType: "customer", userId: "" } } = useSelector(
    (state) => state.account || {}
  );

  const [openForm, setFormState] = useState(false);

  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const products = await handledAPIGet(
        userInfo.userType === "seller"
          ? `/products/seller/${userInfo.userId}`
          : "/products/available"
      );

      setProducts(products);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Products Page</h1>
      <button onClick={() => setFormState(true)} className="btn btn-primary">
        Add New Product
      </button>
      {openForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4"
            style={{ minWidth: 500, height: 600, overflowY: "scroll" }}
          >
            <button onClick={() => setFormState(false)}>X</button>
            <ProductForm />
          </div>
        </div>
      )}
      <div className="container m-2">
        {products.map((product, index) =>
          userInfo.userType === "seller" ? (
            <Product key={product.sku} {...product} animDelay={index * 200} />
          ) : (
            <Link key={product.sku} to={`/products/${product.sku}`}>
              <Product {...product} animDelay={index * 200} />
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default ProductListing;
