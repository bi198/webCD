import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
// Import Screen
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductsScreen from "./screens/ProductsScreen";
import OrdersScreen from "./screens/OrdersScreen";
import OrderScreen from './screens/OrderScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

const openMenu = () => {
  document.querySelector(".sidebar").classList.add("open");
};
const closeMenu = () => {
  document.querySelector(".sidebar").classList.remove("open");
};
function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const userInfo = userSignin.userInfo;
  // console.log(userInfo);
  return (
    <Router>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button id="sidebar-openBtn" onClick={openMenu}>
              &#9776;
            </button>
            <Link to="/">Ecommer-Shop </Link>
          </div>
          <div className="header-links">
            <a href="/cart">Cart</a>
            {userInfo ? (
              <Link to="/profile">{userInfo.name}</Link>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="header-links dropdown">
                <a href="#">Admin Function</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className="sidebar" id="sidebar">
          <h3>Shopping Categories</h3>
          <button
            className="sidebar-closeBtn"
            id="sidebar-closeBtn"
            onClick={closeMenu}
          >
            {" "}
            X
          </button>
          <ul>
            <li>
              <a href="#">category 1</a>
            </li>
            <li>
              <a href="#">category 2</a>
            </li>
            <li>
              <a href="#">category 3</a>
            </li>
          </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/" exact={true} component={HomeScreen}></Route>
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/products" component={ProductsScreen} />

            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
     
          </div>
        </main>
        <footer className="footer">
          <h3> All right reserved</h3>
        </footer>
      </div>
    </Router>
  );
}

export default App;
