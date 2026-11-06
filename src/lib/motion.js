// Shared motion values. Curves match the CSS tokens in index.css.
export const EASE_OUT = [0.23, 1, 0.32, 1]
export const EASE_DRAWER = [0.32, 0.72, 0, 1]

// Decorative pointer-following: a spring gives the motion weight instead of
// snapping 1:1 to the cursor.
export const follow = { stiffness: 260, damping: 30, mass: 0.6 }
export const followLoose = { stiffness: 150, damping: 22, mass: 0.6 }

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
