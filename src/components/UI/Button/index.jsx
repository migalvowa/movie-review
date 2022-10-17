import classNames from "./Button.module.css";

export const Button = ({ children, ...props }) => {
  return (
    <button {...props} className={classNames.button}>
      {children}
    </button>
  );
};
