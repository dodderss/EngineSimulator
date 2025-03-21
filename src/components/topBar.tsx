// Importing necessary icons and dependencies
import CloseIcon from "../assets/icons/system/close.svg";
import MinimiseIcon from "../assets/icons/system/minimise.svg";
import MaximiseIcon from "../assets/icons/system/maximise.svg";
import MenuIcon from "../assets/icons/system/menu.svg";
import SaveIcon from "../assets/icons/system/save.svg";
import OpenIcon from "../assets/icons/system/open.svg";
import SettingsIcon from "../assets/icons/system/settings.svg";
import InternetIcon from "../assets/icons/decorative/internet.svg";

import { useContext, useEffect, useState, useCallback } from "react";
import { EngineContext, isEngine } from "../services/globals";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import "./topBar.tsx.css";
import { exit } from "@tauri-apps/plugin-process";
import { createFile, openFile } from "../services/fileSystem";
import Button from "./ui/button";

// Interface for TopBar component props
interface TopBarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isInternetMenuOpen: boolean;
  setIsInternetMenuOpen: (value: boolean) => void;
}

// TopBar component definition
function TopBar({
  isMenuOpen,
  setIsMenuOpen,
  setIsInternetMenuOpen,
}: TopBarProps) {
  // Context and state hooks
  const { engine, updateState } = useContext(EngineContext);
  const [appWindow, setAppWindow] = useState<Window | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [engineName, setEngineName] = useState(engine.engineName);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Update engine name when engine context changes
  useEffect(() => {
    setEngineName(engine.engineName);
  }, [engine.engineName]);

  // Handlers for editing engine name
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: any) => {
    setEngineName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    updateState({ engine: { ...engine, engineName: engineName } });
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  // Fetch current window on component mount
  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);

  // Handle keydown event for menu
  const handleMenuKeyDown = useCallback((event: any) => {
    if (event.key === "Escape") {
      setDropdownOpen((prev) => !prev);
    }
  }, []);

  // Add and remove keydown event listener based on menu state
  useEffect(() => {
    if (!isMenuOpen) {
      window.addEventListener("keydown", handleMenuKeyDown);

      return () => {
        window.removeEventListener("keydown", handleMenuKeyDown);
      };
    } else {
      window.removeEventListener("keydown", handleMenuKeyDown);
    }
  }, [handleMenuKeyDown, isMenuOpen]);

  // Render TopBar component
  return (
    <div
      data-tauri-drag-region
      className="topBar flex items-center justify-between pr-5 pl-2"
    >
      <div>
        <div
          className={`titleBar ${dropdownOpen ? "dropDown" : ""}`}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="flex min-w-52 space-x-5 p-2 pl-4 items-center pr-5 mr-5">
            {/* Menu icon */}
            <img
              src={MenuIcon.toString()}
              alt=""
              className="max-h-8 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            <div>
              {/* Conditional rendering for editing engine name */}
              {isEditing ? (
                <input
                  type="text"
                  value={engineName}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  maxLength={25}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleChange(e);
                    setIsEditing(false);
                  }}
                  onBlur={handleBlur}
                  className="text-3xl whitespace-nowrap focus:outline-none pr-5"
                  style={{ backgroundColor: "#00000000" }}
                  autoFocus
                />
              ) : (
                <h1
                  className="text-3xl whitespace-nowrap pr-5"
                  onClick={handleEdit}
                >
                  {engineName}
                </h1>
              )}
            </div>
          </div>
          <div className="dropdownContent">
            {/* Save button */}
            <Button
              icon={SaveIcon.toString()}
              name="Save as"
              onClick={() => {
                createFile(JSON.stringify(engine), engine.engineName);
              }}
              small={true}
            />
            {/* Open button */}
            <Button
              icon={OpenIcon.toString()}
              name="Open"
              onClick={() => {
                openFile().then((value) => {
                  if (value === "") {
                    alert("Invalid file: File empty.");
                    return;
                  }

                  const parsedValue = JSON.parse(value.toString());

                  if (isEngine(parsedValue)) {
                    updateState({ engine: JSON.parse(value.toString()) });
                    setIsMenuOpen(false);
                    return value;
                  } else {
                    alert(
                      "Invalid file: File may be corrupted or an old version."
                    );
                    return;
                  }
                });
              }}
              small={true}
            />
            {/* Enginuity Hub button */}
            <Button
              icon={InternetIcon.toString()}
              name="Enginuity Hub"
              onClick={() => {
                setIsInternetMenuOpen(true);
              }}
              small={true}
            />
            {/* Settings button */}
            <Button
              icon={SettingsIcon.toString()}
              name="Settings"
              onClick={() => {
                setIsMenuOpen(true);
              }}
              small={true}
            />
            {/* Exit button */}
            <Button
              icon={CloseIcon.toString()}
              name="Exit"
              onClick={() => {
                exit(1);
              }}
              small={true}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row space-x-5">
        {/* Maximize button */}
        <div
          className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
          onClick={() => appWindow?.maximize() ?? null}
        >
          <img src={MaximiseIcon.toString()} alt="" />
        </div>
        {/* Minimize button */}
        <div
          className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
          onClick={() => appWindow?.minimize() ?? null}
        >
          <img src={MinimiseIcon.toString()} alt="" />
        </div>
        {/* Close button */}
        <div
          className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
          onClick={() => appWindow?.close() ?? null}
        >
          <img src={CloseIcon.toString()} alt="" />
        </div>
      </div>
    </div>
  );
}

// Exporting TopBar component as default
export default TopBar;