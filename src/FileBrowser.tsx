import React, { useEffect, useState } from "react";
import {ListofFiles} from "components/FetchListofFiles";
import {fileFetch} from "services/useFileFetch";
//import {fetchData} from "services/useDataFetch";
import {PdfViewer} from "./components/PdfViewer";
import {PdfReader} from "./components/PdfViewer";
import "./index.css";
// Required for react-pdf

function FileBrowser() {

  const [selectedFile, setSelectedFile] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);


  // PDF page control

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 2. Define the toggle function
  const filesPerPage = 8;

   useEffect(() => {
    fileFetch(setFiles, setError, setLoading)();
  }, []);
  useEffect(() => {
  console.log("mounted");
  return () => {
    console.log("unmounted");
  };
}, []);
const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // File pagination

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.max(1, Math.ceil(files.length / filesPerPage));

  return (

<div className="grid grid-rows-[45px_1fr] h-screen">
  <div className="h-16 w-full">
    <nav className="flex items-center justify-between p-4 shadow-lg">
      <div className="font-bold text-xl px-12">MY DOCUMENTS</div>
      <div className="space-x-4 -translate-x-8">

        <a href="#" className="hover:text-orange-400" onClick={() => setSelectedFile(null)}>Home</a>
        <a href="#" className="hover:text-orange-400" onClick={toggleSidebar}>Engineering</a>
        <a href="#" className="hover:text-orange-400">Research</a>
        <a href="#" className="hover:text-orange-400">About</a>
        <a href="#" className="hover:text-orange-400">Contact</a>
      </div>
    </nav>
  </div>

    <div className=" p-4">
        <div  className="h-full flex items-center justify-center">
            <div className={`layout-grid  ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
                <ListofFiles  currentPage={currentPage} totalPages={totalPages}
                currentFiles={currentFiles} onPageForwardUpdate={() => setCurrentPage((p) => p + 1)}
                onPageBackwardUpdate={() => setCurrentPage((p) => p - 1)}
                loading={loading} error={error} onSelectUpdate={setSelectedFile}
                selectedFile={selectedFile}
                toggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                />
                <PdfViewer selectedFile={selectedFile} />
            </div>
        </div>
    </div>

</div>
      )

}

export default FileBrowser;