import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Product as IProduct } from "../models/product";
import paths from "../routes/paths";
import { addToCart, checkType } from "../store/slices/products";

const Product: FC<{ product: IProduct }> = ({ product }) => {
  const dispatch = useDispatch();

  const {
    cost: { bottle, case: casePrice },
    image,
    name,
    no,
  } = product;

  return (
    <div className="product">
      <div className="image">
        <img
          src={`${
            import.meta.env.VITE_URL
          }/wineshop-assets/wine-bottles/${image}`}
          alt={name}
        />
      </div>
      <div
        className="details"
        style={{
          marginLeft: 8,
        }}
      >
        <div className="name">{name}</div>

        <div
          style={{
            margin: "16px 0",
          }}
          className="prices flex"
        >
          <div className="price">
            <div>Bottle</div>
            <div>${bottle}</div>
            <div>
              <input
                checked={product.checked?.includes("bottle") || false}
                onChange={(e) => {
                  dispatch(checkType({ checked: "bottle", no }));
                }}
                type="checkbox"
                id={no}
              />
              QTY
            </div>
          </div>
          <div className="price">
            <div>Case</div>
            <div>${casePrice}</div>
            <div>
              <input
                checked={product.checked?.includes("case") || false}
                onChange={() => {
                  dispatch(checkType({ checked: "case", no }));
                }}
                type="checkbox"
                id={no}
              />
              QTY
            </div>
          </div>
        </div>

        <div className="actions flex">
          <div className="details">
            <Link to={paths.product.replace(":no", no)}>Details</Link>
          </div>
          <div
            className="add"
            onClick={() => {
              if (!product.checked)
                dispatch(checkType({ checked: "bottle", no }));

              dispatch(addToCart(product));
            }}
          >
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
