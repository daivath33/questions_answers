import "./Input.scss";

const Input = ({ type, value, name, placeholder, required, className }) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
