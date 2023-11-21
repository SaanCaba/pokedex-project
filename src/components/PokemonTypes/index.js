import React from 'react';
import { getBackgroundColorByType } from '../../utils/getBgByType';

import './index.css';

function PokemonTypes({ types }) {
  return (
    <>
      {types.map(({ type }, i) => {
        return (
          <div
            key={i}
            className='type-container'
            style={{ background: getBackgroundColorByType(type.name) }}
          >
            <span className='type-name'>{type.name.toUpperCase()}</span>
          </div>
        );
      })}
    </>
  );
}

export default PokemonTypes;
