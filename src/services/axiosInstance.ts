import axios, { AxiosError } from 'axios';

const baseUrl = 'https://api.thedogapi.com/v1'; // URL de The Dog API

// Crear la instancia de Axios
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Interceptor de request (si quieres agregar headers personalizados como API key, lo harías aquí)
axiosInstance.interceptors.request.use((config) => {
  config.headers['x-api-key'] = 'TU_API_KEY'; // Agrega tu API key aquí
  return config;
});

// Interceptor de respuesta (maneja errores y formatea el objeto)
axiosInstance.interceptors.response.use(
  (response) => response, // Devolvemos la respuesta si es exitosa
  (error: AxiosError) => {
    // Capturamos errores y los formateamos
    if (error.message) {
      return Promise.reject({
        code: error.status, // Código de error genérico
        message: error.message,
      });
    }

    // Error desconocido o no mapeado
    return Promise.reject({
      code: '9999',
      message: 'Error desconocido',
    });
  }
);
