import CloseIcon from "../assets/icons/system/close.svg";
import MinimiseIcon from "../assets/icons/system/minimise.svg";
import MaximiseIcon from "../assets/icons/system/maximise.svg";
import MenuIcon from "../assets/icons/system/menu.svg";

import SaveIcon from "../assets/icons/system/save.svg";
import OpenIcon from "../assets/icons/system/open.svg";
import SettingsIcon from "../assets/icons/system/settings.svg";

import { useContext, useEffect, useState } from "react";
import { EngineContext } from "../services/globals";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import "./topBar.tsx.css";
import { exit } from "@tauri-apps/plugin-process";
import { createFile, openFile } from "../services/fileSystem";
import Button from "./ui/button";

interface TopBarProps {
  setIsMenuOpen: (value: boolean) => void;
}

function TopBar({ setIsMenuOpen }: TopBarProps) {
  const { engine, updateState } = useContext(EngineContext);
  const [appWindow, setAppWindow] = useState<Window | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [engineName, setEngineName] = useState(engine.engineName);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape") {
        setDropdownOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
            <img
              src={MenuIcon.toString()}
              alt=""
              className="max-h-8 cursor-pointer"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            <div>
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
            <Button
              icon={SaveIcon.toString()}
              name="Save as"
              onClick={() => {
                createFile(JSON.stringify(engine));
              }}
              small={true}
            />
            <Button
              icon={OpenIcon.toString()}
              name="Open"
              onClick={() => {
                openFile().then((value) => {
                  if (value === "") {
                    return;
                  }
                  updateState({ engine: JSON.parse(value.toString()) });
                });
              }}
              small={true}
            />
            <Button
              icon={SettingsIcon.toString()}
              name="Settings"
              onClick={() => {
                setIsMenuOpen(true);
              }}
              small={true}
            />
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
        <div
          className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
          onClick={() => appWindow?.maximize() ?? null}
        >
          <img src={MaximiseIcon.toString()} alt="" />
        </div>
        <div
          className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center p-2"
          onClick={() => appWindow?.minimize() ?? null}
        >
          <img src={MinimiseIcon.toString()} alt="" />
        </div>

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

export default TopBar;
