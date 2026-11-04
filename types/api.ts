export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
};

export type Product = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: string | number;
  stock: number;
  image?: string | null;
  compatibleYear?: number | null;
  category?: {
    name: string;
  } | null;
  model?: {
    name: string;
    brand?: {
      name: string;
    } | null;
  } | null;
};

export type OrderStatus =
  | "PENDING"
  | "PAID"
  | "PREPARING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export type PaymentTerm = "DAYS_7" | "DAYS_30" | "DAYS_45" | "DAYS_60";
export type OrderItem = {
  id: string;
  quantity: number;
  price: string;
  orderId: string;
  productId: string;
  product: Product;
};

export type Order = {
  id: string;
  user: User;
  createdAt: string;
  items: OrderItem[];
  status: OrderStatus;
  total: string;
  paymentTerm: PaymentTerm;
};
