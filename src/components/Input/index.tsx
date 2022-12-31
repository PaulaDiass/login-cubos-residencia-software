type InputProps = {
  type: string;
  placeholder: string;
  required: boolean;
};

const Input = ({ type, placeholder, required }: InputProps) => {
  return (
    <input
      className='input'
      type={type}
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
