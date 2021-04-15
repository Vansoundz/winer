import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Customer } from "../models/customer";
import { saveCustomer } from "../store/slices/products";

type IProps = {
  customer?: Customer;
  close?: () => void;
};

const Delivery: FC<IProps> = ({ customer: info, close }) => {
  const [customer, setCustomer] = useState<Customer>({});
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({
      ...customer,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (info) setCustomer(info);
  }, [info]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!info) {
      if (Object.keys(customer).length > 0) {
        dispatch(saveCustomer(customer));
        if (close) close();
      }
    } else {
      alert("Order placed successfully");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-div">
          <div>
            <label htmlFor="name">Full name</label>
          </div>
          <div>
            <input
              required
              value={customer.name || ""}
              onChange={onChange}
              type="text"
              id="name"
            />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="phone">Phone</label>
          </div>
          <div>
            <input
              required
              value={customer.phone || ""}
              onChange={onChange}
              type="tel"
              id="phone"
            />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="estate">Estate</label>
          </div>
          <div>
            <input
              required
              value={customer.estate || ""}
              onChange={onChange}
              type="text"
              id="estate"
            />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="address">Address</label>
          </div>
          <div>
            <input
              required
              value={customer.address || ""}
              onChange={onChange}
              type="text"
              id="address"
            />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="notes">Notes</label>
          </div>
          <div>
            <textarea
              value={customer.notes || ""}
              onChange={onChange}
              id="notes"
              rows={3}
            ></textarea>
          </div>
        </div>
        <div
          className="form-div"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button>{!info ? "Save Info" : "Checkout"}</button>
        </div>
      </form>
    </div>
  );
};

export default Delivery;
