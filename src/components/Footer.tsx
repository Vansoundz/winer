import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import paths from "../routes/paths";
import { clearCart, getBottles, getTotal } from "../store/slices/products";

const Footer = () => {
  const dispatch = useDispatch();
  const bottles = useSelector(getBottles);

  const total = useSelector(getTotal);

  return (
    <div className="footer">
      <div
        style={{
          padding: 8,
        }}
        className="cart bg-light-grey mobile"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "100%",
          }}
        >
          <div className="flex justify-around">
            <div>{bottles} Bottles</div>
            <div className="checkout">
              <Link to={paths.checkout}>Checkout</Link>
            </div>{" "}
          </div>
          <div className="flex justify-around">
            <div>ksh {total}</div>
            <div
              className="pointer empty-cart"
              onClick={() => dispatch(clearCart())}
            >
              Empty Cart
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: 24,
        }}
        className="desktop text-center"
      >
        &copy; Wineshop 2021
      </div>
    </div>
  );
};

export default Footer;
