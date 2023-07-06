import "./Heading.scss";

const Heading = ({ className, children }) => {
  return <div className={`heading ${className}`}>{children}</div>;
};

export default Heading;
