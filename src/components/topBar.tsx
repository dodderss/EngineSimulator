import CloseIcon from "../icons/close.svg";
import MinimiseIcon from "../icons/minimise.svg";
import MaximiseIcon from "../icons/maximise.svg";

import { useContext } from "react";
import { EngineContext } from "../globals";
import { appWindow } from '@tauri-apps/api/window'
import "./topBar.tsx.css";

function TopBar() {
    const { engine } = useContext(EngineContext);

    return (
        <div data-tauri-drag-region className="topBar flex items-center p-5 justify-between">
            <h1 className="text-4xl">{engine.engineName}</h1>
            <div className="flex flex-row space-x-5">
                <div className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center" onClick={() => appWindow.close()}><CloseIcon /></div>
                <div className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center" onClick={() => appWindow.minimize()}><MinimiseIcon /></div>
                <div className="windowButton padding-5 border-white border-2 w-10 h-10 flex justify-center items-center" onClick={() => appWindow.maximize()}><MaximiseIcon /></div>
            </div>
        </div>
    )
}

export default TopBar;