import React, { FC, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Delivery from "../components/Delivery";
import { Product } from "../models/product";
import paths from "../routes/paths";
import {
  addToCart,
  getCart,
  getCustomer,
  remove,
} from "../store/slices/products";

const Checkout = () => {
  const cart = useSelector(getCart);
  const customer = useSelector(getCustomer);
  const [step, setStep] = useState(0);

  const steps = useMemo(
    () => [<Cart cart={cart} />, <Delivery customer={customer} />],
    [customer, cart]
  );

  return (
    <>
      {cart.length ? (
        <>
          {" "}
          <div
            className="container"
            style={{
              maxWidth: "340px",
              margin: "24px auto",
            }}
          >
            {steps[step]}

            <div>
              <button
                onClick={() => {
                  setStep(0);
                }}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setStep(1);
                }}
              >
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <div
          className="container"
          style={{
            padding: "24px 0",
          }}
        >
          <Link
            style={{
              background: "#d8d8d8",
              padding: "8px",
            }}
            to={paths.index}
          >
            Go to shop
          </Link>
        </div>
      )}
    </>
  );
};

export default Checkout;

const Cart: FC<{ cart: Product[] }> = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="back">
        <Link to={paths.index}>All Products</Link>
      </div>
      <table className="cart" cellSpacing={8}>
        <thead>
          <tr className="item">
            <th>#</th>
            <th>Name</th>
            <th>Selection</th>
            <th>Cost</th>
            <th>Add</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {cart.map((prod, i) => {
            const { cost, name, no, checked } = prod;
            return (
              <tr key={no + Math.random()} className="item">
                <td>{i + 1}</td>
                <td>{name}</td>
                <td style={{ display: "flex", flexWrap: "wrap" }}>
                  {checked?.includes("case") && <span>case</span>}
                  <span>
                    {checked?.length == 2 ? <span>,</span> : <span></span>}
                  </span>
                  {checked?.includes("bottle") && <span>bottle</span>}
                </td>
                <td>
                  <div>
                    {(checked?.includes("case") ? cost.case : 0) +
                      (checked?.includes("bottle") ? cost.bottle : 0)}
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      padding: "0 8px",
                      background: "#d7d7d7",
                      margin: 4,
                    }}
                    className="pointer"
                    onClick={() => dispatch(addToCart(prod))}
                  >
                    +
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      padding: "0 8px",
                      background: "#d7d7d7",
                      margin: 4,
                    }}
                    className="pointer"
                    onClick={() => dispatch(remove(prod.id))}
                  >
                    -
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
