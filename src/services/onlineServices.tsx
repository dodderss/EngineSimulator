import { Engine, isEngine } from "./globals";
import { fetch } from "@tauri-apps/plugin-http";

// Function to get the list of engines from the server
export async function getEngines() {
  const url = "http://127.0.0.1:5000/get_engines";
  let goodEngines: Engine[] = [];

  try {
    // Fetch the engines from the server
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse the response data
    const data = await response.text();
    const engines = JSON.parse(data)["data"];

    // Process each engine
    if (engines.length > 0) {
      engines.forEach((engine: any) => {
        // Convert vvl and vvt to boolean
        if (engine.vvl === "0") {
          engine.vvl = false;
        } else {
          engine.vvl = true;
        }
        if (engine.vvt === "0") {
          engine.vvt = false;
        } else {
          engine.vvt = true;
        }
        // Check if the engine data is valid
        if (!isEngine(engine)) {
          throw new Error("Invalid engine data received");
        } else {
          goodEngines.push(engine);
        }
      });
    }
  } catch (error) {
    console.error("There was an error:", error);
  }

  return goodEngines;
}

// Function to add a new engine to the server
export async function addEngine(engine: Engine) {
  const url = `http://127.0.0.1:5000/add_engine`;
  const data = JSON.stringify(engine);

  try {
    // Send the engine data to the server
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    // Check if the response is not ok
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Process the response data
    const returnData = await response.json();
    console.log(returnData); // Process the response data here
  } catch (error) {
    console.error("There was an error:", error);
  }
}