import React, { useEffect, useState } from "react";
import { AutoComplete, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "./index.scss";
import { GlobalStateService } from "../../store/GlobalStateService";
import { DogUseCases } from "../../use-cases/DogUseCases";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const Search: React.FC<SearchBarProps> = () => {
  const [filteredOptions, setFilteredOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const dogs = GlobalStateService.getDogsData();

  const handleSearch = (value: string) => {
    const matches = dogs
      .filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
      .map((i) => ({ label: i.name, value: i.id }));
    setFilteredOptions(matches);
  };

  useEffect(() => {
    if (dogs.length < 0) {
      DogUseCases.retrieveDogs();
    }
  }, []);

  return (
    <AutoComplete
      options={filteredOptions} // Mostrar las opciones filtradas
      style={{ width: 250 }}
      onSearch={handleSearch}
      className="custom-autocomplete"
    >
      <Input.Search
        placeholder="Search breeds"
        enterButton={<SearchOutlined />}
        onSearch={() => {}} // Ejecuta la búsqueda al presionar Enter o el botón
      />
    </AutoComplete>
  );
};

export default Search;
