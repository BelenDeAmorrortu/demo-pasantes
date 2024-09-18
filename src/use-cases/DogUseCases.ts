// src/useCases/DogUseCases.ts

import APIService from '../services/APIService';
import { ErrorService } from '../services/ErrorService';
import { GlobalStateService } from '../store/GlobalStateService';

const retrieveDogs = async () => {
  try {
    const response = await APIService.getBreeds();
    GlobalStateService.setDogsData(response); // Actualiza el estado global con los datos de perros
    console.log({ response });
  } catch (errorUseCase: any) {
    // Capturamos el error ya formateado por el interceptor
    console.log({ errorUseCase });

    ErrorService.handleError(errorUseCase); // Mostrar mensaje de error
    GlobalStateService.removeDogsData(); // Limpiamos el estado en caso de error
  }
};

export const DogUseCases = {
  retrieveDogs,
};
