import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import CharacterContext from '../../contexts/CharacterContext'

function Character() {

  const { characterName } = useParams();
  // console.log('characterName', characterName);
  const { data } = useContext(CharacterContext);
  console.log("DATA", data);
  const character = data.find((personage) => personage.name === characterName)
  // console.log('character', character);
  const { name, height, mass, hair_color, skin_color, eye_color, gender } = character;

  return (
    <div>
      <p>name: {name}</p>
      <p>height: {height}</p>
      <p>mass: {mass}</p>
      <p>hair color: {hair_color}</p>
      <p>skin color: {skin_color}</p>
      <p>eye color: {eye_color}</p>
      <p>gender: {gender}</p>
    </div>
  )
}

export default Character