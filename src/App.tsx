import { useEffect, useState } from 'react';
import './App.css';
import { DogUseCases } from './use-cases/DogUseCases';
import { GlobalStateService } from './store/GlobalStateService';

function App() {
  const [loading, setLoading] = useState(true);
  const dogs = GlobalStateService.getDogsData(); // Obtener los perros desde el estado global

  useEffect(() => {
    DogUseCases.retrieveDogs().finally(() => {
      setLoading(false); // Quitamos el estado de carga una vez que la petición se completa
    });
  }, []);

  if (loading) return <p>Cargando perros...</p>;

  return (
    <div>
      <h1>Lista de Perros</h1>
      <ul>
        {dogs.map((dog) => (
          <li key={dog.id}>
            <p>{dog.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
