import { Product } from "../models/product";

const getTags = (products: Product[]): string[] => {
  let tags: string[] = [];
  products.forEach((product) => {
    tags = [...tags, ...product.tags];
  });

  let set = new Set(tags);
  tags = [];

  for (let el of set) {
    tags.push(el);
  }

  return tags;
};

export { getTags };
