import { useState, useEffect, useRef } from "react";

const navData = [
  {
    id: "sem1",
    label: "Semester 1",
    courses: [
      { code: "FA101", name: "Financial Accounting" },
      { code: "EC101", name: "Microeconomics" },
      { code: "ST101", name: "Business Statistics" },
    ],
  },
  {
    id: "sem2",
    label: "Semester 2",
    courses: [
      { code: "MK201", name: "Marketing Management" },
      { code: "OP201", name: "Operations Management" },
      { code: "CF201", name: "Corporate Finance" },
    ],
  },
  {
    id: "sem3",
    label: "Semester 3",
    courses: [
      { code: "SM301", name: "Strategic Management" },
      { code: "BE301", name: "Business Ethics" },
      { code: "EN301", name: "Entrepreneurship" },
    ],
  },
  {
    id: "sem4",
    label: "Semester 4",
    courses: [
      { code: "LD401", name: "Leadership" },
      { code: "GB401", name: "Global Business" },
      { code: "CP401", name: "Capstone Project" },
    ],
  },
];

const resources = [
  { key: "lectures",    icon: "🎬", label: "Lectures",    count: 24 },
  { key: "books",       icon: "📚", label: "Books",       count: 6  },
  { key: "assignments", icon: "📝", label: "Assignments", count: 8  },
  { key: "notes",       icon: "🗒️",  label: "Notes",       count: 15 },
  { key: "quizzes",     icon: "📊", label: "Quizzes",     count: 5  },
  { key: "syllabus",    icon: "📋", label: "Syllabus",    count: 1  },
];

// ─── Breadcrumb ────────────────────────────────────────────────────────────
function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb" style={styles.breadcrumb}>
      {trail.map((crumb, i) => (
        <span key={i} style={styles.breadcrumbItem}>
          {i > 0 && <span style={styles.breadcrumbSep}>/</span>}
          <span style={i === trail.length - 1 ? styles.breadcrumbActive : styles.breadcrumbMuted}>
            {crumb}
          </span>
        </span>
      ))}
    </nav>
  );
}

