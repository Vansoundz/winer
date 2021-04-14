import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Customer } from "../models/customer";
import { saveCustomer } from "../store/slices/products";

const Delivery = () => {
  const [customer, setCustomer] = useState<Customer>({});
  const dispatch = useDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomer({
      ...customer,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(customer).length > 0) {
      dispatch(saveCustomer(customer));
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
            <input onChange={onChange} type="text" id="name" />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="phone">Phone</label>
          </div>
          <div>
            <input onChange={onChange} type="tel" id="phone" />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="estate">Estate</label>
          </div>
          <div>
            <input onChange={onChange} type="text" id="estate" />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="address">Address</label>
          </div>
          <div>
            <input onChange={onChange} type="text" id="address" />
          </div>
        </div>{" "}
        <div className="form-div">
          <div>
            <label htmlFor="notes">Notes</label>
          </div>
          <div>
            <textarea onChange={onChange} id="notes" rows={3}></textarea>
          </div>
        </div>
        <div
          className="form-div"
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button>Save Info</button>
        </div>
      </form>
    </div>
  );
};

export default Delivery;
