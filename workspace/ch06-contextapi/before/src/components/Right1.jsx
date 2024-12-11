import Right2 from '@components/Right2';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

Right1.propTypes = {
  countDown: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  countUp: PropTypes.func.isRequired,
};

function Right1({ countDown, reset, countUp }) {
  useEffect(()=>{
    console.log('  # Right1 렌더링.');
  });
  return (
    <div>
      <h1>Right1</h1>
      <Right2 countDown={ countDown } reset={ reset } countUp={ countUp } />
    </div>
  );
}

export default Right1;