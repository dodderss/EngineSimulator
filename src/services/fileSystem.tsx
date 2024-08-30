import { create, BaseDirectory, open, readTextFile } from "@tauri-apps/plugin-fs";
import { save } from '@tauri-apps/plugin-dialog';
import { open as openDialogue } from '@tauri-apps/plugin-dialog';
import { read } from "fs";

export async function createFile(contents: string) {
  const path = await save({
    filters: [
      {
        name: 'My Filter',
        extensions: ['engine'],
      },
    ],
  }).then(async (value) => {
    const file = create(value!, { baseDir: BaseDirectory.AppLocalData });
    (await file).write(new TextEncoder().encode(contents));
    (await file).close();
  })
  
}

export async function writeFile(path: string, contents: string) {
    const file = await open(path, {
        write: true,
        baseDir: BaseDirectory.AppLocalData,
      });
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
    name: "Open File",
    filters: [
      {
        name: 'My Filter',
        extensions: ['engine'],
      },
    ],
  });
  const test = result as unknown as OpenDialogueResult;
  console.log(await readFile(test.path));
  return await readFile(test.path)
}