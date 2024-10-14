import axios from 'axios';

const getAll = async () => {
  try {
    // 1. Obtener las razas de perros de The Dog API
    const apiResponse = await axios.get('https://api.thedogapi.com/v1/breeds', {
      headers: {
        'x-api-key':
          'live_Rtk4yflLqy8mk1BGT0I3P2uvqn94BYM7wksC7kDHCLSIhMerMGKqJvrNfep7enJN',
      },
    });

    // parsear datos
    const apiBreeds = apiResponse.data.map((breed: any) => ({
      id: breed.id,
      source: 'api',
      name: breed.name,
      life_span: breed.life_span,
      origin: breed.origin,
      image: breed.reference_image_id
        ? 'https://api.thecatapi.com/v1/images/' + breed.reference_image_id
        : '', // Verifica si hay imagen, si no hay poner una default
      temperament: breed.temperament,
    }));

    // 2. Obtener las razas de perros desde la base de datos local
    const localResponse = await axios.get('http://localhost:3001/breeds');
    const localBreeds = localResponse.data;

    // 3. Combinar las razas de ambas fuentes
    const combinedBreeds = [...apiBreeds, ...localBreeds];

    // 4. Guardar las razas combinadas en el estado
    return combinedBreeds;
  } catch (error) {
    console.error('Error fetching breeds:', error);
  }
};

const search = async (search: '') => {
  try {
    // 1. Buscar en The Dog API
    const apiResponse = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${search}`,
      {
        headers: {
          'x-api-key':
            'live_Rtk4yflLqy8mk1BGT0I3P2uvqn94BYM7wksC7kDHCLSIhMerMGKqJvrNfep7enJN',
        },
      }
    );
    const apiBreeds = apiResponse.data.map((breed: any) => ({
      id: breed.id,
      source: 'api',
      name: breed.name,
      life_span: breed.life_span,
      origin: breed.origin,
      image: breed.image ? breed.image.url : '', // The Dog API no devuelve la imagen en la búsqueda, solo el nombre de la raza
      temperament: breed.temperament,
    }));

    // 2. Buscar en la base de datos local (JSON Server)
    const localResponse = await axios.get(
      `http://localhost:3001/breeds?name_like=${search}`
    );
    const localBreeds = localResponse.data;

    // 3. Combinar los resultados de ambas fuentes
    const combinedBreeds = [...apiBreeds, ...localBreeds];

    // 4. Guardar los resultados de la búsqueda en el estado
    return combinedBreeds;
  } catch (error) {
    console.error('Error searching breeds:', error);
  }
};

const postBreed = async (newBreed: any) => {
  try {
    // Send a POST request to JSON Server
    const response = await axios.post('http://localhost:3001/ratas', newBreed);

    // Handle response
    if (response.status === 201) {
      console.log('Breed added successfully!');
    } else {
      throw Error('An error occurred while adding the breed.');
    }
  } catch (error) {
    console.error('Error adding breed:', error);
  }
};

const deleteBreed = async (id: string) => {
  try {
    if (id) {
      // Send DELETE request to JSON Server
      const response = await axios.delete(`http://localhost:3001/breeds/${id}`);

      // Handle response
      if (response.status === 200) {
        console.log('Breed deleted successfully!');
      } else {
        throw Error('Failed to delete breed.');
      }
    } else {
      throw Error('Please select a breed to delete.');
    }
  } catch (error) {
    console.error('Error deleting breed:', error);
  }
};

export { getAll, search, postBreed, deleteBreed };
