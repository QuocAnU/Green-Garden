import { GET, POST } from "../APIInstance";

interface Review {
  rating: number;
  comment: string;
}

const URL = "https://api-tmdt.onrender.com/api/v1/user/reviews";

const ReviewApi = {
  async getAll(token: string | null, productId: string) {
    return await GET(`${URL}/${productId}`, token, "");
  },

  async create(token: string | null, productId: string, data: Review) {
    return await POST(`${URL}/${productId}`, token, "", data);
  },
};

export default ReviewApi;
