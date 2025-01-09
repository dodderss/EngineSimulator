import { Store } from "@tauri-apps/plugin-store";

// Define the User interface
export interface User {
  username: string;
  hash: string;
  id: number;
}

// Define a dummy user object
export const DummyUser: User = {
  username: "",
  hash: "",
  id: -1,
};

// Function to hash a password
const hash = (password: string) => {
  let hash = 5381;
  for (let i = 0; i < password.length; i++) {
    hash = (hash * 33) ^ password.charCodeAt(i);
  }
  return (hash >>> 0).toString();
};

// Function to check if a password matches a provided hash
const checkPassword = (password: string, providedHash: string) => {
  return hash(password) === providedHash;
};

// UserSystem class to handle user operations
export default class UserSystem {
  // Static property to hold the current user
  public static user: User = DummyUser;
  // Static property to hold the store instance
  private static store = new Store("users.bin");

  // Static method to login a user
  static async login(username: string, password: string): Promise<boolean> {
    // Get the users from the store
    const value = await this.store.get("users");
    const users = value as User[];
    // Iterate through the users to find a match
    for (const user of users) {
      if (user.username === username) {
        console.log(user.hash);
        // Check if the password matches
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

  // Static method to logout the current user
  static async logout() {
    UserSystem.user = DummyUser;
  }

  // Static method to register a new user
  static async register(username: string, password: string) {
    // Get the users from the store
    const value = await this.store.get("users");
    let users = value as User[];
    let length = 0;
    // Check if users exist and if the username is already taken
    if (users) {
      length = users.length;
      if (users.find((user) => user.username === username)) {
        return false;
      }
    } else {
      users = [];
    }
    // Create a new user object
    const newUser: User = {
      username: username,
      hash: hash(password),
      id: length,
    };
    // Add the new user to the users array and update the store
    users.push(newUser);
    await this.store.set("users", users);
    this.user = newUser;
    return true;
  }
}