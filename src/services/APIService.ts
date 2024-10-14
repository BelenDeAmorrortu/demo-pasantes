// src/services/APIService.ts

import { axiosInstance } from "./axiosInstance";

const getBreeds = async () => {
  try {
    const { data } = await axiosInstance.get("/breeds"); // Llama a The Dog API para obtener los perros
    //return data.length();
    console.log(data[0]);
    return data.map((i: any) => ({
      id: i.id,
      name: i.name,
      image:
        "https://cdn2.thedogapi.com/images/" + i.reference_image_id + ".jpg",
    }));
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const getRandomImages = async () => {
  try {
    const { data } = await axiosInstance.get("/images/search?limit=10"); // Llama a The Dog API para obtener imagenes de perros
    return data.map((i: any) => i.url);
  } catch (errorAPI: any) {
    console.log({ errorAPI });
    throw new Error(errorAPI.message);
  }
};

const APIService = {
  getBreeds,
  getRandomImages,
};

export default APIService;
