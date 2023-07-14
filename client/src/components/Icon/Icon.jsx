import PropTypes from "prop-types";
import "./Icon.scss";

const Icon = ({ onClick, children }) => {
  return (
    <div className={`icon-box &{className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
