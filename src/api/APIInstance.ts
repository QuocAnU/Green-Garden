import axios from 'axios';

/**
 * Creates an Axios instance for a specific base URL
 * @param {string} baseURL - The base URL for the API
 * @param {string} token - The Clerk token (can be passed in from a component)
 * @returns {object} - A set of REST methods
 */
const createApiInstance = (baseURL: string, token: string | null) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to include Clerk token
  instance.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized. Redirecting to login...');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Exporting the individual methods
export const GET = (baseURL: string, token: string | null, endpoint: string, params = null) =>
  createApiInstance(baseURL, token).get(endpoint, { params });

export const POST = (baseURL: string, token: string | null, endpoint: string, data = {}, params = null) =>
  createApiInstance(baseURL, token).post(endpoint, data, { params });

export const PUT = (baseURL: string, token: string | null, endpoint: string, id: string, data = {}, params = null) =>
  createApiInstance(baseURL, token).put(id ? `${endpoint}/${id}` : endpoint, data, { params });
export const PATCH = (baseURL: string, token: string | null, endpoint: string, id: string, data = {}, params = null) =>
  createApiInstance(baseURL, token).patch(id ? `${endpoint}/${id}` : endpoint, data, { params });

export const DELETE = (baseURL: string, token: string | null, endpoint: string, id: string, params = null) =>
  createApiInstance(baseURL, token).delete(id ? `${endpoint}/${id}` : endpoint, { params });

export const DELETE_BODY = (
  baseURL: string,
  token: string | null,
  endpoint: string,
  data: { productId: string } | null = null
) => createApiInstance(baseURL, token).delete(endpoint, { data: data });
