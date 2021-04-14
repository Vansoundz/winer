import React, { FC, useEffect } from "react";
import "./modal.css";

type IProps = {
  open: boolean;
  close: () => any;
};

const Modal: FC<IProps> = ({ close, open, children }) => {
  useEffect(() => {
    let body = document.body;

    if (open) {
      body.style.height = "100vh";
      body.style.overflow = "hidden";
    }

    return () => {
      body.style.height = "initial";
      body.style.overflow = "initial";
    };
  }, [open]);

  return (
    <div
      style={{
        height: open ? "100%" : 0,
      }}
      className="modal"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          close();
        }
      }}
    >
      <div style={{ display: open ? "" : "none" }} className="modal-body">
        {children}
      </div>
    </div>
  );
};

export default Modal;
