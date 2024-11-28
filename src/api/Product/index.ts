import { GET, POST, DELETE } from "../APIInstance";

interface Product {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    images: string[];
}

const URL = 'https://api-tmdt.onrender.com/api/v1/products/user/product';
const ProductApi =  {
    async getAll(token: string | null) {
        return await GET(URL, token, '');
    },

    async create(token: string | null, data: Product) {
        return await POST(URL, token, '', data);
    },

    async delete(token: string | null, id: string) {
        return await DELETE(URL, token, '', id);
    },
}

export default ProductApi