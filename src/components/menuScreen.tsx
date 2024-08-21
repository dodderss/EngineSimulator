import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "../icons/system/close.svg";
import MinimiseIcon from "../icons/system/minimise.svg";
import MaximiseIcon from "../icons/system/maximise.svg";
import MenuIcon from "../icons/decorative/menuLogo.png";
import { getCurrentWindow, Window } from "@tauri-apps/api/window";

interface MenuScreenProps {
  setProjectIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MenuScreen({ setProjectIsOpen }: MenuScreenProps) {
  const [appWindow, setAppWindow] = useState<Window | null>(null);

  useEffect(() => {
    async function fetchWindow() {
      const window = await getCurrentWindow();
      setAppWindow(window);
    }

    fetchWindow();
  }, []);
  return (
    <div style={{height: "100vh"}}>
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

      <div className="flex h-full w-full justify-center items-center">
        <img src={MenuIcon} alt="Menu Icon"/>
        <h1 className="text-5xl">Engine Simulator</h1>
      </div>
    </div>
  );
}

export default MenuScreen;
