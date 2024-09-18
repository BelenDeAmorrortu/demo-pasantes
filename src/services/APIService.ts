// src/services/APIService.ts

import { axiosInstance } from './axiosInstance';

const getBreeds = async () => {
  try {
    const { data } = await axiosInstance.get('/breeds'); // Llama a The Dog API para obtener los perros
    //return data.length();
    return data;
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const APIService = {
  getBreeds,
};

export default APIService;
