import React from "react";
import "./button.tsx.css";

interface ButtonProps {
  name: string;
  icon: string;
  onClick: () => void;
}

function Button({ name, icon, onClick }: ButtonProps) {
  return (
    <div className="custButton flex items-center gap-4" onClick={() => {
      onClick();
    }}>
      <img src={icon} alt="icon" width="56" height="56" className="pl-4" />
      <h2>{name}</h2>
    </div>
  );
}

export default Button;
