import { GET, POST } from "../APIInstance";

const URL = 'https://api-tmdt.onrender.com/api/v1/users';

const UserApi = {
    getAll: async (token: string | null) => {
        return await GET(URL, token, '');
    },

    banUser: async (token: string | null, id: string) => {
        return await POST(`${URL}/${id}/ban`, token, '');
    },
    unBanUser: async (token: string | null, id: string) => {
        return await POST(`${URL}/${id}/unban`, token, '');
    },
}

export default UserApi