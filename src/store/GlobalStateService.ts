// src/store/globalDataStateService.ts
import { create } from 'zustand';

interface IDog {
  id: number;
  name: string;
  image: { url: string };
  // Puedes agregar más campos dependiendo de la respuesta de The Dog API
}

interface IDataGlobalState {
  dogs: IDog[];
  cats: any[];
}

const initialData: IDataGlobalState = {
  dogs: [],
  cats: [],
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

export const GlobalStateService = {
  getDogsData,
  getDogsDataOutsideComponent,
  setDogsData,
  removeDogsData,
};
