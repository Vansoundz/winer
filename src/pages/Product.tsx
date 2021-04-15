import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import paths from "../routes/paths";
import { RootState } from "../store";
import { addToCart, checkType, getProduct } from "../store/slices/products";

const Product = () => {
  const dispatch = useDispatch();
  const { no } = useParams<{ no: string }>();
  const product = useSelector((state: RootState) => getProduct(state, no));

  return product ? (
    <div className="container">
      <div className="back">
        <Link to={paths.index}>All Products</Link>
      </div>
      <div className="product" style={{ maxHeight: "unset" }}>
        <div className="image">
          <img
            src={`${import.meta.env.VITE_URL}/wineshop-assets/wine-bottles/${
              product.image
            }`}
            alt={product.name}
          />
        </div>
        <div className="details">
          <div className="name">{product.name}</div>

          <div className="prices flex">
            <div className="price">
              <div>Bottle</div>
              <div>${product.cost.bottle}</div>
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
              <div>${product.cost.case}</div>
              <div>
                <input
                  checked={product.checked?.includes("case") || false}
                  onChange={(e) => {
                    dispatch(checkType({ checked: "case", no }));
                  }}
                  type="checkbox"
                  id={no}
                />
                QTY
              </div>
            </div>
          </div>
          <div className="details">{product.details}</div>

          <div className="actions flex">
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
    </div>
  ) : (
    <></>
  );
};

export default Product;
