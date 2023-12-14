import './Input.css';

type InputProp = {
  type: string;
  required: boolean;
  labelText: string;
  onChange?: any;
  name?: string;
  value?: string | number;
  min?: string;
  className?: string;
};

export const Input = (props: InputProp) => {
  return (
    <div>
      <label
        style={{
          fontFamily: 'Open sans',
          fontWeight: '700',
          fontSize: '16px',
        }}
      >
        {props.labelText}
      </label>
      <br />
      <input
        min={props.min}
        className={props.className}
        value={props.value}
        name={props.name}
        type={props.type}
        placeholder='Input text'
        onChange={props.onChange}
      />
    </div>
  );
};
