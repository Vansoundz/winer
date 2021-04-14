import React from "react";
import { useSelector } from "react-redux";
import Delivery from "../components/Delivery";
import { getCart } from "../store/slices/products";

const Checkout = () => {
  const cart = useSelector(getCart);

  return (
    <div className="container">
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
      <Delivery />
    </div>
  );
};

export default Checkout;
