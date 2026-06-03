import KeycloakService from 'app/Keycloak';
import axios from 'axios';

const api = axios.create({
  baseURL: `${globalThis.location.protocol}//${globalThis.location.hostname}${globalThis.location.port ? ':' + globalThis.location.port : ''}/api`,
  headers: {
    'Content-Type': 'application/json'
  },
});

/* Request Interceptor to inject the token dynamically */
api.interceptors.request.use(
  (config) => {
    const token = KeycloakService.GetToken();
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* Initial setup error handling */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default api;