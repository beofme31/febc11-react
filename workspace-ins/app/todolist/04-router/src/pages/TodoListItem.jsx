import PropTypes from "prop-types";
import { Link } from "react-router-dom";

TodoListItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool,
  }),
};

function TodoListItem({ item }) {
  return (
    <li>
      <span>{ item._id }</span>
      <Link to={`/list/${ item._id }`}>{ item.done ? <s>{ item.title }</s> : item.title }</Link>
      <Link to="/list">삭제</Link>
    </li>
  );
};

export default TodoListItem;