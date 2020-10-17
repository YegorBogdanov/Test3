import React, { useEffect, useState } from 'react';
import './App.css';
import CharacterContext from './contexts/CharacterContext';
import { Route, Switch } from 'react-router-dom';
import CharacterList from './components/CharacterList';
import Character from './components/Character';

function App() {

  const [data, setData] = useState([])
  useEffect(() => {
    (async () => {
      const response = await fetch("https://swapi.dev/api/films/1/", {
        method: 'GET',
      })
      const charactersURL = await response.json();
      const charactersResponses = await Promise.all(charactersURL.characters.map((character) => fetch(character)));
      const characters = await Promise.all(charactersResponses.map((character) => character.json()));
      setData(characters)
      // console.log(characters);
    })()
  }, [])

  return (
    <CharacterContext.Provider value={{ data, setData }}>
      <Switch>
        <Route path="/characters/:characterName">
          <Character />
        </Route>
      </Switch>
      <div className="App">
        <header className="App-header">
          <div>
            <CharacterList />
          </div>
        </header>
      </div>
    </CharacterContext.Provider>
  );
}

export default App;
