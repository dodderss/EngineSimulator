import { ButtonHTMLAttributes } from "react";
import "./button.tsx.css";

interface ButtonProps {
  name: string;
  icon?: string;
  onClick: () => void;
  small?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

function Button({ small, name, icon, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
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
    </button>
  );
}

export default Button;