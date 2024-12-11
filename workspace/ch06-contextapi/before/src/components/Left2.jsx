import Left3 from '@components/Left3';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

Left2.propTypes = {
  count: PropTypes.number.isRequired,
};

function Left2({ count }) {
  useEffect(()=>{
    console.log('    # Left2 렌더링.');
  });
  return (
    <div>
      <h2>Left2</h2>
      <Left3 count={ count } />
    </div>
  );
}

export default Left2;