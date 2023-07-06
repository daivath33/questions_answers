import "./Heading.scss";

const Heading = ({ className, children }) => {
  return <h1 className={`heading ${className}`}>{children}</h1>;
};

export default Heading;
