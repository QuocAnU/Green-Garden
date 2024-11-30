import { GET } from "../APIInstance";

const URL = 'https://api-tmdt.onrender.com/api/v1/orders';

const OrderApi = {
    getAll: async (token: string | null) => {
        return await GET(URL, token, '');
    },

    getOrderDetail: async (token: string | null, id: string) => {
        return await GET(`${URL}/user/orders/${id}`, token, '');
    },
}

export default OrderApi