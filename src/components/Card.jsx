import { useEffect, useState } from 'react';

function Card() {
  const [dataAPI, setDataAPI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon/ditto/'
        );

        let actualData = await response.json();
        console.log(actualData);
        console.log(actualData.sprites.front_default)
        setDataAPI(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDataAPI(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="card">
      <img src={dataAPI ? dataAPI.sprites.front_default :''} alt="img" />
      <p>{dataAPI.name}</p>
    </div>
  );
}

export default Card;
