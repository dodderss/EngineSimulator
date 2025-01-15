// Import necessary modules from React and CSS file for styling
import React, { useEffect } from "react";
import "./overlay.tsx.css";

import CloseIcon from "../../assets/icons/system/close.svg";

// Define the type for the size prop
export type Size = "small" | "large";

// Define the interface for Overlay component props
interface OverlayProps {
  children?: React.ReactNode; // Optional children elements to be displayed inside the overlay
  isOverlayOpen: boolean; // Flag to determine if the overlay is open
  setIsOverlayOpen: (isOpen: boolean) => void; // Function to set the overlay open state
  title?: string; // Optional title for the overlay
  size?: Size; // Optional size for the overlay
}

// Define the Overlay functional component
const Overlay: React.FC<OverlayProps> = ({
  children,
  isOverlayOpen,
  setIsOverlayOpen,
  title,
  size
}) => {
  // Add event listener for the Escape key to close the overlay
  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setIsOverlayOpen(false); // Close the overlay when Escape key is pressed
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOverlayOpen, setIsOverlayOpen]);

  // Render the overlay if it is open
  return isOverlayOpen ? (
    <div className="overlay">
      <div className={size !== "large" ? "content smaller p-3" : "content larger p-3"}>
        <div className="flex flex-row justify-between w-full p-3">
          <h1>{title}</h1> {/* Display the title of the overlay */}
          <div
            className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
            onClick={() => setIsOverlayOpen(false)} // Close the overlay when the close button is clicked
          >
            <img src={CloseIcon.toString()} alt="" /> {/* Display the close icon */}
          </div>
        </div>
        {children} {/* Render the children elements inside the overlay */}
      </div>
    </div>
  ) : null; // Return null if the overlay is not open
};

// Export the Overlay component as the default export
export default Overlay;