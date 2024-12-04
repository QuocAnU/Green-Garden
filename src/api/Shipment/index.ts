import { POST } from "../APIInstance";

export interface Shipment {
    name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    validated: boolean;
    object_purpose: string;
    company: string;
    street1: string;
    street2: string;
    zip: string;
    metadata: string;

}

const URL = "https://api-tmdt.onrender.com/api/v1/shipment/label";

const ShipmentApi = {
  async create(token: string | null, orderId: string, data: Shipment) {
    return await POST(`${URL}/${orderId}`, token, "", data);
  },
};

export default ShipmentApi;
