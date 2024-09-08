import {
  create,
  BaseDirectory,
  open,
  readTextFile,
} from "@tauri-apps/plugin-fs";
import { save } from "@tauri-apps/plugin-dialog";
import { open as openDialogue } from "@tauri-apps/plugin-dialog";

export async function createFile(contents: string, fileName?: string) {
  try {
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

    if (savePath === null) {
      console.log("Save operation was cancelled.");
      return;
    }

    console.log(savePath);
    const file = await create(savePath, { baseDir: BaseDirectory.AppLocalData });
    await file.write(new TextEncoder().encode(contents));
    await file.close();
  } catch (error) {
    console.error("Error creating file:", error);
  }
}

export async function writeFile(path: string, contents: string) {
  const file = await open(path, {
    write: true,
    baseDir: BaseDirectory.AppLocalData,

  });
  if (file === null || path === "") {
    return;
  }
  await file.write(new TextEncoder().encode(contents));
  await file.close();
}

export async function readFile(path: string): Promise<string> {
  const file = await readTextFile(path, {
    baseDir: BaseDirectory.AppLocalData,
  });
  return file;
}

interface OpenDialogueResult {
  path: string;
  // Add other properties if needed
}

export async function openFile() {
  const result = await openDialogue({
    title: "Open Engine File",
    filters: [
      {
        name: "My Filter",
        extensions: ["engine"],
      },
    ],
  });
  if (result === null) {
    return "";
  }
  const test = result as unknown as OpenDialogueResult;

  await readFile(test.path);
  return await readFile(test.path);
}
