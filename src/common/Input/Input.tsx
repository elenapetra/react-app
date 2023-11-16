import './Input.css';

type InputProp = {
  type: string;
  required: boolean;
  labelText: string;
  errorMessage: string;
};

export const Input = (props: InputProp) => {
  return (
    <div>
      <label>{props.labelText}</label>
      <br />
      <input type={props.type} placeholder='Input text' />
      <span>{props.errorMessage}</span>
    </div>
  );
};
