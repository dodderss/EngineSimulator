import { Store } from "@tauri-apps/plugin-store";

export interface User {
  username: string;
  hash: string;
  id: number;
}

export const DummyUser: User = {
  username: "",
  hash: "",
  id: -1,
};

const hash = (password: string) => {
  let hash = 5381;
  for (let i = 0; i < password.length; i++) {
    hash = (hash * 33) ^ password.charCodeAt(i);
  }
  return (hash >>> 0).toString();
};

const checkPassword = (password: string, providedHash: string) => {
  return hash(password) === providedHash;
};

export default class UserSystem {
  public static user: User = DummyUser;
  private static store = new Store("users.bin");

  static async login(username: string, password: string): Promise<boolean> {
    const value = await this.store.get("users");
    const users = value as User[];
    for (const user of users) {
      if (user.username === username) {
        console.log(user.hash);
        if (checkPassword(password, user.hash)) {
          this.user = user;
          return true;
        } else {
          return false;
        }
      }
    }
    return false;
  }

  static async logout() {
    UserSystem.user = DummyUser;
  }

  static async register(username: string, password: string) {
    const value = await this.store.get("users");
    let users = value as User[];
    let length = 0;
    if (users) {
      length = users.length;
      if (users.find((user) => user.username === username)) {
        return false;
      }
    } else {
      users = [];
    }
    const newUser: User = {
      username: username,
      hash: hash(password),
      id: length,
    };
    users.push(newUser);
    await this.store.set("users", users);
    this.user = newUser;
    return true;
  }
}
