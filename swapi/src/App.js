import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  useEffect(() => {
    (async () => {
      const response = await fetch("https://swapi.dev/api/films/1/", {
        method: 'GET',
      })
      const charactersURL = await response.json();
      const charactersResponses = await Promise.all(charactersURL.characters.map((character) => fetch(character)));

      const characters = await Promise.all(charactersResponses.map((character) => character.json()))

      // console.log(characters);
    })()
  })

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
