import { useEffect, useState } from 'react';
import './App.css';
import { DogUseCases } from './use-cases/DogUseCases';
import { GlobalStateService } from './store/GlobalStateService';
import Card from './components/Card';
import { Flex } from 'antd';
import Nav from './components/Nav';
import Carousel from './components/Carousel';
import PostButton from './screens/post';

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
    <main>
      <Nav />
      <div
        style={{
          alignContent: 'center',
        }}
      >
        <Carousel />
        <PostButton />
        <Flex wrap gap={20} justify='center'>
          {dogs?.map((i) => {
            return <Card dog={i} />;
          })}
        </Flex>
      </div>
    </main>
  );
}

export default App;
