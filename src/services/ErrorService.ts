// src/services/ErrorService.ts
const ErrorService = {
  handleError(errorMsg: string) {
    console.log('Error: ' + errorMsg); // Mostrar el error en la consola o UI
    alert(errorMsg); // También podrías mostrar un popup o notificación
  },
};

export { ErrorService };
