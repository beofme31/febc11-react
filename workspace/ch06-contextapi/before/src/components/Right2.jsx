import Right3 from '@components/Right3';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

Right2.propTypes = {
  countDown: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  countUp: PropTypes.func.isRequired,
};

function Right2({ countDown, reset, countUp }) {
  useEffect(()=>{
    console.log('    # Right2 렌더링.');
  });
  return (
    <div>
      <h2>Right2</h2>
      <Right3 countDown={ countDown } reset={ reset } countUp={ countUp }  />
    </div>
  );
}

export default Right2;