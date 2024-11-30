import { GET, POST } from "../APIInstance";

interface Contact {
  name: string;
  email: string;
  message: string;
}

const URL = "https://api-tmdt.onrender.com/api/v1/user/contact";

const ContactApi = {
  async getAll(token: string | null) {
    return await GET(URL, token, "");
  },

  async create(token: string | null, data: Contact) {
    return await POST(URL, token, "", data);
  },
};

export default ContactApi;
