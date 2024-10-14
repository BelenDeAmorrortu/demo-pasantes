import { postBreed } from '../requests';

function PostButton() {
  const handleClick = () => {
    const breed = {
      hola: 'pepe',
    };
    postBreed(breed);
  };

  return (
    <div>
      <button onClick={handleClick}>Click para postear</button>
    </div>
  );
}

export default PostButton;
