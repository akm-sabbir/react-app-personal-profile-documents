    import {Button} from 'components/Button';
    import React, { useEffect, useState, useRef } from "react";
    import { createPortal } from "react-dom";

//////////////////////////////////////////////////

function Tooltip({  text, position = "top", onClick }) {
  const [rect, setRect] = useState(null);
  const ref = useRef(null);
  const lastdot = text.lastIndexOf(".");
  function show() {
    setRect(ref.current.getBoundingClientRect());
  }

  function hide() {
    setRect(null);
  }

  const tooltipStyle = rect ? {
    position: "fixed",
    left:     (rect.left + rect.width) / 2 + rect.left*2,
    top:      position === "top"
                ? rect.top  - 12
                : rect.bottom + 12,
    transform: position === "top"
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
    background:    "#1e1b4b",
    color:         "#fff",
    fontSize:      13,
    padding:       "7px 13px",
    borderRadius:  8,
    whiteSpace:    "nowrap",
    pointerEvents: "none",
    zIndex:        9999,
    overflow:      "hidden",
    animation:     "revealLTR 0.4s cubic-bezier(0.4,0,0.2,1) forwards",
  } : null;

  return (
    <>
      <div
        ref={ref}
        className={"text-left bg-green-500 rounded-lg hover:bg-blue-600 \
                            hover:text-white"}
        style={{  width:"220px", maxWidth: "220px",overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap",padding: "8px 12px",cursor:"pointer"}}
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={onClick}
      >
        {text}
      </div>

      {/* ✅ Injected directly into body — no parent clips it */}
      {rect && createPortal(
        <div style={tooltipStyle}>{text.slice(0, lastdot)}</div>,
        document.body
      )}
    </>
  );
}

///////////////////////////////////////////////////

function TruncatedButton({ label, onClick }) {
  const [visible, setVisible] = useState(false);
  const lastdot = label.lastIndexOf(".");
  return (
    <div
      style={{ position: "relative", display: "inline-block", maxWidth: 140,overflow: "visible" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Button with truncated text */}
      <button
        className={"w-[220px] text-left bg-orange-100 rounded-lg hover:bg-blue-600 hover:text-white"}
        onClick={onClick}
        style={{
            overflow: "hidden",
          textOverflow: "ellipsis",   // ← shows "..."
          whiteSpace: "nowrap",       // ← keeps text on one line
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        {label}
      </button>

      {/* Tooltip with full text */}
      {visible && (
        <div style={{
          position: "absolute",
          bottom: "calc(100% + 8px)",
          left: "50%",
          whiteSpace: "nowrap",
          transform: "translateX(-30%)",
          background: "#1e1b4b",
          color: "#fff",
          fontSize: 12,
          padding: "6px 12px",
          borderRadius: 6,
          whiteSpace: "nowrap",
          zIndex: 999,
          pointerEvents: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}>
          {label.slice(0, lastdot)}
          <div style={{
            position: "absolute",
            top: "100%", left: "50%",
            transform: "translateX(-50%)",
            border: "5px solid transparent",
            borderTopColor: "#1e1b4b",
          }} />
        </div>
      )}
    </div>
  );
}


    export const ListofFiles = ({currentPage, totalPages, currentFiles, onPageForwardUpdate,
        onPageBackwardUpdate,loading, error,
        onSelectUpdate, selectedFile, toggleSidebar, toggleSideButtonLoc, isSidebarOpen}) => {

        const inlineStyle = { top: `${toggleSideButtonLoc}px` };
            return (
            <div className="1fr shadow sidebar-content">
            <div className="border rounded-2xl border-orange-300 sidebar-inner-wrapper">
        <div className="p-2">
       <h2 className="w-[220px] text-2xl font-semibold mb-2 text-center justify-center
         border-4 border-dashed border-orange-300 rounded-lg text-green-500"> Documents</h2>

     {(loading || error) ? (<div><p className="text-red-500 text-lg mb-2">{error}</p></div>):
        ( <React.Fragment>
            <div className="space-y-2">
            {currentFiles.map((file) => (
            <div key={file.id} className="list-none space-y-2">{/*file.url*/}
            {/*<SidebarItem fullName={file.name} onClick={() => onSelectUpdate(file.name)}
                 file={file} selectedFile={selectedFile} /> */}
             {/* <button
                type="button"
                className={`w-[200px] truncate overflow-hidden whitespace-nowrap text-left p-2 rounded border transition
                    ${selectedFile === file
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-green-500 border-transparent"
                }`}
                onClick={() => onSelectUpdate(file.name)}>
                {file.name}
              </button>
              <TruncatedButton  label={file.name}
                    onClick={() => onSelectUpdate(file.name)}/>*/}
                    <Tooltip text={file.name} position="top" onClick={() => onSelectUpdate(file.name)}>
                        <button  style={{width:"100%", display:"block"
                        }}  >
                            {file.name}
                      </button>
                    </Tooltip>
            </div>
          ))}

         </div>

        {/* File Pagination */}
       <div className="flex justify-between mt-4">
        <Button value={"Prev"} className={"text-blue-600 px-3 py-1 border border-orange-300 rounded \
             disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
        onClick={onPageBackwardUpdate} disabledCond={currentPage === 1 }/>

          <span className="text-sm">
            Page  {currentPage} of {totalPages}
          </span>

          <Button
            value={ "Next"} className={"text-blue-600 px-3 py-1 border border-orange-300 rounded \
                disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
            onClick={onPageForwardUpdate} disabledCond={currentPage === totalPages}/>

        </div>

        </React.Fragment>
        )
     }
        </div>
        </div>
        <button
        onClick={toggleSidebar}
        style = {inlineStyle}
            className="absolute -right-2 text-green-600 z-50 flex h-8 w-4 items-center justify-center h-15 border \
            bg-white shadow-md hover:bg-gray-50"
        >   {isSidebarOpen ? '◀' : '▶'}
        </button>
       </div>
      );
    }
