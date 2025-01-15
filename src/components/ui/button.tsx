// Import necessary modules from React and CSS file for styling
import { ButtonHTMLAttributes } from "react";
import "./button.tsx.css";

// Define the interface for Button component props
interface ButtonProps {
  name: string; // The text to be displayed on the button
  icon?: string; // Optional icon to be displayed on the button
  onClick: () => void; // Function to be called when the button is clicked
  small?: boolean; // Optional flag to determine the size of the button
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]; // Optional type attribute for the button element
}

// Define the Button functional component
function Button({ small, name, icon, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type} // Set the type of the button
      className={
        small
          ? "small custButton flex items-center gap-4" // Apply small button styles if small prop is true
          : "large custButton flex items-center gap-4 " // Apply large button styles if small prop is false
      }
      onClick={() => {
        onClick(); // Call the onClick function when the button is clicked
      }}
    >
      {icon ? (
        <img
          src={icon} // Set the source of the icon image
          alt="icon" // Set the alt text for the icon image
          width={small ? "48" : "56"} // Set the width of the icon based on the small prop
          height={small ? "48" : "56"} // Set the height of the icon based on the small prop
          className="pl-4" // Apply padding-left to the icon
        />
      ) : null}
      <h2>{name}</h2> {/* Display the name prop as the button text */}
    </button>
  );
}

// Export the Button component as the default export
export default Button;