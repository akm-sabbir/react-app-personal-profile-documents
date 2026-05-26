import {navData, resources} from '../constants/resourcesData';
import {courseStyles, resourceStyles} from '../styles/componentStyles';
import FileBrowser from '../FileBrowser';
/// ResourceGrid

function ResourceGrid({ course, onSelect }) {
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
            onClick={() => onSelect(r)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#534AB7")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e0e0")}
          >
            <span className={resourceStyles.resourceIcon}>{r.icon}</span>
            <span className={resourceStyles.resourceLabel}>{r.label}</span>
            <span className={resourceStyles.resourceCount}>{r.count} items</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Content Area ──────────────────────────────────────────────────────────
export function ContentArea({ selected }) {
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
      {/*<div className={courseStyles.courseHeader}>
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
          <strong>{selected.course.name}</strong>*/}
          <FileBrowser />
        {/*</p>
      </div>*/}
    </div>
  );
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
    placeholderText: { fontSize: 14, color: "#999", textAlign: "center" },
}