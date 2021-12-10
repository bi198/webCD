import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import Rating from "./../components/Rating";

export default function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };
  const getPrice = (price, qty) => {
    const total = price * qty;
    return total;
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {};
  }, []);
  return (
    <div>
      <div className="back-to-result">
        <Link to="/">To Home Screen</Link>
      </div>
      {loading ? (
        <div>.................LOADING ............</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="details">
          <div className="details-image">
            <img
              src={"/" + product.image}
              alt="product-img"
              className="product_img"
            />
          </div>
          <div className="details-info ">
            <ul>
              <li>
                <h4>{product.name}</h4>
              </li>
              <li>
                <Rating
                  className="product-rating"
                  value={product.rating}
                  text={product.numReviews + " reviews"}
                />
                {/* {product.rating} Star {product.numReviews} reviews */}
              </li>
              <li>
                Price:
                <b>${product.price}</b>
              </li>
              <li>
                Description :<div className="">{product.description}</div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>Price {getPrice(product.price, qty)}$</li>
              <li>
                {" "}
                Status:{" "}
                {product.countInStock > 0 ? "Available" : "Unavailable."}
              </li>
              <li>
                Quantity:
                <select
                  value={qty}
                  onChange={(e) => {
                    setQty(e.target.value);
                  }}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </li>
              <li>
                {product.countInStock > 0 && (
                  <button onClick={handleAddToCart} className="button primary">
                    Add to Cart
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
