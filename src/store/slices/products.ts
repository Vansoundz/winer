import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Customer } from "../../models/customer";
import { Product } from "../../models/product";
import { getTags as getProductTags } from "../../utils";

interface ProductState {
  products: Product[];
  tags: string[];
  selectedtags: string[];
  cart: Product[];
  customer: Customer;
  orderBy?: keyof Product;
}

const initialState: ProductState = {
  products: [],
  cart: [],
  tags: [],
  selectedtags: [],
  customer: {},
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.tags = getProductTags(action.payload);
    },
    checkType: (
      state,
      action: PayloadAction<{ no: string; checked: "bottle" | "case" }>
    ) => {
      const { checked, no } = action.payload;
      const product = state.products.find((product) => product.no === no);

      if (product) {
        if (!product?.checked) {
          product.checked = [];
        }
        if (product.checked?.includes(checked)) {
          product.checked = product.checked.filter((c) => c !== checked);
        } else product.checked = [...product?.checked, checked];
      }

      state.products = state.products.map((prod) => {
        if (prod.no === product?.no) {
          return product;
        }
        return prod;
      });
    },
    orderBy: (state, action: PayloadAction<keyof Product>) => {
      let { products } = state;
      const { payload: key } = action;
      state.orderBy = key;

      if (key !== "checked")
        if (key === "cost") {
          products = products.sort((a, b) => {
            let costA = a.cost.bottle + a.cost.bottle;
            let costB = b.cost.bottle + b.cost.bottle;
            if (costA > costB) return 1;
            else return -1;
          });
        } else
          products = products.sort((a, b) => {
            if (a[key] > b[key]) return 1;
            else return -1;
          });

      state.products = products;
    },
    selectTag: (state, action: PayloadAction<string>) => {
      if (action.payload === "all") {
        state.selectedtags = [];
      } else {
        let tags = state.selectedtags;
        if (tags.includes(action.payload)) {
          tags = tags.filter((tag) => tag !== action.payload);
        } else tags.push(action.payload);

        state.selectedtags = tags;
      }
    },
    saveCustomer: (state, action: PayloadAction<Customer>) => {
      state.customer = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      let { cart } = state;
      let product = state.products.find((pr) => action.payload.no === pr.no);
      if (!product) {
        return;
      }
      product.id = Math.random().toString();
      cart = [...cart, product];
      state.cart = cart;
    },
    remove: (state, action: PayloadAction<string>) => {
      let { cart } = state;

      cart = cart.filter(({ id }) => id !== action.payload);

      state.cart = cart;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  loadProducts,
  selectTag,
  addToCart,
  orderBy,
  clearCart,
  saveCustomer,
  checkType,
  remove,
} = productSlice.actions;

export default productSlice.reducer;

const matchTags = (tags: string[], where: string[]): boolean => {
  let match: boolean = false;

  for (let tag of tags) {
    for (let t of where) {
      if (t === tag) {
        return true;
      }
    }
  }

  return match;
};

const getProducts = (state: RootState, tags?: string[]) => {
  if (tags && tags.length > 0) {
    let { products } = state.product;
    return products.filter((product) => {
      return matchTags(product.tags, tags);
    });
  } else return state.product.products;
};

const getProduct = (state: RootState, no: string) =>
  state.product.products.find((w) => w.no === no);

const getTags = (state: RootState) => state.product.tags;
const getCustomer = (state: RootState) => state.product.customer;
const getOrder = (state: RootState) => state.product.orderBy;
const getCart = (state: RootState) => state.product.cart;
const getSelectedTags = (state: RootState) => state.product.selectedtags;

const getTotal = (state: RootState) => {
  let total = state.product.cart.reduce<number>(
    (total, product: Product) =>
      total +
      ((product.checked?.includes("bottle") ? product.cost.bottle : 0) +
        (product.checked?.includes("case") ? product.cost.case : 0)),
    0
  );

  return Math.round(total * 100) / 100;
};

const getBottles = (state: RootState) => {
  return state.product.cart.reduce<number>(
    (total, product: Product) =>
      total +
      ((product.checked?.includes("bottle") ? 1 : 0) +
        (product.checked?.includes("case") ? 12 : 0)),
    0
  );
};

export {
  getOrder,
  getTags,
  getSelectedTags,
  getProduct,
  getProducts,
  getCart,
  getTotal,
  getBottles,
  getCustomer,
};
