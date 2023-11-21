import React, { useEffect, useRef } from 'react';

import './index.css';
import { getColorByStatistic } from '../../utils/getColorByStatistic';

function PokemonStatistic({ statistic, number }) {
  const barRef = useRef();
  const containerRef = useRef();
  useEffect(() => {
    barRef.current.style.width = number > 100 ? 100 + '%' : number + '%';
    barRef.current.style.background = getColorByStatistic(number);
  }, []);

  return (
    <div ref={containerRef} className='statistic-container'>
      <span>{statistic.toUpperCase()}</span>
      <div>
        <div className='statistic-bar'>
          <div className='statistic-filled-bar' ref={barRef}></div>
        </div>

        <span className='statistic-number'>{number}</span>
      </div>
    </div>
  );
}

export default PokemonStatistic;
