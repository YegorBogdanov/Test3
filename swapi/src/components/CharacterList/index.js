import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CharacterContext from '../../contexts/CharacterContext';

function CharacterList() {

  const { data } = useContext(CharacterContext);
  console.log("DATA LIST", data);

  return (
    <div>
      <ul>
        {data.length > 0 && data.map(({ name }) => (
          <li><Link to={`/characters/${name}`}>{name}</Link></li>
        ))}
      </ul>
    </div>
  )
}

export default CharacterList