import axios from 'axios';

const api = axios.create({
  baseURL: `${globalThis.location.protocol}//${globalThis.location.hostname}${globalThis.location.port ? ':' + globalThis.location.port : ''}/api`,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;