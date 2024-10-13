import React, { useEffect } from "react";
import "./overlay.tsx.css";

import CloseIcon from "../../assets/icons/system/close.svg";

export type Size = "small" | "large";

interface OverlayProps {
  children?: React.ReactNode;
  isOverlayOpen: boolean;
  setIsOverlayOpen: (isOpen: boolean) => void;
  title?: string;
  size?: Size;
}

const Overlay: React.FC<OverlayProps> = ({
  children,
  isOverlayOpen,
  setIsOverlayOpen,
  title,
  size
}) => {
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setIsOverlayOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOverlayOpen, setIsOverlayOpen]);
  return isOverlayOpen ? (
    <div className="overlay">
      <div className={size !== "large" ? "content smaller p-3" : "content larger p-3"}>
        <div className="flex flex-row justify-between w-full p-3">
          <h1>{title}</h1>
          <div
            className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
            onClick={() => setIsOverlayOpen(false)}
          >
            <img src={CloseIcon.toString()} alt="" />
          </div>
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Overlay;
