import "./Icon.scss";

const Icon = ({ className, onClick, children }) => {
  return (
    <div className={`icon-box &{className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Icon;
