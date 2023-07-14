import "./Textarea.scss";

const Textarea = ({ className, ...props }) => {
  return <textarea className={`styled-textarea ${className}`} {...props} />;
};

export default Textarea;
