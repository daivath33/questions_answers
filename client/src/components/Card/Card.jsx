import "./Card.scss";

const Card = ({ className, children }) => {
  return <div className={`form-card ${className}`}>{children}</div>;
};

export default Card;
