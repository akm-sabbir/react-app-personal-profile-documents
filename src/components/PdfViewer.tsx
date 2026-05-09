import {Button} from 'components/Button';
import React from 'react';
import { Document, Page, pdfjs} from "react-pdf";
import "../index.css";
import {useMemo} from 'react';
import { useEffect, useRef } from "react";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import { WorkerMessageHandler } from "react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs";
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import React, { useEffect, useState } from "react";
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

export  const PdfViewer = ({selectedFile}) =>
{
  const [numPages, setNumPages] = useState(null);
  const [currentPdfPage, setCurrentPdfPage] = useState(1);
  const [scale, setScale] = useState(1.0); // 1.0 = 100
  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0));  // Max zoom 300%
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
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

    return (
        <div className="col-span-4 border rounded-2xl border-orange-300 p-4 shadow overflow-auto">

        {selectedFile ? (
            <React.Fragment>
            <div style={viewerStyles}>

            <Document
              file={`http://localhost:5000/api/files/${selectedFile}`}
              onLoadSuccess={( {numPages} ) => {
                            setNumPages(numPages);
                            setCurrentPdfPage(1);
              }}
              loading={<p>Loading PDF...</p>}
              onLoadError={(error) => {
                        console.log("PDF Load Error:", error);
              }}
              error={<p className="text-red-500">Failed to load PDF</p>}
              >
            <Page pageNumber={currentPdfPage}  scale={scale}/>
            </Document>
            </div>
            {/* PDF Pagination */}
            <div className="flex justify-between mt-4">
              <Button
                value={"Prev"} className={"px-3 py-1 border border border-orange-300 rounded \
                    disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
                onClick={() => setCurrentPdfPage((p) => p - 1)} disabledCond={currentPdfPage <= 1}
              />

              <span className="text-sm">
                Page {currentPdfPage} of {numPages || 1}
              </span>

              <Button
                value={"Next"} className={"px-3 py-1 border border border-orange-300 rounded \
                    disabled:opacity-50 hover:bg-orange-300 hover:border-transparent cursor-pointer"}
                onClick={() => setCurrentPdfPage((p) => p + 1)} disabledCond={currentPdfPage >= numPages}
              />

            </div>
             <div style={zoomerStyles} >
                <button onClick={zoomOut} style={btnStyle} className="hover:bg-orange-300 hover:border-transparent" > - </button>
                <span style={{ margin: '0 15px' }}>{Math.round(scale * 100)}%</span>
                <button onClick={zoomIn} style={btnStyle} className="hover:bg-orange-300 hover:border-transparent" > + </button>
            </div>
            </React.Fragment>
            ) : (<div className="flex justify-center items-center" ><p className=" items-center justify-center text-4xl">
                Select a PDF from Document to View</p> </div>)
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