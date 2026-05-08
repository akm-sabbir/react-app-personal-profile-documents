    import {Button} from 'components/Button';
    import React from 'react';

    export const ListofFiles = ({currentPage, totalPages, currentFiles, onPageForwardUpdate,
        onPageBackwardUpdate,loading, error,
        onSelectUpdate, selectedFile}) =>(
            <div className="col-span-1 border rounded-2xl p-4 shadow">

            <h2 className="text-2xl font-semibold mb-2 text-center justify-center
             border-4 border-dashed border-orange-300 rounded-lg text-green-500"> Documents</h2>

        {loading && <p className="text-sm">Loading...</p>}

        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        <div className="space-y-2">
          {currentFiles.map((file) => (
            <div key={file.url} className="list-none space-y-2">
              <button
                type="button"
                className={`w-[200px] truncate overflow-hidden whitespace-nowrap text-left p-2 rounded border transition
                    ${selectedFile === file
                    ? "bg-blue-100 border-blue-400"
                    : "hover:bg-green-500 border-transparent"
                }`}
                onClick={() => onSelectUpdate(file.name)}>
                {file.name}
              </button>
            </div>
          ))}
        </div>

        {/* File Pagination */}
        <div className="flex justify-between mt-4">
        <Button value={"Prev"} className={"px-3 py-1 border rounded disabled:opacity-50"}
             onClick={onPageBackwardUpdate} disabledCond={currentPage === 1 }/>

          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            value={ "Next"} className={"px-3 py-1 border rounded disabled:opacity-50"}
            onClick={onPageForwardUpdate} disabledCond={currentPage === totalPages}/>

        </div>
        </div>
      );

