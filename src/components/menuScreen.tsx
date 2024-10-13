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

function MenuScreen({
  updateIsEngineOpen,
}: {
  updateIsEngineOpen: (value: boolean) => void;
}) {
  const [appWindow, setAppWindow] = useState<Window | null>(null);
  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);
  const { updateState } = useContext(EngineContext);

  return (
    <div style={{ height: "100vh" }}>
      <div className="fixed top-0 w-full h-24" data-tauri-drag-region>
        <div className="fixed top-0 right-0 p-5">
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
      </div>

      <div className="flex flex-col h-full w-full justify-center items-center gap-5">
        <img src={MenuIcon} alt="Menu Icon" width={250} height={250} />
        <h1 className="text-5xl">Enginuity</h1>
        <Button
          name="New Project"
          icon={NewFileIcon.toString()}
          onClick={() => {
            updateIsEngineOpen(true);
          }}
        />
        <Button
          name="Open File"
          icon={OpenFileIcon.toString()}
          onClick={() => {
            openFile().then((value) => {
              if (value === "") {
                alert("Invalid file: File empty.");
                return;
              }

              const parsedValue = JSON.parse(value.toString());

              if (isEngine(parsedValue)) {
                updateState({ engine: JSON.parse(value.toString()) });
                updateIsEngineOpen(true);

                return value;
              } else {
                alert("Invalid file: File may be corrupted or an old version.");
                return;
              }
            });
          }}
        />
      </div>
    </div>
  );
}

export default MenuScreen;
