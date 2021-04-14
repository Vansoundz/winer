interface Product {
  id: string;
  no: string;
  name: string;
  image: string;
  cost: {
    bottle: number;
    case: number;
  };
  tags: string[];
  details: string;
  checked?: ("bottle" | "case")[];
}

export type { Product };
