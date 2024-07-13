import { Provider, useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Layout from "./Layout";
import store from "./store/store";

import "./App.css";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
// Normal Import
/* import Login from "./pages/Login";
import ProductListing from "./pages/ProductListing";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import ProductInfo from "./pages/ProductInfo"; */

// Lazy Loading Import
const Login = lazy(() => import("./pages/Login"));
const Registration = lazy(() => import("./pages/Registration"));
const ProductListing = lazy(() => import("./pages/ProductListing"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Cart = lazy(() => import("./pages/Cart"));
const ProductInfo = lazy(() => import("./pages/ProductInfo"));

const ProtectedComponent = ({ component }) => {
  const { authenticated } = useSelector((state) => state.account);

  if (authenticated) {
    return component;
  }

  return <Navigate to="/login" />;
};

ProtectedComponent.propTypes = {
  // JSX Type Prop
  component: PropTypes.node.isRequired,
};

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<ProtectedComponent component={<ProductListing />} />}
              />
              <Route
                path="/profile"
                element={<ProtectedComponent component={<UserProfile />} />}
              />
              <Route
                path="/cart"
                element={<ProtectedComponent component={<Cart />} />}
              />
              <Route
                path="/products/:productSku"
                element={<ProtectedComponent component={<ProductInfo />} />}
              />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </Router>
      </Provider>
    </Suspense>
  );
}

export default App;
