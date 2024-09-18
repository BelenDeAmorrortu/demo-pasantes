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
}

const initialData: IDataGlobalState = {
  dogs: [],
};

const globalDataState = create(() => initialData);

export const GlobalStateService = {
  getDogsData() {
    return globalDataState((state) => state.dogs);
  },
  setDogsData(dogsData: IDog[]) {
    globalDataState.setState({
      dogs: dogsData,
    });
  },
  removeDogsData() {
    globalDataState.setState((prev) => ({
      ...prev,
      dogs: [],
    }));
  },
};
