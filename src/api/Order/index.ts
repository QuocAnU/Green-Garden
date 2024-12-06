import { GET, POST } from "../APIInstance";

const URL = 'https://api-tmdt.onrender.com/api/v1/orders';

interface OrderCheckout {
    quantity: number,
    priceAtTime: number,
    productID: string,
}

const OrderApi = {
    getAll: async (token: string | null) => {
        return await GET(URL, token, '');
    },

    getUserAll: async (token: string | null) => {
        return await GET(`${URL}/user/orders`, token, '');
    },

    create: async (token: string | null, data: OrderCheckout[]) => {
        return await POST(`${URL}/user/orders`, token, "", data);
    },

    getOrderDetail: async (token: string | null, id: string) => {
        return await GET(`${URL}/user/orders/${id}`, token, '');
    },
}

export default OrderApi