import { useState } from "react";

// ── Hamburger button ──────────────────────────────────────
function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle navigation menu"
      style={{
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        alignItems:     "center",
        gap:            5,
        width:          36,
        height:         36,
        background:     "none",
        border:         "1px solid #e5e7eb",
        borderRadius:   8,
        cursor:         "pointer",
        padding:        8,
        flexShrink:     0,
      }}
    >
      <span style={{
        display:    "block",
        width:      16,
        height:     1.5,
        background: "#111827",
        borderRadius: 2,
        transition: "transform 0.28s ease, opacity 0.2s ease",
        transform:  isOpen ? "translateY(6.5px) rotate(45deg)" : "none",
      }} />
      <span style={{
        display:    "block",
        width:      16,
        height:     1.5,
        background: "#111827",
        borderRadius: 2,
        transition: "transform 0.28s ease, opacity 0.2s ease",
        opacity:    isOpen ? 0 : 1,
        transform:  isOpen ? "scaleX(0)" : "none",
      }} />
      <span style={{
        display:    "block",
        width:      16,
        height:     1.5,
        background: "#111827",
        borderRadius: 2,
        transition: "transform 0.28s ease, opacity 0.2s ease",
        transform:  isOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
      }} />
    </button>
  );
}

// ── Sidebar ───────────────────────────────────────────────
function Sidebar({ isOpen, onCourseSelect }) {
  const [openSem, setOpenSem] = useState(null);
  const [activeCourse, setActiveCourse] = useState(null);

  function toggleSem(id) {
    setOpenSem(prev => prev === id ? null : id);
  }

  function handleCourse(sem, course) {
    setActiveCourse(course.code);
    onCourseSelect(sem, course);
  }

  return (
    <aside style={{
      width:      isOpen ? 220 : 0,
      overflow:   "hidden",
      borderRight: isOpen ? "1px solid #e5e7eb" : "1px solid transparent",
      background: "#f9fafb",
      transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
      flexShrink: 0,
    }}>
      <div style={{ width: 220, padding: "12px 8px" }}>

        {/* Section label */}
        <div style={{ fontSize: 10, fontWeight: 700, color: "#9ca3af",
          letterSpacing: "0.08em", textTransform: "uppercase",
          padding: "10px 10px 4px" }}>
          MBA Semesters
        </div>

        {MBA_DATA.map((sem) => (
          <div key={sem.id}>
            {/* Semester toggle button */}
            <button
              onClick={() => toggleSem(sem.id)}
              style={{
                width:          "100%",
                background:     openSem === sem.id ? "#fff" : "transparent",
                border:         "none",
                borderRadius:   8,
                cursor:         "pointer",
                padding:        "8px 10px",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "space-between",
                fontSize:       13,
                fontFamily:     "inherit",
                color:          openSem === sem.id ? "#4f46e5" : "#111827",
                fontWeight:     openSem === sem.id ? 500 : 400,
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15 }}>{sem.icon}</span>
                {sem.label}
              </span>
              <span style={{
                fontSize:   11,
                color:      "#9ca3af",
                transition: "transform 0.2s",
                transform:  openSem === sem.id ? "rotate(90deg)" : "none",
              }}>›</span>
            </button>

            {/* Course list — slides open */}
            <div style={{
              overflow:   "hidden",
              maxHeight:  openSem === sem.id ? 300 : 0,
              transition: "max-height 0.25s ease",
            }}>
              {sem.courses.map((course) => (
                <button
                  key={course.code}
                  onClick={() => handleCourse(sem.label, course)}
                  style={{
                    width:       "100%",
                    background:  activeCourse === course.code ? "#ede9fe" : "transparent",
                    border:      "none",
                    borderRadius: 8,
                    cursor:      "pointer",
                    padding:     "7px 10px 7px 36px",
                    display:     "flex",
                    alignItems:  "flex-start",
                    gap:         8,
                    fontSize:    12,
                    fontFamily:  "inherit",
                    color:       activeCourse === course.code ? "#3730a3" : "#6b7280",
                    textAlign:   "left",
                  }}
                >
                  <span style={{
                    fontSize:    10,
                    background:  "#f3f4f6",
                    color:       "#6b7280",
                    padding:     "1px 5px",
                    borderRadius: 4,
                    whiteSpace:  "nowrap",
                    marginTop:   1,
                  }}>
                    {course.code}
                  </span>
                  {course.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

// ── Main layout ───────────────────────────────────────────
export default function MBAPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ display: "flex", alignItems: "center", height: 54,
        padding: "0 16px", borderBottom: "1px solid #e5e7eb",
        background: "#fff", gap: 10 }}>

        {/* ☰ Hamburger */}
        <HamburgerButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen(o => !o)}
        />

        <span style={{ fontSize: 15, fontWeight: 700, marginRight: "auto" }}>
          🎓 MBA Portal
        </span>

        <button>Dashboard</button>
        <button>Schedule</button>
        <button>Profile</button>
      </nav>

      {/* Body */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          isOpen={sidebarOpen}
          onCourseSelect={(sem, course) =>
            setSelected({ sem, course })
          }
        />
        <main style={{ flex: 1, padding: 24 }}>
          {selected
            ? <ResourceGrid course={selected.course} />
            : <p>Open the menu to select a course</p>
          }
        </main>
      </div>

    </div>
  );
}