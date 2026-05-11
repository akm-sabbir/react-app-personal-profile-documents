    import {Button} from 'components/Button';
    import React, { useEffect, useState } from "react";

function TruncatedButton({ label, onClick }) {
  const [visible, setVisible] = useState(false);
  const lastdot = label.lastIndexOf(".");
  return (
    <div
      style={{ position: "relative", display: "inline-block", maxWidth: 140 }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {/* Button with truncated text */}
      <button
        className={"w-[200px] text-left bg-orange-100 rounded-lg hover:bg-blue-600 hover:text-white"}
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
        onSelectUpdate, selectedFile, toggleSidebar, isSidebarOpen}) => {

            return (
            <div className="1fr shadow sidebar-content">
            <div className="border rounded-2xl border-orange-300 sidebar-inner-wrapper">
        <div className="p-4">
       <h2 className="w-[200px] text-2xl font-semibold mb-2 text-center justify-center
         border-4 border-dashed border-orange-300 rounded-lg text-green-500"> Documents</h2>

     {(loading || error) ? (<div><p className="text-red-500 text-lg mb-2">{error}</p></div>):
        ( <React.Fragment>
            <div className="space-y-2">
          {currentFiles.map((file) => (
            <div key={file.url} className="list-none space-y-2">
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
              </button>*/}
              <TruncatedButton  label={file.name}
                    onClick={() => onSelectUpdate(file.name)}/>
            </div>
          ))}
         </div>

        {/* File Pagination */}
       <div className="flex justify-between mt-4">
        <Button value={"Prev"} className={"px-3 py-1 border border-orange-300 rounded \
             disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
        onClick={onPageBackwardUpdate} disabledCond={currentPage === 1 }/>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            value={ "Next"} className={"px-3 py-1 border border-orange-300 rounded \
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
            className="absolute top-60 -right-2 z-50 flex h-8 w-6 items-center justify-center h-15 border \
            bg-white shadow-md hover:bg-gray-50"
        >   {isSidebarOpen ? '◀' : '▶'}
        </button>
       </div>
      );
    }
