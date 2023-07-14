import PropTypes from "prop-types";
import "./Heading.scss";

const Heading = ({ className, children }) => {
  return <h1 className={`heading ${className}`}>{children}</h1>;
};

Heading.defaultProps = {
  className: "",
};

export default Heading;
