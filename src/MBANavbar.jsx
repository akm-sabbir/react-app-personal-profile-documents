import { useState, useEffect, useRef } from "react";
import {navbarStyles, brandStyles, breadcrumbStyles} from "./styles/componentStyles";
import {SemesterDropdown} from './components/SemesterDropdown';
import {navData, resources} from './constants/resourcesData';
import {ContentArea} from './components/ContentAreacreation';
import {HamburgerButton} from 'components/HamburgerButton';
import FileBrowser from './FileBrowser';
import Cache from './utils/cacheSystem';
import { createClient } from '@supabase/supabase-js';
import supabase from './utils/supabase';
//const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
//const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

//export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Breadcrumb ────────────────────────────────────────────────────────────
function Breadcrumb({ trail, breadCrumbOpen }) {
  return (
    <nav aria-label="Breadcrumb"  className={`${!breadCrumbOpen ? breadcrumbStyles.breadcrumbHide : breadcrumbStyles.breadcrumb}`}>
      {trail.map((crumb, i) => (
        <span key={i} className={breadcrumbStyles.breadcrumbItem} >
          {i > 0 && <span className={breadcrumbStyles.breadcrumbSep}>/</span>}
          <span className={i === trail.length - 1 ? breadcrumbStyles.breadcrumbActive : breadcrumbStyles.breadcrumbMuted}>
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────
export default function MBANavbar() {
  const [mbaOpen, setMbaOpen] = useState(false);
  const [mastersOpen, setMastersOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);
  const [trail, setTrail]     = useState(["Home"]);
  const [course, setCourse]   = useState(null);
  const [resource, setResource] = useState(null);
  const [breadCrumbOpen, setBreadCrumbOpen] = useState(true);
  const navRef = useRef(null);
  const [program, setProgram] = useState(null);
  const navComponents = [[mastersOpen, setMastersOpen, "MASTERS"], [mbaOpen, setMbaOpen,"MBA"],
  [resumeOpen, setResumeOpen,"Resume"], [resourceOpen, setResourceOpen, "Resource"]];

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
         setMbaOpen(false);
         setMastersOpen(false);
         setResumeOpen(false);
         setResourceOpen(false);

      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleCourseSelect(selectedCourse) {
    setCourse(selectedCourse);
    setResource(null);
    setTrail([<div className="text-blue-600 cursor-pointer underline"
        onClick={() => resetTohome(selectedCourse.program)}>Home</div>,
        selectedCourse.program, selectedCourse.semLabel, selectedCourse.name]);
    //setMbaOpen(false);
    selectedCourse.onOpen(false);
  }
  function resetTohome(program){
        setCourse(null);
        setResource(null);
        setTrail(["Home"]);
    //setMbaOpen(false);

        program === "MBA" ?setMbaOpen(false): setMastersOpen(false);
   }
  function handleResourceSelect(selectedResource, program) {
    setResource(selectedResource);
    setTrail([<div className="text-blue-600 cursor-pointer underline"
        onClick={() => resetTohome(program)}>Home</div>, program, course.semLabel,
        <div className="text-blue-600 cursor-pointer underline"
        onClick={() => handleCourseSelect(course)}>{course.name}</div>,
        selectedResource.label]);
  }

  return (
    <div className="pdf-wrapper" >  {/*style={styles.wrapper}>*/}
      {/* ── Top Nav Bar ── */}
      <nav className={navbarStyles.container} ref={navRef} aria-label="MBA Portal Navigation">
        {/* Brand */}
        <div className="mr-2">
        <HamburgerButton

          isOpen={breadCrumbOpen}
          onClick={() => setBreadCrumbOpen(o => !o)}
        />
        </div>
        <div className={brandStyles.brand}>🎓 Sabbir's Portal</div>

        <div style={{ position: "relative" }}>
          <button
            className={navbarStyles.navBtn(mastersOpen)}
            onClick={() =>{
                    for (let i = 0; i < navComponents.length; i++) {
                        if (navComponents[i][2] !== "MASTERS"){
                                navComponents[i][0]? navComponents[i][1]((o) => !o): null;
                            }
                        else{
                                navComponents[i][1]((o) => !o);
                                setProgram(navComponents[i][2]);
                            }

                    }
                }
            }
            //onMouseEnter={(e) => setMastersOpen(true)}
            //onMouseLeave={(e) => setMastersOpen(false)}
            aria-haspopup="true"
            aria-expanded={mastersOpen}
          >  Master's {/*<span style={styles.chevron}>{mastersOpen ? "▲" : "▼"}</span>*/}
          </button>

          {mastersOpen && (
            <SemesterDropdown onCourseSelect={handleCourseSelect} program={"MASTERS"} onOpen={setMastersOpen}/>
          )}
        </div>

        {/* MBA Dropdown Trigger */}

        <div style={{ position: "relative" }}>
          <button
            className={navbarStyles.navBtn(mbaOpen)}
            onClick={() =>{
                    for (let i = 0; i < navComponents.length; i++) {
                        if (navComponents[i][2] !== "MBA"){
                                   navComponents[i][0]? navComponents[i][1]((o) => !o): null;

                            }
                        else{
                                navComponents[i][1]((o) => !o);
                                setProgram(navComponents[i][2]);
                            }
                    }
                }
            }
            //onMouseEnter={(e) => setMbaOpen(true)}
            //onMouseLeave={(e) => setMbaOpen(false)}
            aria-haspopup="true"
            aria-expanded={mbaOpen}
          >
            MBA {/*<span style={styles.chevron}>{mbaOpen ? "▲" : "▼"}</span>*/}
          </button>

          {mbaOpen && (
            <SemesterDropdown onCourseSelect={handleCourseSelect} program={"MBA"} onOpen={setMbaOpen} />
          )}
            </div>
          <div style={{ position: "relative" }}>
          <button
            className={navbarStyles.navBtn(resumeOpen)}
            onClick={() =>
                {
                    for (let i = 0; i < navComponents.length; i++) {
                        if (navComponents[i][2] !== "Resume"){
                                   navComponents[i][0]? navComponents[i][1]((o) => !o): null;
                            }
                        else{
                                navComponents[i][1]((o) => !o);
                                setProgram(navComponents[i][2]);
                            }
                        }
                }
            }
            //onMouseEnter={(e) => setMbaOpen(true)}
            //onMouseLeave={(e) => setMbaOpen(false)}
            aria-haspopup="true"
            aria-expanded={resumeOpen}
          >
            Resume {/*<span style={styles.chevron}>{mbaOpen ? "▲" : "▼"}</span>*/}
          </button>

         {resumeOpen &&(
             <SemesterDropdown onCourseSelect={handleCourseSelect} program={"Resume"} onOpen={setResumeOpen} />)}

        </div>
        <div style={{ position: "relative" }}>
          <button
            className={navbarStyles.navBtn(resumeOpen)}
            onClick={() =>
                {
                    for (let i = 0; i < navComponents.length; i++) {
                        if (navComponents[i][2] !== "Resource"){

                                        navComponents[i][0]? navComponents[i][1]((o) => !o): null;

                            }
                        else{
                                navComponents[i][1]((o) => !o);
                                setProgram(navComponents[i][2]);
                            }
                        }
                    //mastersOpen ? setMastersOpen((o) => !o): null;
                    //mbaOpen ? setMbaOpen((o) => !o) : null;
                    //setResourceOpen((o) => !o);
                    //setProgram("Resource");
                }
            }
            //onMouseEnter={(e) => setMbaOpen(true)}
            //onMouseLeave={(e) => setMbaOpen(false)}
            aria-haspopup="true"
            aria-expanded={resourceOpen}
          >
            Resource {/*<span style={styles.chevron}>{mbaOpen ? "▲" : "▼"}</span>*/}
          </button>

         {resourceOpen &&(
             <SemesterDropdown onCourseSelect={handleCourseSelect} program={"Resource"} onOpen={setResourceOpen} />)}

        </div>

        {/* Other nav links */}
        {["Research","Dashboard", "Schedule"].map((item) => (
          <button
            key={item}
            className = {navbarStyles.navBtn(resumeOpen)}
            onClick = {() =>{
                        for (let i = 0; i < navComponents.length; i++) {
                            if (navComponents[i][2] !== item){
                                navComponents[i][0] ? navComponents[i][1]((o) => !o): null;
                            }
                            else{
                                navComponents[i][1]((o) => !o);
                                setProgram(navComponents[i][0]);
                            }
                        }
                }
            }
            onMouseEnter={(e) => (e.currentTarget.style.color = "#534AB7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* ── Breadcrumb ── */}
      <Breadcrumb trail={trail} breadCrumbOpen={breadCrumbOpen}/>

      {/* ── Content ── */}
    {  <div style={styles.content}>
        <ContentArea
          selected={{
            course,
            resource,
            onResourceSelect: handleResourceSelect, program
          }} supabase={supabase}
        />

      </div>}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = {
    content: { padding: "20px 24px", minHeight: 480,width:"100%" }
};
