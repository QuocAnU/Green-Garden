import { GET, POST, DELETE, PUT } from "../APIInstance";

interface Product {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    images: string[];
}

const URL = "https://api-tmdt.onrender.com/api/v1/products/user/product";
const ProductApi = {
  async getAll(token: string | null) {
    return await GET(URL, token, "");
  },

  async getById(token: string | null, productId: string) {
    return await GET(`${URL}/${productId}`, token, "");
  },

  async create(token: string | null, data: Product) {
    return await POST(URL, token, "", data);
  },

  async delete(token: string | null, id: string) {
    return await DELETE(URL, token, "", id);
  },

  async update(token: string | null, id: string, data: Product) {
    return await PUT(URL, token, "", id, data);
  },
};

export default ProductApi;
