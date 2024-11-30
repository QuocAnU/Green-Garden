import { GET, POST, DELETE, PATCH, PUT } from "../APIInstance";

const URL = "https://api-tmdt.onrender.com/api/v1/user/reviews";

const ReviewApi = {
  async getAll(token: string | null, productId: string) {
    return await GET(`${URL}/${productId}`, token, "");
  },

  async create(token: string | null, productId: string, data: any) {
    return await POST(`${URL}/${productId}`, token, "", data);
  },

  async delete(token: string | null, id: string) {
    return await DELETE(URL, token, "", id);
  },

  async update(token: string | null, id: string, data: any) {
    return await PUT(URL, token, "", id, data);
  },
};

export default ReviewApi;
