import React from "react";

export default function Rating(props) {
  return !props.value ? (
    <div>
      <i className="far fa-star"></i> <i className="far fa-star"></i>{" "}
      <i className="far fa-star"></i> <i className="far fa-star"></i>{" "}
      <i className="far fa-star"></i>
       <span> </span>
       <span>{props.text ? props.text : "None Review"}</span>
    </div>
  ) : (
    <div className="rating product-rating">
      <span>
        <i
          className={
            props.value >= 1
              ? "fas fa-star"
              : props.value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 2
              ? "fa fa-star"
              : props.value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 3
              ? "fa fa-star"
              : props.value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 4
              ? "fa fa-star"
              : props.value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>
        <i
          className={
            props.value >= 5
              ? "fa fa-star"
              : props.value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span>   </span>
      <span>{props.text ? props.text : "None Review"}</span>
    </div>
  );
}
