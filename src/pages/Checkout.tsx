import React, { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Delivery from "../components/Delivery";
import { Product } from "../models/product";
import paths from "../routes/paths";
import { getCart, getCustomer } from "../store/slices/products";

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
              maxWidth: "300px",
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
  return (
    <div className="cart">
      {cart.map((prod) => {
        const { cost, name, no, checked } = prod;
        return (
          <div key={no + Math.random()} className="item flex">
            <div>
              <div>{name}</div>
              <div>
                {checked?.map((el) => (
                  <div key={Math.random()} className="tag">
                    {el}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div>
                {checked?.includes("case") && <div>case: ${cost.case}</div>}
              </div>{" "}
              <div>
                {checked?.includes("bottle") && (
                  <div>bottle: ${cost.bottle}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
