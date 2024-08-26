import { create, BaseDirectory, open } from "@tauri-apps/plugin-fs";
import { save } from '@tauri-apps/plugin-dialog';

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
  const file = await open(path, {
    read: true,
    baseDir: BaseDirectory.AppLocalData,
  });
  const buf = new Uint8Array();
  await file.read(buf);
  const textContents = new TextDecoder().decode(buf);
  await file.close();
  return textContents;
}