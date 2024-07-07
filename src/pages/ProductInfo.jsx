import { useParams } from "react-router-dom";
import Product from "../components/Product";

import Products from "../json-data/products.json";

const ProductInfo = () => {
  const { productSku } = useParams();

  const currentProduct = Products.find((pd) => productSku === pd.sku);

  return (
    <div className="m-4">
      <h1>Product Info</h1>
      <p>SKU: {productSku}</p>
      {/* Individual product information goes here */}
      <Product {...currentProduct} />
    </div>
  );
};

export default ProductInfo;
