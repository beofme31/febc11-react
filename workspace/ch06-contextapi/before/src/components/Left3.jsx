import PropTypes from 'prop-types';
import { useEffect } from 'react';

Left3.propTypes = {
  count: PropTypes.number.isRequired,
};

function Left3({ count }) {
  useEffect(()=>{
    console.log('      # Left3 렌더링.');
  });
  return (
    <div>
      <h3>Left3</h3>
      <span>{ count }</span>
    </div>
  );
}

export default Left3;