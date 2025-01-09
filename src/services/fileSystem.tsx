import {
  create,
  BaseDirectory,
  open,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import { open as openDialogue } from "@tauri-apps/plugin-dialog";

// Function to create a file with the given contents and optional file name
export async function createFile(contents: string, fileName?: string) {
  try {
    // Open a save dialog to get the save path
    const savePath = await save({
      filters: [
        {
          name: "Engine Files",
          extensions: ["engine"],
        },
      ],
      defaultPath: fileName,
      title: "Save Engine File",
    });

    // Check if the save operation was cancelled
    if (savePath === null) {
      console.log("Save operation was cancelled.");
      return;
    }

    console.log(savePath);
    // Create the file at the specified path
    const file = await create(savePath, { baseDir: BaseDirectory.AppLocalData });
    // Write the contents to the file
    await file.write(new TextEncoder().encode(contents));
    // Close the file
    await file.close();
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

// Function to write contents to a file at the specified path
export async function writeFile(path: string, contents: string) {
  // Open the file for writing
  const file = await open(path, {
    write: true,
    baseDir: BaseDirectory.AppLocalData,
  });
  // Check if the file or path is invalid
  if (file === null || path === "") {
    return;
  }
  // Write the contents to the file
  await file.write(new TextEncoder().encode(contents));
  // Close the file
  await file.close();
}

// Function to read the contents of a file at the specified path
export async function readFile(path: string): Promise<string> {
  // Read the text contents of the file
  const file = await readTextFile(path, {
    baseDir: BaseDirectory.AppLocalData,
  });
  return file;
}

// Interface for the result of the open dialog
interface OpenDialogueResult {
  path: string;
  // Add other properties if needed
}

// Function to open a file using a dialog and read its contents
export async function openFile() {
  // Open a dialog to select a file
  const result = await openDialogue({
    title: "Open Engine File",
    filters: [
      {
        name: "My Filter",
        extensions: ["engine"],
      },
    ],
  });
  // Check if the open operation was cancelled
  if (result === null) {
    return "";
  }
  const test = result as unknown as OpenDialogueResult;

  // Read the contents of the selected file
  await readFile(test.path);
  return await readFile(test.path);
}