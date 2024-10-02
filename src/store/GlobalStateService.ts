// src/store/globalDataStateService.ts
import { create } from "zustand";
import { IDog } from "../types";

interface IDataGlobalState {
  dogs: IDog[];
  cats: any[];
  randomImages: string[];
}

const initialData: IDataGlobalState = {
  dogs: [],
  cats: [],
  randomImages: [],
};

const globalDataState = create(() => initialData);

const getDogsData = () => {
  return globalDataState((state) => state.dogs);
};

const getDogsDataOutsideComponent = () => {
  return globalDataState.getState().dogs;
};

const setDogsData = (dogsData: IDog[]) => {
  globalDataState.setState((prev) => {
    return {
      ...prev,
      dogs: dogsData,
    };
  });
};

const removeDogsData = () => {
  globalDataState.setState((prev) => ({
    ...prev,
    dogs: [],
  }));
};

const getRandomImages = () => {
  return globalDataState((state) => state.randomImages);
};

const setRandomImages = (randomImages: string[]) => {
  globalDataState.setState((prev) => {
    return {
      ...prev,
      randomImages,
    };
  });
};

export const GlobalStateService = {
  getDogsData,
  getDogsDataOutsideComponent,
  setDogsData,
  removeDogsData,
  setRandomImages,
  getRandomImages,
};
