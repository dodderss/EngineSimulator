import { Engine } from "./globals";

export default class UndoRedo {
  private stack: any[] = [];
  private redoStack: any[] = [];
  private currentIndex: number = 0;

  push(item: any): void {
    this.stack = this.stack.slice(0, this.currentIndex + 1);
    this.stack.push(item);
    this.redoStack = [];
    this.currentIndex++;
    console.log(this.stack);
  }

  peek(): any | null {
    if (this.currentIndex === -1) {
      return null;
    }
    return this.stack[this.currentIndex];
  }

  undo(): Engine | null {
    console.log("undo", this.stack);
    if (this.currentIndex > 0) {
      const currentState = this.stack[this.currentIndex];
      console.log(currentState);
      this.redoStack.push(currentState); 
      this.currentIndex--; 
      console.log("undo", this.stack);
      return this.stack[this.currentIndex];
    }
    return null;
  }

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
