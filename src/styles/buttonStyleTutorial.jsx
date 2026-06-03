// buttonStyles.js
import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

// Base styles shared across all buttons
const baseButton = 'py-1.5 px-3 rounded font-medium transition-colors';

export const buttonDict = {
  // Static variants pre-processed with twMerge
  primary: twMerge(baseButton, 'bg-blue-500 text-white hover:bg-blue-600'),
  secondary: twMerge(baseButton, 'bg-gray-200 text-gray-800 hover:bg-gray-300'),

  // Dynamic variant that accepts component flags/props
  getDynamicStyle: ({ isPrimary, isDisabled }) => {
    return twMerge(
      baseButton,
      isPrimary ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800',
      isDisabled && 'cursor-not-allowed opacity-50'
    );
  }
};
