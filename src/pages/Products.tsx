import React from "react";
import { useSelector } from "react-redux";
import { getProducts, getSelectedTags } from "../store/slices/products";
import Product from "../components/Product";
import { RootState } from "../store";

const Products = () => {
  const tags = useSelector(getSelectedTags);

  const products = useSelector((state: RootState) => getProducts(state, tags));

  return (
    <div className="container">
      <div className="products">
        {products?.map((product, i) => {
          return <Product product={product} key={i} />;
        })}
      </div>
    </div>
  );
};

export default Products;
