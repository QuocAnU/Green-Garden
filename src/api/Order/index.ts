import { GET } from "../APIInstance";

const URL = 'https://api-tmdt.onrender.com/api/v1/user/orders';

const OrderApi = {
    getAll: async (token: string | null) => {
        return await GET(URL, token, '');
    }
}

export default OrderApi