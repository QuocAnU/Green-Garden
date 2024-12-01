import { GET, POST, PUT, DELETE_BODY } from "../APIInstance";

export interface CartItemProps {
  productId: string;
  quantity: number;
}

const URL = "https://api-tmdt.onrender.com/api/v1/carts/user/carts";
const CartApi = {
  getAll: async (token: string | null) => {
    return await GET(URL, token, "");
  },

  add: async (token: string | null, data: CartItemProps) => {
    return await POST(URL, token, "", data);
  },

  delete: async (token: string | null, productId: string) => {
    return await DELETE_BODY(URL, token, "", { productId: productId });
  },

  update: async (token: string | null, data: CartItemProps) => {
    return await PUT(URL, token, "", "", data);
  },
};

export default CartApi;
