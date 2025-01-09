import { Engine } from "./globals";

export default class UndoRedo {
  private stack: any[] = [];
  private redoStack: any[] = [];
  private currentIndex: number = 0;

  // Method to push a new item onto the stack
  push(item: any): void {
    this.stack = this.stack.slice(0, this.currentIndex + 1);
    this.stack.push(item);
    this.redoStack = [];
    this.currentIndex++;
  }

  // Method to peek at the current item on the stack
  peek(): any | null {
    if (this.currentIndex === -1) {
      return null;
    }
    return this.stack[this.currentIndex];
  }

  // Method to undo the last action
  undo(): Engine | null {
    if (this.currentIndex > 0) {
      const currentState = this.stack[this.currentIndex];
      this.redoStack.push(currentState); 
      this.currentIndex--; 
      return this.stack[this.currentIndex];
    }
    return null;
  }

  // Method to redo the last undone action
  redo(): Engine | null {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      if (nextState) {
        this.currentIndex++;
        this.stack[this.currentIndex] = nextState;
        return nextState;
      }
    }
    return null;
  }
}