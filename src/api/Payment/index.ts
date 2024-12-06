import { GET, POST } from "../APIInstance";

interface Payment {
    paymentMethod: string,
    amount: number,
    orderCode: number,
    currency?: string,
    description: string,
    cancelUrl: string,
    returnUrl: string,
    items?:
        {
            name: string,
            quantity: number,
            price: number,
        }[]
    ,
    buyerName?: string,
    buyerEmail?: string,
    buyerPhone?: string,
    buyerAddress?: string
  }
  

const URL = "https://api-tmdt.onrender.com/api/v1/payments/user";
const PaymentApi = {
  async create(token: string | null, data: Payment) {
    return await POST(`${URL}/create`, token, "", data);
  },

  async getAll(token: string | null) {
    return await GET(`${URL}/payments`, token, "");
  },

  async getByOrderCode(token: string | null, orderCode: string) {
    return await GET(`${URL}/info/${orderCode}`, token, "");
  },

  async cancel(token: string | null, orderCode: string) {
    return await POST(`${URL}/cancel/${orderCode}`, token, "", {});
  },
};

export default PaymentApi;
