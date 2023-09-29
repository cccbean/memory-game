function Card({ dataAPI, index, chooseCard }) {
  let spriteURL = '';
  let name = '';
  if (dataAPI.length !== 0) {
    spriteURL = dataAPI[index].sprites.front_default;
    name = dataAPI[index].name;
    name = `${name[0].toUpperCase()}${name.slice(1)}`;
  }

  return (
    <button className="card" onClick={chooseCard}>
      <img src={spriteURL} alt="img" />
      <p>{name}</p>
    </button>
  );
}

export default Card;
