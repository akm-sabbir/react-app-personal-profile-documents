// MainComponent.jsx
import React from 'react';
import { buttonDict } from './buttonStyles'; // Import your dictionary object

export default function MainComponent() {
  const isPrimaryButton = true;
  const isButtonDisabled = false;

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* 1. Using a static dictionary variant */}
      <button className={buttonDict.primary}>
        Static Primary Button
      </button>

      <button className={buttonDict.secondary}>
        Static Secondary Button
      </button>

      {/* 2. Using the dynamic dictionary function */}
      <button
        className={buttonDict.getDynamicStyle({ isPrimary: isPrimaryButton, isDisabled: isButtonDisabled })}
        disabled={isButtonDisabled}
      >
        Dynamic Button
      </button>
    </div>
  );
}
