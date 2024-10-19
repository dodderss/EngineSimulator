import { Engine, isEngine } from "./globals";
import { fetch } from "@tauri-apps/plugin-http";

export async function getEngines() {
  const url = "http://127.0.0.1:5000/get_engines";
  let goodEngines: Engine[] = [];

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    const engines = JSON.parse(data)["data"];

    if (engines.length > 0) {
      engines.forEach((engine: any) => {
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
        if (!isEngine(engine)) {
          console.log(engine);
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

export async function getEngineById(id: string) {
  const url = `http://127.0.0.1:5000/get_engine/${id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); // Process the response data here
  } catch (error) {
    console.error("There was an error:", error);
  }
}

export async function addEngine(engine: Engine) {
  const url = `http://127.0.0.1:5000/add_engine`;
  const data = JSON.stringify(engine);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const returnData = await response.json();
    console.log(returnData); // Process the response data here
  } catch (error) {
    console.error("There was an error:", error);
  }
}
