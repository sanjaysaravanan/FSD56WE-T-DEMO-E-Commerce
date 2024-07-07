import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import ProductInfo from "./pages/ProductInfo";
import Layout from "./Layout";
import store from "./store/store";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<ProductListing />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:productSku" element={<ProductInfo />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
