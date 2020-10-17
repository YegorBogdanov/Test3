import React, { useEffect, useState } from 'react';
import './App.css';
import CharacterContext from './contexts/CharacterContext';
import { Route, Switch, useHistory } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import Character from './components/Character';

function App() {

  const [data, setData] = useState([]);
  const [primaryData, setPrimaryData] = useState([])
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  // const [filteredData, setFilteredData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const response = await fetch("https://swapi.dev/api/films/1/", {
        method: 'GET',
      })
      const charactersURL = await response.json();
      const charactersResponses = await Promise.all(charactersURL.characters.map((character) => fetch(character)));
      const characters = await Promise.all(charactersResponses.map((character) => character.json()));
      setPrimaryData(characters);
      setData(primaryData)
    })()
  }, [])

  function sortHeroesByHeight({ target: { value } }) {
    console.log(value);
    if (value === 'ascending') {
      setData((prev) => [...prev].sort((a, b) => a.height - b.height))
    } else {
      setData((prev) => [...prev].sort((a, b) => b.height - a.height))
    }
    console.log(data);
  };

  function genderFilter({ target: { value } }) {
    const filtered = primaryData.filter(({ gender }) => gender === value)
    setData((prev) => filtered)
  }

  function findHero(event) {
    event.preventDefault();
    const hero = data.find(({ name }) => name === input)
    if (hero) {
      history.push(`/characters/${hero.name}`)
    } else {
      setError("wrong name")
    }
  }

  function change({ target: { value } }) {
    setInput(value)
  }

  return (
    <CharacterContext.Provider value={{ data, setData }}>
      <Switch>
        <Route path="/characters/:characterName">
          <Character />
        </Route>
        <div className="App">
          <header className="App-header">
            <div>
              <form onSubmit={findHero}>
                {error && <p>{error}</p>}
                <label>find hero by name</label> {' '}
                <input onChange={change} name='name'></input>
                <button type="submit">Find</button>
                <br />
                <label>Height sort</label> {' '}
                <select onChange={sortHeroesByHeight}>
                  <option value="ascending">ascending</option>
                  <option value="descending">descending</option>
                </select>
                <br />
                <label>Gender filter</label> {' '}
                <select onChange={genderFilter}>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </form>
              <CharacterList />
            </div>
          </header>
        </div>
      </Switch>
    </CharacterContext.Provider>
  );
}

export default App;
