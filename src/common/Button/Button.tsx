import './Button.css';

type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  disabled?: boolean;
  type?: string;
  form?: string;
  style: {
    width: string;
    height: string;
    display?: string;
  };
  className?: string;
};

export const Button = (props: ButtonProps) => {
  return (
    <button
      form={props.form}
      className={props.className}
      style={props.style}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  );
};
