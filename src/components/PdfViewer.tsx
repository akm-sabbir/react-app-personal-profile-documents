import {Button} from 'components/Button';
import React from 'react';
import { Document, Page, pdfjs, Outline} from "react-pdf";
import "../index.css";
import {useMemo} from 'react';
import { useEffect, useRef } from "react";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { WorkerMessageHandler } from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import React, { useEffect, useState } from "react";
import '../styles/PdfLayout.css';
import {EditableTextBox} from "components/EditableTextBox";
import { StyleSheet } from '@react-pdf/renderer';
import path from 'path';
//import { PDFViewer, Page, View, Text, StyleSheet, Document } from '@react-pdf/renderer';
// This tells PDF.js to use the local worker file from your public folder or node_modules


//pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
//pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
//pdfjs.GlobalWorkerOptions.workerSrc =
  //`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  WorkerMessageHandler,
  import.meta.url
).toString();


export  const PdfViewer = ({selectedFile, selectedSemester, selectedCode, supabase, category}) =>
{
  const [numPages, setNumPages] = useState(null);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [scale, setScale] = useState(1.0); // 1.0 = 100
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));  // Max zoom 300%
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.4));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');
  const repository = "academic-resources";
  const root = "pdf-files";
  useEffect(() => {
    // Generate the public CDN link using your initialized client
    console.log("PdfViewer URL: ", `${root}/${selectedSemester}/${selectedCode}/${category}/${selectedFile}`);
    const { data } = supabase
      .storage
      .from(repository)
      .getPublicUrl(`${root}/${selectedSemester}/${selectedCode}/${category}/${selectedFile}`);

    if (data?.publicUrl) {
      setPdfUrl(data.publicUrl);
    }
  }, [selectedFile]);
    console.log("public url for pdf file,", pdfUrl);

const pdfAppContainer = {
  display: 'flex',
  //width: '100vw',
  alignItems: 'center',
  height: '100vh',
  //overflow: 'hidden',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  backgroundColor: '#f8f9fa'
};

const viewerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center', // Horizontal centering
  justifyContent: 'center', // Vertical centering
  minHeight: '130vh',
  backgroundColor: '#525659', // Dark grey typical of PDF viewers
};
const zoomerStyles = {
  display: 'flex',
  flexDirection: 'row',
  verticalAlign: 'top',
  alignItems: 'center', // Horizontal centering
  justifyContent: 'center', //
  };
  const btnStyle = {
  width: '35px',
  height: '35px',
  borderRadius: '100%',
  border: '1px solid #ccc',
  borderColor: 'orange',
  cursor: 'pointer',
  margin: '0 5px'
};

const containerStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  whiteSpace: 'nowrap' // Prevents the text and box from wrapping to the next line
};
    const REMOTE_FILE_FETCH = "https://backendresourceverceldeployment.vercel.app/api/files/"
    const LOCAL_FILE_FETCH = "http://localhost:5000/api/api/"
    const baseUrl = "http://localhost:5000/api/resources/files";
    const previewUrl = `${baseUrl}?semester=${encodeURIComponent(selectedSemester)}&course_name=
                    ${encodeURIComponent(selectedCode)}&file_name=${encodeURIComponent(selectedFile)}`;
    console.log("Selected File: ", selectedFile);
    console.log("Selected Semester: ", selectedSemester);
    console.log("Selected Code: ", selectedCode);
    console.log("URL: ", previewUrl);

const pdfstyles = StyleSheet.create({
  page: {
    position: 'relative', // Sets the boundary for absolute children
    backgroundColor: '#ffffff',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f0f4f8', // Your background color
    zIndex: -1, // Pushes it behind your text content
  },
  content: {
    padding: 30, // Safely pad your text without shrinking the background
  }
});

