import { useState, useEffect, useRef } from "react";
import {navbarStyles, brandStyles, breadcrumbStyles} from "./styles/componentStyles";
import {SemesterDropdown} from './components/SemesterDropdown';
import {navData, resources} from './constants/resourcesData';
import {ContentArea} from './components/ContentAreacreation';
import {HamburgerButton} from 'components/HamburgerButton';
import FileBrowser from './FileBrowser';
import Cache from './utils/cacheSystem';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [trail, setTrail]     = useState(["Home"]);
  const [course, setCourse]   = useState(null);
  const [resource, setResource] = useState(null);
  const [breadCrumbOpen, setBreadCrumbOpen] = useState(true);
  const navRef = useRef(null);
  const [program, setProgram] = useState(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
         setMbaOpen(false);
         setMastersOpen(false);
         setResumeOpen(false);

      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleCourseSelect(selectedCourse) {
    setCourse(selectedCourse);
    setResource(null);
    setTrail([<div className="text-blue-600 cursor-pointer underline"
        onClick={() => resetTohome(selectedCourse.program)}>Home</div>, selectedCourse.program, selectedCourse.semLabel, selectedCourse.name]);
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
        onClick={() => resetTohome(program)}>Home</div>, program, course.semLabel, <div className="text-blue-600 cursor-pointer underline"
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
            onClick={() =>
                {
                    mbaOpen ? setMbaOpen((o) => !o): null;
                    resumeOpen ? setResumeOpen((o) => !o) : null;
                    setMastersOpen((o) => !o);
                    setProgram("MASTERS")
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
            onClick={() =>
                {
                    mastersOpen ? setMastersOpen((o) => !o): null;
                    resumeOpen ? setResumeOpen((o) => !o) : null;
                    setMbaOpen((o) => !o);
                    setProgram("MBA");
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
                    mastersOpen ? setMastersOpen((o) => !o): null;
                    mbaOpen ? setMbaOpen((o) => !o) : null;
                    setResumeOpen((o) => !o);
                    setProgram("Resume");
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

        {/* Other nav links */}
        {["Resource", "Research","Dashboard", "Schedule"].map((item) => (
          <button
            key={item}
            className = {navbarStyles.navBtn(resumeOpen)}
            onClick = {() =>{
                        mastersOpen ? setMastersOpen((o) => !o): null;
                        mbaOpen ? setMbaOpen((o) => !o) : null;
                        resumeOpen? setResumeOpen((o) => !o) :null;
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
