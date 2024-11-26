import PropTypes from "prop-types";
import { Link } from "react-router-dom";

TodoListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }),
  handleDelete: PropTypes.func.isRequired,
};

function TodoListItem({ item, handleDelete }) {
  return (
    <li>
      <span>{ item._id }</span>
      <Link to={`/list/${ item._id }`}>{ item.done ? <s>{ item.title }</s> : item.title }</Link>
      <button type="button" onClick={ () => handleDelete(item._id) }>삭제</button>
    </li>
  );
};

export default TodoListItem;