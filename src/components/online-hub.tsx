// Import necessary libraries and components
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Overlay from "./ui/overlay";
import Button from "./ui/button";
import { addEngine, getEngines } from "../services/onlineServices";
import { Engine, EngineContext } from "../services/globals";
import EngineCard from "./ui/engineCard";

import "./online-hub.tsx.css";

import UploadIcon from "../assets/icons/system/upload.svg";
import LogoutIcon from "../assets/icons/system/logout.svg";
import LoginIcon from "../assets/icons/system/login.svg";

import UserSystem from "../services/user";

// Define the props for the OnlineHub component
interface OnlineHubProps {
  isOverlayOpen: boolean;
  setIsOverlayOpen: Dispatch<SetStateAction<boolean>>;
}

// Define the OnlineHub component
function OnlineHub({ isOverlayOpen, setIsOverlayOpen }: OnlineHubProps) {
  // Use context to get the engine and updateState function
  const { engine, updateState } = useContext(EngineContext);
  // Define state variables
  const [engines, setEngines] = useState<Engine[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [signedIn, setSignedIn] = useState(false);

  // Fetch engines when the component mounts
  useEffect(() => {
    getEngines().then((data) => {
      setEngines(data);
    });
  }, []);

  // Reset form fields when the overlay is closed
  useEffect(() => {
    if (!isOverlayOpen) {
      setUsername("");
      setPassword("");
      setRegisterUsername("");
      setRegisterPassword("");
    }
  }, [isOverlayOpen]);

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    UserSystem.login(username, password).then((a) => {
      if (a) {
        setSignedIn(true);
      } else {
        alert("Invalid username or password.");
      }
    });
  };

  // Handle registration form submission
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    UserSystem.register(registerUsername, registerPassword).then((a) => {
      if (a) {
        alert("User registered successfully.");
        setSignedIn(true);
      } else {
        alert("Username already exists.");
      }
    });
  };

  // Render the component
  return (
    <Overlay
      isOverlayOpen={isOverlayOpen}
      setIsOverlayOpen={setIsOverlayOpen}
      title="Enginuity Hub"
      size="large"
    >
      {signedIn ? (
        <div>
          <div className="flex justify-between">
            <Button
              icon={UploadIcon.toString()}
              name="Upload Engine"
              onClick={() => {
                addEngine(engine);
              }}
            />
            <Button
              icon={LogoutIcon.toString()}
              name="Log out"
              onClick={() => {
                UserSystem.logout();
                setSignedIn(false);
              }}
            />
          </div>

          <p className="mt-4">All Online Engines</p>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pt-2 gap-2">
            {engines.map((i) => (
              <EngineCard
                key={i.engineName + Math.random().toString()}
                name={i.engineName}
                cylinders={i.engineCylinders}
                layout={i.engineType}
                displacement={i.displacement}
                aspiration={i.aspirationType}
                power={i.power}
                torque={i.torque}
                onClick={() => {
                  updateState({ engine: i });
                  setIsOverlayOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-300">
            Error: You must be signed in to use the Enginuity Hub.
          </p>
          <div className="flex align-middle justify-center gap-4">
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-2 p-6 border-white border-2 justify-center"
            >
              <h1 className="mb-2">Sign in</h1>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2"
              />
              <Button
                icon={LoginIcon.toString()}
                name="Sign In"
                type="submit"
                onClick={() => console.log("Sign In")}
              />
            </form>
            <p>- Or -</p>
            <form
              onSubmit={handleRegister}
              className="flex flex-col gap-2 p-6 border-white border-2 justify-center"
            >
              <h1 className="mb-2">Register</h1>
              <input
                type="text"
                placeholder="Username"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="p-2"
              />
              <input
                type="password"
                placeholder="Password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="p-2"
              />
              <Button
                icon={LoginIcon.toString()}
                name="Register"
                type="submit"
                onClick={() => console.log("Sign In")}
              />
            </form>
          </div>
        </div>
      )}
    </Overlay>
  );
}

// Export the OnlineHub component as the default export
export default OnlineHub;