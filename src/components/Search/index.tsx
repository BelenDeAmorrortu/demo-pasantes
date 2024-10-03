import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { IDog } from "../../types";
import { axiosInstance } from "../../services/axiosInstance";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchBarProps> = () => {
  const [filteredOptions, setFilteredOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [dogs, setDogs] = useState<IDog[]>([]);

  // Llamamos a /breeds tanto en App.tsx como en componente Search.
  // En caso de cambiar el endpoint o la forma de acceder a las imagenes debemos cambiar cada archivo donde se apunte al antiguo endpoint.
  // Se repite dos veces un llamado que se podria hacer una sola vez.
  // Para evitar requests repetidas debemos pasar los datos por props de App > Nav > Search.

  const getDogs = async () => {
    try {
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
    } catch (errorUseCase: any) {
      console.log({ errorUseCase });
    }
  };

  const handleSearch = (value: string) => {
    const matches = dogs
      .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
      .map((i) => ({ label: i.name, value: i.id }));
    setFilteredOptions(matches);
  };

  useEffect(() => {
    getDogs();
  }, []);

  return (
    <AutoComplete
      options={filteredOptions}
      style={{ width: 250 }}
      onSearch={handleSearch}
      className="custom-autocomplete"
    >
      <Input.Search
        placeholder="Search breeds"
        enterButton={<SearchOutlined />}
        onSearch={() => {}}
      />
    </AutoComplete>
  );
};

export default Search;
