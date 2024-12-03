import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf(['blue', 'red', 'black', 'white']), // 글자 색상
  bg: PropTypes.oneOf(['blue', 'red', 'yellow', 'gray']), // 배경 색상
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
};

export default function Button({ children, bg="gray", color="black", size="md", ...rest }){
  let bgColor = {
    gray: 'bg-gray-400',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
  };

  let textColor = {
    black: 'text-black',
    white: 'text-white',
    blue: 'text-blue-500',
    red: 'text-red-500',
  };

  let btnSize = {
    sm: 'py-1 px-2 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2 px-6 text-lg',
  };

  return <button className={ `${bgColor[bg]} ${textColor[color]} ${btnSize[size]} m-1 rounded-md` } { ...rest }>{ children }</button>
}