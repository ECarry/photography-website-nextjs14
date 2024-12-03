import { create } from "zustand";

/**
 * Interface for the New Photo State
 * @interface NewPhotoState
 * @property {boolean} isOpen - Flag indicating if the new photo sheet is open
 * @property {function} onOpen - Function to open the new photo sheet
 * @property {function} onClose - Function to close the new photo sheet
 */
interface NewPhotoState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Initial state for the New Photo State
 * @constant
 * @type {Omit<NewPhotoState, "onOpen" | "onClose">}
 */
const initialState: Omit<NewPhotoState, "onOpen" | "onClose"> = {
  isOpen: false,
};

/**
 * Custom hook for managing new photo sheet state
 * Uses Zustand for state management
 *
 * @example
 * ```typescript
 * const { isOpen, onOpen, onClose } = useNewPhoto();
 *
 * // Open new photo sheet
 * onOpen();
 *
 * // Close new photo sheet
 * onClose();
 * ```
 */
export const useNewPhotoSheet = create<NewPhotoState>((set) => ({
  ...initialState,

  /**
   * Opens the new photo sheet
   */
  onOpen: () => set({ isOpen: true }),

  /**
   * Closes the new photo sheet
   */
  onClose: () => set({ ...initialState }),
}));

export default useNewPhotoSheet;
