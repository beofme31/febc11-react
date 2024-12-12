import PropTypes from "prop-types";

InputError.propTypes = {
  target: PropTypes.object,
};

export default function InputError({ target }) {
  if(!target) return;
  return <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">{ target.message }</p>;
}