import classNames from "./Input.module.css";

export const Input = (props) => {
  return <input {...props} className={classNames.input} />;
};
