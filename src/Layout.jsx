import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

const CartLink = () => {
  const { totalQty } = useSelector((state) => state.cart);

  return (
    <Link to="/cart" className="btn btn-outline-light">
      <i className="fa-solid fa-cart-shopping"></i>&nbsp;({totalQty})
    </Link>
  );
};

const Layout = () => {
  return (
    <div>
      <header className="z-3 bg-dark text-white p-3 mb-4 position-sticky top-0">
        <div className="container d-flex justify-content-between align-items-center">
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <h1 className="h3">My E-Commerce App</h1>
          </Link>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              style={{ display: "inline-block", width: "auto" }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            &nbsp; &nbsp;
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          <CartLink />
        </div>
      </header>
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>

      <footer className="bg-black text-white">Simple Footer</footer>
    </div>
  );
};

export default Layout;
