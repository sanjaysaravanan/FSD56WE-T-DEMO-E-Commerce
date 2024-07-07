import PropTypes from "prop-types";

import products from "../json-data/products.json";
import { Link } from "react-router-dom";

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
  return (
    <div className="container mt-5">
      <h1>Products Page</h1>
      {products.map((product, index) => (
        <Link key={product.sku} to={`/products/${product.sku}`}>
          <Product {...product} animDelay={index * 200} />
        </Link>
      ))}
    </div>
  );
};

export default ProductListing;
