import PropTypes from "prop-types";

InputError.propTypes = {
  target: PropTypes.object,
};

export default function InputError({ target }) {
  // target이 존재하지 않으면 아무것도 렌더링하지 않음음
  if (!target) return;
  // target.message는 tailwind CSS로 스타일링
  return (
    <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
      {target.message}
    </p>
  );
}
