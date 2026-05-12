import React, { useState, useRef, useEffect } from 'react';

export const EditableTextBox = ({number, setPageNumber, numPage}) => {
    const [isEditing, setIsEditing] = useState(false);
    //const [page, setPage] = useState(1);

    const [inputValue, setInputValue] = useState(number.toString()); // Text state for the box
    const handleOnChange = (e) =>{
              setInputValue(e.target.value);
             const value = e.target.value;
            // 2. Only update if it's a valid integer
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
                if (numValue <= numPage && numValue > 0) {
                     setInputValue(value);
                } else if (numValue > numPage) {
                    // Optional: Automatically set to max if they type a higher number
                    setInputValue(numPage.toString());
                }
            }
              };
    const handleBlur = () => {
        setIsEditing(false);
        // If empty or invalid on exit, revert to the last valid page
        if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
            setInputValue(number.toString());
        } else {
         setPageNumber(parseInt(inputValue, 10));
        }
    };

  return (
    <div style={{ padding: '20px' }}>
      {isEditing ? (
        <input
          autoFocus
          type="number"
          inputMode="numeric" // Mobile numeric keyboard
          min="1"
          value={inputValue}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleBlur()}
          style={{
            width: '45px', // Fixed small width
            padding: '4px',
            textAlign: 'center', // Centers the page number
            fontSize: '16px'
          }}
        />
      ) : (
        <div onClick={() => {
              setInputValue(number.toString());
              setIsEditing(true);}}
          style={{
            cursor: 'pointer',
            fontSize: '18px',
            borderBottom: '1px dashed #ccc', // Visual cue it's editable
            display: 'inline-block',
            minWidth: '20px',
            textAlign: 'center'
          }}
        >
          {number}
        </div>
      )}
    </div>
  );
};
//export default EditableTextBox;
