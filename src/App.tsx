import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import { Flex, Spin } from "antd";
import Nav from "./components/Nav";
import Carousel from "./components/Carousel";
import { axiosInstance } from "./services/axiosInstance";
import { IDog } from "./types";

function App() {
  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<IDog[]>([]);

  // Llamamos a /breeds tanto en App.tsx como en componente Search.
  // En caso de cambiar el endpoint o la forma de acceder a las imagenes debemos cambiar cada archivo donde se apunte al antiguo endpoint.
  // Se repite dos veces un llamado que se podria hacer una sola vez.
  // Para evitar requests repetidas deberiamos pasar los datos por props de App > Nav > Search.
  // Al hacer la request dentro del componente/screen si llega a hacerse mal el manejo de errores puede fallar la aplicacion y sera mas dificil encontrar donde esta el problema (Ya que el error no solo puede estar en la request de la screen o componente sino en otros componentes hijo que tambien hagan requests)
  // Si necesitamos obtener mas datos el componente se ensucia con miles de funciones.

  const getDogs = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/breeds");
      setDogs(
        data.map((i: any) => ({
          id: i.id,
          name: i.name,
          image:
            "https://cdn2.thedogapi.com/images/" +
            i.reference_image_id +
            ".jpg",
        }))
      );
      setLoading(false);
    } catch (errorUseCase: any) {
      console.log({ errorUseCase });
    }
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <main>
      <Nav />
      <div
        style={{
          alignContent: "center",
        }}
      >
        <Carousel />

        <Flex wrap gap={20} justify="center">
          {!loading ? (
            dogs?.map((i) => {
              return <Card dog={i} />;
            })
          ) : (
            <Spin size="large" />
          )}
        </Flex>
      </div>
    </main>
  );
}

export default App;