// ─── Resource Grid ─────────────────────────────────────────────────────────
function ResourceGrid({ course, onSelect }) {
  return (
    <div>
      <div style={styles.courseHeader}>
        <span style={styles.courseCode}>{course.code}</span>
        <span style={styles.courseSem}>{course.semLabel}</span>
      </div>
      <h2 style={styles.courseTitle}>{course.name}</h2>
      <p style={styles.courseSub}>Select a resource type below</p>
      <div style={styles.resourceGrid}>
        {resources.map((r) => (
          <button
            key={r.key}
            style={styles.resourceCard}
            onClick={() => onSelect(r)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#534AB7")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e0e0")}
          >
            <span style={styles.resourceIcon}>{r.icon}</span>
            <span style={styles.resourceLabel}>{r.label}</span>
            <span style={styles.resourceCount}>{r.count} items</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Content Area ──────────────────────────────────────────────────────────
function ContentArea({ selected }) {
  if (!selected.course) {
    return (
      <div style={styles.placeholder}>
        <span style={{ fontSize: 32 }}>🎓</span>
        <p style={styles.placeholderText}>
          Select <strong>MBA → Semester → Course</strong> to explore resources
        </p>
      </div>
    );
  }

  if (!selected.resource) {
    return (
      <ResourceGrid
        course={selected.course}
        onSelect={selected.onResourceSelect}
      />
    );
  }

  return (
    <div>
      <div style={styles.courseHeader}>
        <span style={styles.courseCode}>{selected.course.code}</span>
        <span style={styles.courseSem}>{selected.course.semLabel}</span>
      </div>
      <h2 style={styles.courseTitle}>{selected.resource.label}</h2>
      <p style={styles.courseSub}>
        {selected.course.name} · {selected.resource.count} items
      </p>
      <div style={styles.placeholder}>
        <span style={{ fontSize: 32 }}>{selected.resource.icon}</span>
        <p style={styles.placeholderText}>
          {selected.resource.label} content for{" "}
          <strong>{selected.course.name}</strong> would load here.
        </p>
      </div>
    </div>
  );
}

// ─── Flyout Submenu (Courses) ──────────────────────────────────────────────
function CourseFlyout({ courses, onSelect }) {
  return (
    <div style={styles.flyout}>
      {courses.map((course) => (
        <button
          key={course.code}
          style={styles.flyoutItem}
          onClick={() => onSelect(course)}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f4fe")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={styles.flyoutCode}>{course.code}</span>
          <span style={styles.flyoutName}>{course.name}</span>
        </button>
      ))}
    </div>
  );
}

// ─── Semester Dropdown ─────────────────────────────────────────────────────
function SemesterDropdown({ onCourseSelect }) {
  const [openSem, setOpenSem] = useState(null);

  return (
    <div style={styles.dropdown}>
      {navData.map((sem) => (
        <div key={sem.id} style={{ position: "relative" }}>
          <button
            style={{
              ...styles.dropdownItem,
              background: openSem === sem.id ? "#f5f4fe" : "transparent",
              color: openSem === sem.id ? "#534AB7" : "#333",
            }}
            onMouseEnter={() => setOpenSem(sem.id)}
          >
            <span>{sem.label}</span>
            <span style={styles.chevron}>›</span>
          </button>
          {openSem === sem.id && (
            <CourseFlyout
              courses={sem.courses}
              onSelect={(course) =>
                onCourseSelect({ ...course, semLabel: sem.label })
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Navbar ───────────────────────────────────────────────────────────
export default function MBANavbar() {
  const [mbaOpen, setMbaOpen] = useState(false);
  const [trail, setTrail]     = useState(["Home"]);
  const [course, setCourse]   = useState(null);
  const [resource, setResource] = useState(null);
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
      <nav style={styles.navbar} ref={navRef} aria-label="MBA Portal Navigation">
        {/* Brand */}
        <div style={styles.brand}>🎓 Sabbir's Portal</div>

        {/* MBA Dropdown Trigger */}
        <div style={{ position: "relative" }}>
          <button
            style={{
              ...styles.navBtn,
              borderBottom: mbaOpen ? "2px solid #534AB7" : "2px solid transparent",
              color: mbaOpen ? "#534AB7" : "#555",
            }}
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
            style={styles.navBtn}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#534AB7")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
          >
            {item}
          </button>
        ))}
      </nav>

      {/* ── Breadcrumb ── */}
      <Breadcrumb trail={trail} />

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
  wrapper: {
    fontFamily: "'Segoe UI', sans-serif",
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    overflow: "hidden",
    background: "#fff",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    padding: "0 20px",
    height: 54,
    borderBottom: "1px solid #eee",
    background: "#fff",
  },
  brand: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a1a1a",
    marginRight: 24,
    letterSpacing: "-0.3px",
  },
  navBtn: {
    background: "none",
    border: "none",
    borderBottom: "2px solid transparent",
    cursor: "pointer",
    fontSize: 14,
    color: "#555",
    padding: "0 14px",
    height: 54,
    display: "flex",
    alignItems: "center",
    gap: 6,
    transition: "color 0.15s, border-color 0.15s",
    fontFamily: "inherit",
  },
  chevron: { fontSize: 11, opacity: 0.7 },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 10,
    minWidth: 180,
    zIndex: 200,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "6px 0",
  },
  dropdownItem: {
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 13,
    padding: "9px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "inherit",
    transition: "background 0.1s",
    textAlign: "left",
  },
  flyout: {
    position: "absolute",
    top: 0,
    left: "100%",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 10,
    minWidth: 210,
    zIndex: 201,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    padding: "6px 0",
  },
  flyoutItem: {
    width: "100%",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "9px 16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 2,
    fontFamily: "inherit",
    transition: "background 0.1s",
  },
  flyoutCode: { fontSize: 11, color: "#534AB7", fontWeight: 600 },
  flyoutName: { fontSize: 13, color: "#333" },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
    padding: "8px 20px",
    background: "#f9f9f9",
    borderBottom: "1px solid #eee",
    fontSize: 12,
  },
  breadcrumbItem: { display: "flex", alignItems: "center", gap: 4 },
  breadcrumbSep: { color: "#ccc", margin: "0 2px" },
  breadcrumbMuted: { color: "#999" },
  breadcrumbActive: { color: "#1a1a1a", fontWeight: 500 },
  content: { padding: "28px 24px", minHeight: 240 },
  courseHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  courseCode: {
    fontSize: 11,
    background: "#f0effe",
    color: "#534AB7",
    padding: "3px 10px",
    borderRadius: 6,
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  courseSem: { fontSize: 12, color: "#999" },
  courseTitle: { fontSize: 20, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 },
  courseSub: { fontSize: 13, color: "#888", marginBottom: 20 },
  resourceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
    gap: 12,
  },
  resourceCard: {
    background: "#fafafa",
    border: "1px solid #e2e0e0",
    borderRadius: 10,
    padding: "16px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    cursor: "pointer",
    transition: "border-color 0.15s",
    fontFamily: "inherit",
    textAlign: "left",
  },
  resourceIcon: { fontSize: 22 },
  resourceLabel: { fontSize: 13, fontWeight: 600, color: "#1a1a1a" },
  resourceCount: { fontSize: 12, color: "#999" },
  placeholder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: "40px 0",
    color: "#aaa",
  },
  placeholderText: { fontSize: 14, color: "#999", textAlign: "center" },
};
