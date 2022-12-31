type ButtonProps = {
  action: string;
};

const Button = ({ action }: ButtonProps) => {
  return (
    <button className="button" type="submit">
      {action}
    </button>
  );
};

export default Button;
