import './Button.css';

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
  style: {
    width: string;
    height: string;
  };
};

export const Button = (props: ButtonProps) => {
  return (
    <button style={props.style} onClick={props.onClick}>
      {props.buttonText}
    </button>
  );
};
