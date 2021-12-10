import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, update, signin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

function ProfileScreen(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ email, name, password }));
    setTimeout(dispatch(signin(email, password)), 1000);
     setTimeout(window.location.reload.bind(window.location), 1000);
  };
  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }

    return () => {};
  }, [userInfo]);

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>User Profile</h2>
              </li>
              <li className="notice">Re-Login To see The Change</li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  disabled="true"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </li>
              <li>
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </li>
              <li>
                <button type="submit" className="button primary">
                  Update
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width"
                >
                  Logout
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {
          // loadingOrders ? <div>Loading...</div> :
          //   errorOrders ? <div>{errorOrders} </div> :
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1/1/2021</td>
                <td>10$</td>
                <td>Havent</td>
                <td>
                  <Link to={"/order/1"}>DETAILS</Link>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>1/1/2021</td>
                <td>10$</td>
                <td>Havent</td>
                <td>
                  <Link to={"/order/2"}>DETAILS</Link>
                </td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    </div>
  );
}

export default ProfileScreen;
