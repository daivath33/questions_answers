import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ type, children, onClick, className }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  className: "",
};
export default Button;
