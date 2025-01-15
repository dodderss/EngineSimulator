// Import necessary modules and components
import { useContext, useEffect, useState } from "react";

import CloseIcon from "../assets/icons/system/close.svg";
import MinimiseIcon from "../assets/icons/system/minimise.svg";
import MaximiseIcon from "../assets/icons/system/maximise.svg";

import NewFileIcon from "../assets/icons/decorative/newFile.svg";
import OpenFileIcon from "../assets/icons/decorative/openFile.svg";

import MenuIcon from "../assets/icons/decorative/menuLogo.png";

import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import Button from "./ui/button";
import { openFile } from "../services/fileSystem";
import { EngineContext, isEngine } from "../services/globals";

// Define the MenuScreen functional component
function MenuScreen({
  updateIsEngineOpen,
}: {
  updateIsEngineOpen: (value: boolean) => void;
}) {
  const [appWindow, setAppWindow] = useState<Window | null>(null);

  // Fetch the current window when the component mounts
  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);

  const { updateState } = useContext(EngineContext); // Get the updateState function from the EngineContext

  return (
    <div style={{ height: "100vh" }}>
      <div className="fixed top-0 w-full h-24" data-tauri-drag-region>
        <div className="fixed top-0 right-0 p-5">
          <div className="flex flex-row space-x-5">
            <div
              className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
              onClick={() => appWindow?.maximize() ?? null} // Maximize the window when the button is clicked
            >
              <img src={MaximiseIcon.toString()} alt="" /> {/* Display the maximize icon */}
            </div>
            <div
              className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
              onClick={() => appWindow?.minimize() ?? null} // Minimize the window when the button is clicked
            >
              <img src={MinimiseIcon.toString()} alt="" /> {/* Display the minimize icon */}
            </div>
            <div
              className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
              onClick={() => appWindow?.close() ?? null} // Close the window when the button is clicked
            >
              <img src={CloseIcon.toString()} alt="" /> {/* Display the close icon */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col h-full w-full justify-center items-center gap-5">
        <img src={MenuIcon} alt="Menu Icon" width={250} height={250} /> {/* Display the menu icon */}
        <h1 className="text-5xl">Enginuity</h1> {/* Display the application title */}
        <Button
          name="New Project"
          icon={NewFileIcon.toString()}
          onClick={() => {
            updateIsEngineOpen(true); // Open a new project when the button is clicked
          }}
        />
        <Button
          name="Open File"
          icon={OpenFileIcon.toString()}
          onClick={() => {
            openFile().then((value) => {
              if (value === "") {
                alert("Invalid file: File empty."); // Alert if the file is empty
                return;
              }

              const parsedValue = JSON.parse(value.toString());

              if (isEngine(parsedValue)) {
                updateState({ engine: JSON.parse(value.toString()) }); // Update the state with the parsed engine data
                updateIsEngineOpen(true); // Open the engine

                return value;
              } else {
                alert("Invalid file: File may be corrupted or an old version."); // Alert if the file is invalid
                return;
              }
            });
          }}
        />
      </div>
    </div>
  );
}

// Export the MenuScreen component as the default export
export default MenuScreen;