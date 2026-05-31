import {navData, resources} from '../constants/resourcesData';
import {courseStyles, resourceStyles} from '../styles/componentStyles';
import FileBrowser from '../FileBrowser';
import React from 'react';
import { useState, useEffect, useRef } from "react";
import globalCache from '../utils/cacheSystem.js';
import {fetchFileCountFromBucket} from "../services/fetchFileCountfromSupabaseBucket.js";
/// ResourceGrid

function ResourceGrid({ course, onSelect,  program, fileCountDict}) {
    const basePath = 'pdf-files';
    if (!fileCountDict){
        console.log("Counting dictionary is null");
        return;
        }
  return (
    <div>
      <div className={courseStyles.courseHeader}>
        <span className={courseStyles.courseCode}>{course.code}</span>
        <span className={courseStyles.courseSem}>{course.semLabel}</span>
      </div>
      <h2 className={courseStyles.courseTitle}>{course.name}</h2>
      <p className={courseStyles.courseSub}>Select a resource type below</p>
      <div className={resourceStyles.resourceGrid}>
        {resources.map((r) => (
          <button
            key={r.key}
            className={resourceStyles.resourceCard}
            onClick={() => onSelect(r, program)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#534AB7")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e0e0")}
          >
            <span className={resourceStyles.resourceIcon}>{r.icon}</span>
            <span className={resourceStyles.resourceLabel}>{r.label}</span>
            <span className={resourceStyles.resourceCount}>
                {Object.hasOwn(fileCountDict,r.key)?fileCountDict[r.key]:0 } items</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Content Area ──────────────────────────────────────────────────────────
export function ContentArea({ selected, supabase }) {
    const [loading, setLoading] = useState(false);
    const [fileCountDict, setFileCountDict] = useState(null);
     useEffect(() => {
        if (selected.course){
            fetchFileCountFromBucket(selected.course, setLoading, setFileCountDict);
        }

  }, [selected]);
  if (!selected.course) {
    return (
      <div style={styles.placeholder}>
        <span style={{ fontSize: 32 }}>🎓</span>
        <p style={styles.placeholderText} className="text-6xl" >
          Wellcome to Sabbir's Portfolio
        </p>
      </div>
    );
  }

  if (!selected.resource) {
    return (<>
        {loading ? (
          <div className="flex p-2">

                <button className="flex justify-start item-center gap-2 rounded bg-blue-600 \
                    px-2 py-2 font-bold text-white opacity-80 w-full" disabled>


                    <svg className="h-5 w-10 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2
                        5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                </button>
          </div>) :<ResourceGrid
                    course={selected.course}
                    onSelect={selected.onResourceSelect}
                    program = {selected.program}
                    fileCountDict={fileCountDict}/>
        }
      </>
    );
  }

   if (selected.course.category.toLowerCase() === selected.resource.key.toLowerCase()){
        return (<React.Fragment><FileBrowser course={selected.course} supabase={supabase}/> </React.Fragment>) ;
        }
    console.log("selected Resource key", selected.resource.key, selected.course.code);
  return ( <div>


     ( <><div className={courseStyles.courseHeader}>
        <span className={courseStyles.courseCode}>{selected.course.code}</span>
        <span className={courseStyles.courseSem}>{selected.course.semLabel}</span>
       </div>
       <h2 className={courseStyles.courseTitle}>{selected.resource.label}</h2>
       <p className={courseStyles.courseSub}>
        {selected.course.name} · {selected.resource.count} items
       </p>
      <div style={styles.placeholder}>
        <span style={{ fontSize: 32 }}>{selected.resource.icon}</span>
        <p style={styles.placeholderText}>
          {selected.resource.label} content for{" "}
          <strong>{selected.course.name}</strong>
        </p>
      </div> </>)

    </div>);

}

const styles = {

    placeholder: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: "40px 0",
        color: "#aaa",
    },
    placeholderText: {  color: "#999", textAlign: "center" },
}