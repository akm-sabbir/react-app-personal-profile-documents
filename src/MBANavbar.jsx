import { useState, useEffect, useRef } from "react";
import {navbarStyles, brandStyles, breadcrumbStyles} from "./styles/componentStyles";
import {SemesterDropdown} from './components/SemesterDropdown';
import {navData, resources} from './constants/resourcesData';
import {ContentArea} from './components/contentAreacreation';
import {HamburgerButton} from 'components/HamburgerButton';

// ─── Breadcrumb ────────────────────────────────────────────────────────────
function Breadcrumb({ trail, breadCrumbOpen }) {
  return (
    <nav aria-label="Breadcrumb"  className={`${!breadCrumbOpen ? breadcrumbStyles.breadcrumbHide : breadcrumbStyles.breadcrumb}`}>
      {trail.map((crumb, i) => (
        <span key={i} className={breadcrumbStyles.breadcrumbItem}>
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
  const [trail, setTrail]     = useState(["Home"]);
  const [course, setCourse]   = useState(null);
  const [resource, setResource] = useState(null);
  const [breadCrumbOpen, setBreadCrumbOpen] = useState(true);
  const navRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMbaOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleCourseSelect(selectedCourse) {
    setCourse(selectedCourse);
    setResource(null);
    setTrail(["Home", "MBA", selectedCourse.semLabel, selectedCourse.name]);
    setMbaOpen(false);
  }

  function handleResourceSelect(selectedResource) {
    setResource(selectedResource);
    setTrail(["Home", "MBA", course.semLabel, course.name, selectedResource.label]);
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

        {/* MBA Dropdown Trigger */}
        <div style={{ position: "relative" }}>
          <button
            className={navbarStyles.navBtn(mbaOpen)}
            onClick={() => setMbaOpen((o) => !o)}
            aria-haspopup="true"
            aria-expanded={mbaOpen}
          >
            MBA <span style={styles.chevron}>{mbaOpen ? "▲" : "▼"}</span>
          </button>

          {mbaOpen && (
            <SemesterDropdown onCourseSelect={handleCourseSelect} />
          )}
        </div>

        {/* Other nav links */}
        {["Dashboard", "Schedule", "Profile"].map((item) => (
          <button
            key={item}
            className = {navbarStyles.navBtn(mbaOpen)}

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
      <div style={styles.content}>
        <ContentArea
          selected={{
            course,
            resource,
            onResourceSelect: handleResourceSelect,
          }}
        />
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = {
    content: { padding: "20px 24px", minHeight: 480,width:"100%" }
};
