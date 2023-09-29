import { useState, useEffect } from 'react';
import Card from './components/Card';

function App() {
  const [dataAPI, setDataAPI] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [indices, setIndices] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  ]);
  const [clickedNames, setClickedNames] = useState([]);
  const [hasLost, setHasLost] = useState(0);
  const [score, setScore] = useState(0);
  const [lastScore, setLastScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    const localBestScore = localStorage.getItem('bestScore');
    if (localBestScore) {
      return Number(localBestScore);
    } else {
      return 0;
    }
  });

  useEffect(() => {
    localStorage.setItem('bestScore', bestScore.toString());
  }, [bestScore]);

  useEffect(() => {
    const getData = async () => {
      try {
        let pokemonArr = [];
        let randomNums = [];

        while (randomNums.length < 12) {
          let randomID = Math.floor(Math.random() * 150 + 1).toString();

          if (!randomNums.includes(randomID)) {
            randomNums.push(randomID);
          }
        }

        for (let i = 0; i < randomNums.length; i++) {
          let response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomNums[i]}/`
          );
          let actualData = await response.json();
          pokemonArr.push(actualData);
        }

        setDataAPI(pokemonArr);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDataAPI(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [hasLost]);

  if (error !== null) {
    console.log(error);
  }

  const generateRandomIndices = () => {
    let randomIndices = [];
    while (randomIndices.length < 12) {
      let randomIndex = Math.floor(Math.random() * 12);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    setIndices(randomIndices);
  };

  const chooseCard = (e) => {
    let button = e.target;
    if (e.target.nodeName !== 'BUTTON') {
      button = e.target.parentElement;
    }

    let pokemonName = button.querySelector('p').textContent;

    if (!clickedNames.includes(pokemonName)) {
      let clickedCopy = [...clickedNames];
      clickedCopy.push(pokemonName);
      setClickedNames(clickedCopy);

      setScore(score + 1);

      generateRandomIndices();
    } else {
      if (score > bestScore) {
        setBestScore(score);
      }

      document.querySelector('dialog').showModal();

      setHasLost(hasLost + 1);
      setClickedNames([]);
      setLastScore(score);
      setScore(0);
    }
  };

  const playAgain = () => {
    document.querySelector('dialog').close();
  };

  return (
    <>
      <header>
        <h1>Pokemon Memory Game</h1>
        <div className="scoreboard">
          <p>Score: {score.toString()}</p>
          <p>Best score: {bestScore.toString()}</p>
        </div>
      </header>
      <main>
        <p>
          Get points by clicking on an image, but don&apos;t click on the same one twice!
        </p>

        <div className="card-container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {Array(12)
                .fill(<Card />)
                .map((component, index) => {
                  return (
                    <Card
                      key={dataAPI[index].name}
                      dataAPI={dataAPI}
                      index={indices[index]}
                      chooseCard={chooseCard}
                    />
                  );
                })}
            </>
          )}
        </div>

        <dialog>
          <h2>You lost!</h2>
          <p>Your score: {lastScore}</p>
          <button onClick={playAgain}>Play again</button>
        </dialog>
      </main>
    </>
  );
}

export default App;
