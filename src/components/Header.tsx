import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import paths from "../routes/paths";
import {
  getBottles,
  clearCart,
  getOrder,
  getSelectedTags,
  getTags,
  getTotal,
  orderBy,
  selectTag,
} from "../store/slices/products";
import Delivery from "./Delivery";
import Modal from "./utils/Modal";

const Header = () => {
  const tags = useSelector(getTags);
  const selected = useSelector(getSelectedTags);
  const order = useSelector(getOrder);
  const total = useSelector(getTotal);
  const bottles = useSelector(getBottles);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  return (
    <div className="container">
      <div className="brand">
        <Link to={paths.index}>
          <h4>WineShop</h4>
        </Link>
        <p>www.wineshop.com</p>
      </div>
      <div className="more-info flex justify-between">
        <div className="filters">
          <div className="filter">
            <div className="show flex">
              <div
                className={
                  selected.length > 0 && selected.length !== tags.length
                    ? "bg-light-grey"
                    : ""
                }
              >
                Show Me
              </div>
              <div
                className={
                  selected.length === 0 || selected.length === tags.length
                    ? "bg-light-grey"
                    : ""
                }
                onClick={() => dispatch(selectTag("all"))}
              >
                Show all
              </div>
            </div>
            <div className="tags bg-light-grey">
              {tags.map((tag) => {
                return (
                  <div
                    className={`tag ${selected.includes(tag) ? "bg-grey" : ""}`}
                    onClick={(e) => {
                      dispatch(selectTag(tag));
                    }}
                    key={tag}
                  >
                    {tag}
                  </div>
                );
              })}
            </div>
            <div className="tags align-center   bg-light-grey">
              <span>Order By</span>&nbsp;
              <span
                className={`tag ${order === "name" ? "bg-grey" : ""}`}
                onClick={() => dispatch(orderBy("name"))}
              >
                Name
              </span>
              <span
                className={`tag ${order === "cost" ? "bg-grey" : ""}`}
                onClick={() => dispatch(orderBy("cost"))}
              >
                Price
              </span>
            </div>
          </div>
        </div>

        <Modal open={open} close={() => setOpen(!open)}>
          <Delivery close={() => setOpen(!open)} />
        </Modal>

        <div className="desktop">
          <div className="shopping ">
            <div
              onClick={() => setOpen(!open)}
              className="delivery pointer bg-light-grey flex  justify-center align-center"
            >
              Delivery info
            </div>

            <div className="shop bg-light-grey flex text-center  justify-center align-center">
              <div>
                <h4>{bottles}</h4>
                <div>Bottles</div>
              </div>
            </div>

            <div
              style={{
                padding: 8,
              }}
              className="cart bg-light-grey desktop"
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  height: "100%",
                }}
              >
                <div className="flex justify-around align-center">
                  <div style={{ marginRight: 24 }}>{bottles} Bottles</div>

                  <div
                    className="pointer empty-cart"
                    onClick={() => dispatch(clearCart())}
                  >
                    Empty Cart
                  </div>
                </div>
                <div className="flex justify-around align-center ">
                  <div>ksh {total}</div>
                  <div className="checkout" style={{ marginLeft: 32 }}>
                    <Link to={paths.checkout}>Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
