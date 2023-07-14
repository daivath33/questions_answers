import PropTypes from "prop-types";
import "./Card.scss";

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

Card.defaultProps = {
  className: "",
};

export default Card;
