import "./button.tsx.css";

interface ButtonProps {
  name: string;
  icon?: string;
  onClick: () => void;
  small?: boolean;
}

function Button({ small, name, icon, onClick }: ButtonProps) {
  return (
    <div
      className={
        small
          ? "small custButton flex items-center gap-4"
          : "large custButton flex items-center gap-4 "
      }
      onClick={() => {
        onClick();
      }}
    >
      {icon ? (
        <img src={icon} alt="icon" width={small ? "48" : "56"} height={small ? "48" : "56"} className="pl-4" />
      ) : null}
      <h2>{name}</h2>
    </div>
  );
}

export default Button;
