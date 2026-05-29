import React, { useEffect, useState, useRef } from "react";
import {ListofFiles} from "components/FetchListofFiles";
import {fileFetch} from "services/useFileFetch";
import {fetchDataFromBucket} from "services/fetchDatafromSupabaseBucket";
import {PdfViewer} from "./components/PdfViewer";
import {PdfReader} from "./components/PdfViewer";
import "./index.css";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Required for react-pdf

function FileBrowser({course}) {

  const [selectedFile, setSelectedFile] = useState(null);


  const [currentPage, setCurrentPage] = useState(1);


  // PDF page control

  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [semester,setSemester] = useState(null);
  const [courseCode, setCourseCode] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filesPerPage, setFilesPerPage] = useState(8);
  const [toggleButtonLoc, setToggleButtonLoc] = useState(60);
  const containerRef = useRef(null);
  // 2. Define the toggle function

  useEffect(() => {
    //fileFetch(setFiles, setError, setLoading, course, setSemester, setCourseCode)();
   fetchDataFromBucket(supabase, course, setFiles, setLoading, setSemester, setCourseCode)();
  }, []);
  useEffect(() => {
    console.log("mounted");
    return () => {
        console.log("unmounted");
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Create an observer to track container size changes in real-time
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Get available vertical height of the container

        const containerHeight = entry.contentRect.height-200;
        setToggleButtonLoc(Math.floor((containerHeight +200)/2));
        console.log("container height", containerHeight);
        // Target height of a single item including padding/gaps (e.g., 40px)

        const itemHeight = containerHeight > 700? 45:40;
        console.log("item heights", itemHeight);
        // 2. Calculate max items that can fit mathematically
        const calculatedFit = Math.floor(containerHeight / itemHeight);

        // Prevent setting a negative number or zero if space is tight
        setFilesPerPage(Math.max(1, calculatedFit));
      }
    });

    resizeObserver.observe(container);

    return () => resizeObserver.disconnect(); // Clean up observer on unmount
  }, [files]);

const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  // File pagination

  const indexOfLastFile = currentPage * filesPerPage;
  const indexOfFirstFile = indexOfLastFile - filesPerPage;
  const currentFiles = files.slice(indexOfFirstFile, indexOfLastFile);
  const totalPages = Math.max(1, Math.ceil(files.length / filesPerPage));

  return (

<div className="grid grid-rows-[30px_1fr] h-screen">{/* 45px_*/}
  {/*<div className="h-16 w-full">
    <nav className="flex items-center justify-between p-4 shadow-lg">
      <div className="font-bold text-xl px-12">MY DOCUMENTS</div>
      <div className="space-x-4 -translate-x-8">

        <a href="#" className="hover:text-orange-400" onClick={() => setSelectedFile(null)}>Home</a>
        <a href="#" className="hover:text-orange-400">Engineering</a>
        <a href="#" className="hover:text-orange-400">Research</a>
        <a href="#" className="hover:text-orange-400">About</a>
        <a href="#"
         className="hover:text-orange-400"> Book Link </a>
        <a href="#" className="hover:text-orange-400">Contact</a>
      </div>
    </nav>
  </div>*/}

    <div className=" p-4">
        <div  className="flex items-center justify-center"> {/*h-full*/}
            <div ref={containerRef} className={`layout-grid  ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
                <ListofFiles  currentPage={currentPage} totalPages={totalPages}
                currentFiles={currentFiles} onPageForwardUpdate={() => setCurrentPage((p) => p + 1)}
                onPageBackwardUpdate={() => setCurrentPage((p) => p - 1)}
                loading={loading} error={error} onSelectUpdate={setSelectedFile}
                selectedFile={selectedFile}
                toggleSidebar={toggleSidebar}
                toggleSideButtonLoc = {toggleButtonLoc}
                isSidebarOpen={isSidebarOpen}
                />
                <PdfViewer selectedFile={selectedFile} selectedSemester={semester} selectedCode={courseCode} supabase={supabase}/>
            </div>
        </div>
    </div>

</div>
      )

}

export default FileBrowser;