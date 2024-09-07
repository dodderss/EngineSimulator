import CloseIcon from "../assets/icons/system/close.svg";
import MinimiseIcon from "../assets/icons/system/minimise.svg";
import MaximiseIcon from "../assets/icons/system/maximise.svg";
import MenuIcon from "../assets/icons/system/menu.svg";

import { useContext, useEffect, useState } from "react";
import { EngineContext } from "../services/globals";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";
import "./topBar.tsx.css";
import { createFile } from "../services/fileSystem";

function TopBar() {
  const { engine } = useContext(EngineContext);
  const [appWindow, setAppWindow] = useState<Window | null>(null);

  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);

  return (
    <div
      data-tauri-drag-region
      className="topBar flex items-center justify-between p-2 pr-5 pl-5"
    >
      <div className="titleBar flex min-w-52 h-full justify-center align-center  items-center space-x-5 p-2 pl-6 pr-6">
        
        <img src={MenuIcon.toString()} alt="" className="max-h-8" />
        <h1
          className="text-3xl whitespace-nowrap"
          onClick={() => createFile(JSON.stringify(engine))}
        >
          {engine.engineName}
        </h1>
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