const topStyles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
    height: '56px',
    padding: '0 16px',
    boxSizing: 'border-box'
  },
  leftGroup: {
    display: 'flex',
    gap: '12px'
  },
  centerItem: {
      display: 'inline-flex',
      verticalAlign: 'top',
    alignItems: 'center',
    whiteSpace: 'nowrap',
  },
  rightGroup:{
      marginLeft: "auto"
      }
};

 function handleOutlineClick({ pageNumber }) {
    if (pageNumber) setCurrentPdfPage(pageNumber);
  }
    return (
        <div className="main-content 4fr border rounded-2xl border-orange-300 p-2 shadow overflow-auto">

        {selectedFile !== null ? (

        <React.Fragment>
          <div style={pdfAppContainer} >{/*{viewerStyles}>*/}
                <aside className={`pdf-sidebar min-w-[280px] ${sidebarOpen ? 'open' : 'closed'}`}>
                    <div className="pdf-sidebar-header">
                        <h3>Table of Contents</h3>
                        <button className="toggle-btn" onClick={() => setSidebarOpen(false)}>☰</button>
                    </div>

                    <div className="sidebar-content_pdf">
                        <Document
                            file={pdfUrl}
                            onLoadError={(err) => console.error("Sidebar load fail:", err)}
                        >
                            {/* Renders the internal PDF bookmarks natively */}
                            <Outline onItemClick={handleOutlineClick} className="pdf-outline-tree" />
                        </Document>
                    </div>
                </aside>
        <main className="pdf-main-viewer">
                <header className="viewer-toolbar">
                    {!sidebarOpen && (
                            <button className="toolbar-btn min-w-[150px]  self-center" onClick={() => setSidebarOpen(true)}>
                               ▶ Show Outline
                            </button>
                        )}

                  <div className="pagination-controls grid grid-cols-3 items-center justify-center w-full" >
                        <button  className="justify-self-start"
                        disabled={currentPdfPage <= 1} onClick={() => setCurrentPdfPage(p => p - 1)}>Prev</button>

                                    <span  style= {topStyles.centerItem} className="text-blue-600 justify-self-center">

                Page <EditableTextBox number={currentPdfPage} setPageNumber={setCurrentPdfPage} numPage={numPages} />
                of {numPages || 1}
              </span>

                        <button  className="justify-self-end" disabled={currentPdfPage >= numPages} onClick={() => setCurrentPdfPage(p => p + 1)}>Next</button>
                </div>

                </header>
            <div className="document-scroll-viewport  overflow-y-auto">
            <Document
              file= {pdfUrl}//{`${previewUrl}`} //{`${LOCAL_FILE_FETCH}${selectedFile}`}
              onLoadSuccess={( {numPages} ) => {
                            setNumPages(numPages);
                            setCurrentPdfPage(1);
              }}
              loading={<div className="status-msg">Streaming document content...</div>}
              error={<div className="status-msg error">Invalid or missing PDF data.</div>}
              onLoadError={(error) => {
                        console.log("PDF Load Error:", error);
              }}
              error={<p className="text-red-500">Failed to load PDF</p>}
              >
               <div className="flex flex-row gap-4 w-max">
                    <Page pageNumber={currentPdfPage}  scale={scale} size="A4" style={pdfstyles.page} renderAnnotationLayer={false}
                    renderTextLayer={true} />
               </div>
            </Document>
            </div>
            </main>
            </div>
            {/* PDF Pagination */}
            <div className="flex justify-between mt-4">
              <Button
                value={"Prev"} className={"text-blue-600 px-3 py-1 h-8 border border border-orange-300 rounded \
                    disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
                onClick={() => setCurrentPdfPage((p) => p - 1)} disabledCond={currentPdfPage <= 1}
              />

               <div style={zoomerStyles} >
                <button onClick={zoomOut} style={btnStyle} className="text-blue-600 hover:bg-orange-300 \
                hover:border-transparent" > - </button>
                <span style={{ margin: '0 15px' }} className="text-blue-600">{Math.round(scale * 100)}%</span>
                <button onClick={zoomIn} style={btnStyle} className="text-blue-600 hover:bg-orange-300 \
                hover:border-transparent" > + </button>
                </div>
               {/*
              <span className="text-sm" style= {containerStyle} className="text-blue-600">
                Page <EditableTextBox number={currentPdfPage} setPageNumber={setCurrentPdfPage} numPage={numPages} />
                of {numPages || 1}
              </span>
                */}
              <Button
                value={"Next"} className={"px-3 text-blue-600 py-1 h-8 border border border-orange-300 rounded \
                    disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
                onClick={() => setCurrentPdfPage((p) => p + 1)} disabledCond={currentPdfPage >= numPages}
              />

            </div>

            </React.Fragment>

            ) : (<><div className="flex justify-center items-center h-200" >
                <p className="items-center  text-7xl text-blue-600">
                Select a Document from Document List to View</p></div></>)
        }

        </div>
     );
 }

 const PdfReader = ({ selectedFile }: Props) => {
  if (!selectedFile) {
    return ( <div className="p-4">Select a PDF</div>);
  }
/*
const url = useMemo(() => {
  return selectedFile ? `/pdf-files/${selectedFile}` : null;
}, [selectedFile]);*/
    //const pdfPath = `${import.meta.env.BASE_URL}/pdf-files/${selectedFile}`;

    const pdfPath = `http://localhost:5000/api/files/${selectedFile}`;
    console.log('Looking for PDF at:', pdfPath);
  //pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  WorkerMessageHandler,
  import.meta.url
).toString();
console.log("Selected file:", selectedFile);
console.log("Full path:", pdfPath);
  return (
    <div className="w-full h-[80vh] overflow-auto">
      <Document
         file={pdfPath}
         loading={<div>Loading PDF...</div>}
         onLoadError={(error) => {
                        console.log("PDF Load Error:", error);}}
          error={<p className="text-red-500">Failed to load PDF</p>}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
}