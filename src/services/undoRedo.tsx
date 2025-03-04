import { Engine } from "./globals";

// The UndoRedo class manages a stack for undo and redo operations.
export default class UndoRedo {
  // The main stack that holds the history of actions.
  private stack: any[] = [];
  
  // The stack that holds actions that can be redone after an undo.
  private redoStack: any[] = [];
  
  // The current index in the stack, indicating the position of the last action.
  private currentIndex: number = 0;

  // Method to push a new item onto the stack.
  // This represents a new action that has been performed.
  push(item: any): void {
    // Slice the stack to remove any items that are after the current index,
    // as they are no longer valid after a new action is pushed.
    this.stack = this.stack.slice(0, this.currentIndex + 1);
    
    // Add the new item to the stack.
    this.stack.push(item);
    
    // Clear the redo stack since a new action invalidates any redo history.
    this.redoStack = [];
    
    // Move the current index forward to point to the new top of the stack.
    this.currentIndex++;
  }

  // Method to peek at the current item on the stack without modifying it.
  // Returns the current state or null if there are no actions.
  peek(): any | null {
    // If the current index is -1, it means there are no actions to peek at.
    if (this.currentIndex === -1) {
      return null;
    }
    // Return the current item from the stack.
    return this.stack[this.currentIndex];
  }

  // Method to undo the last action.
  // Returns the state after the undo operation or null if no action can be undone.
  undo(): Engine | null {
    // Check if there is an action to undo (currentIndex must be greater than 0).
    if (this.currentIndex > 0) {
      // Get the current state before undoing.
      const currentState = this.stack[this.currentIndex];
      
      // Push the current state onto the redo stack for potential redoing later.
      this.redoStack.push(currentState);
      
      // Move the current index back to the previous state.
      this.currentIndex--;
      
      // Return the new current state after undoing.
      return this.stack[this.currentIndex];
    }
    // If no action can be undone, return null.
    return null;
  }

  // Method to redo the last undone action.
  // Returns the state after the redo operation or null if no action can be redone.
  redo(): Engine | null {
    // Check if there are any actions in the redo stack.
    if (this.redoStack.length > 0) {
      // Pop the next state from the redo stack.
      const nextState = this.redoStack.pop();
      
      // If there is a valid state to redo, proceed.
      if (nextState) {
        // Move the current index forward to reflect the redo.
        this.currentIndex++;
        
        // Update the stack with the next state at the current index.
        this.stack[this.currentIndex] = nextState;
        
        // Return the state after redoing.
        return nextState;
      }
    }
    // If no action can be redone, return null.
    return null;
  }
}
