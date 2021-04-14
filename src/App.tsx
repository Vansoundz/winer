import React from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { sendReq } from "./api/api";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Product } from "./models/product";
import Routes from "./routes/Routes";
import { loadProducts } from "./store/slices/products";

function App() {
  const dispatch = useDispatch();
  const { isLoading } = useQuery(
    "Get products",
    async () => {
      return sendReq<Product[]>({
        endpoint: `/wine-shop.json`,
        method: "GET",
      });
    },
    {
      onSuccess(data) {
        dispatch(loadProducts(data));
      },
    }
  );

  return (
    <div className="App">
      <Header />
      {isLoading ? "Loading..." : <Routes />}
      <Footer />
    </div>
  );
}

export default App;
