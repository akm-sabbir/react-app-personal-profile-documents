import React, { useState } from 'react';
import { Document, Page, Outline, pdfjs } from 'react-pdf';
import { WorkerMessageHandler } from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs";
import { useEffect, useRef } from "react";
// Core layout CSS styles
import '../styles/PdfLayout.css';

// Ensure worker matches package version
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  WorkerMessageHandler,
  import.meta.url
).toString();

export const PdfViewerwithSidebar = ({selectedFile, selectedSemester, selectedCode, supabase, category}) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');
  const repository = "academic-resources";
  const root = "pdf-files";
    useEffect(() => {
    // Generate the public CDN link using your initialized client
        console.log("URL: ", `${root}/${selectedSemester}/${selectedCode}/${category}/${selectedFile}`);
        const { data } = supabase
                        .storage
                        .from(repository)
                        .getPublicUrl(`${root}/${selectedSemester}/${selectedCode}/${category}/${selectedFile}`);
        console.log("Public URL: ", data.publicUrl);
        if (data?.publicUrl) {
             setPdfUrl(data.publicUrl);
        }
    }, [selectedFile]);
  // Fired when an internal PDF bookmark is clicked
  function handleOutlineClick({ pageNumber }) {
    if (pageNumber) setPageNumber(pageNumber);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (selectedFile !== null ?
    (<div className="pdf-app-container">
      {/* 1. SIDEBAR PANEL */}
      <aside className={`pdf-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>Table of Contents</h3>
          <button className="toggle-btn" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        <div className="sidebar-content">
          <Document
            file={pdfUrl}
            onLoadError={(err) => console.error("Sidebar load fail:", err)}
          >
            {/* Renders the internal PDF bookmarks natively */}
            <Outline onItemClick={handleOutlineClick} className="pdf-outline-tree" />
          </Document>
        </div>
      </aside>

      {/* 2. MAIN VIEWER CONTENT */}
      <main className="pdf-main-viewer">
        <header className="viewer-toolbar">
          {!sidebarOpen && (
            <button className="toolbar-btn" onClick={() => setSidebarOpen(true)}>
              ☰ Show Outline
            </button>
          )}
          <div className="pagination-controls">
            <button disabled={pageNumber <= 1} onClick={() => setPageNumber(p => p - 1)}>Prev</button>
            <span>Page {pageNumber} of {numPages || '...'}</span>
            <button disabled={pageNumber >= numPages} onClick={() => setPageNumber(p => p + 1)}>Next</button>
          </div>
        </header>

        <div className="document-scroll-viewport">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="status-msg">Streaming document content...</div>}
            error={<div className="status-msg error">Invalid or missing PDF data.</div>}
          >
            <Page
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={true}
              width={750}
            />
          </Document>
        </div>
      </main>
    </div>):(<><div className="flex justify-center items-center h-200" >
                <p className="items-center  text-7xl text-blue-600">
                Select a Document from Document List to View</p></div></>)
  );
}
