import React, { useEffect, useState } from "react";
import {navData, resources, mastersNavData, resumeNavData} from '../constants/resourcesData';
import {dropdownStyles, flyoutStyles} from '../styles/componentStyles';
function CourseFlyout({ courses, onSelect }) {
  return (
    <div className={flyoutStyles.flyout}>
      {courses.map((course) => (
        <button
          key={course.code}
          className={flyoutStyles.flyoutItem}
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


export function SemesterDropdown({ onCourseSelect, program, onOpen }) {
  const [openSem, setOpenSem] = useState(null);
console.log("We are here starting dropdown,", onCourseSelect, program)
  return program === "MBA"?(
    <div className={dropdownStyles.dropdownContainer} >
      {navData.map((sem) => (
        <div key={sem.id} style={{ position: "relative" }}>
          <button
            className={dropdownStyles.dropdownItem(openSem, sem.id)}

            onMouseEnter={() => setOpenSem(sem.id)}
          >
            <span>{sem.label}</span>
            <span style={styles.chevron}>›</span>
          </button>
          {openSem === sem.id && (
            <CourseFlyout
              courses={sem.courses}
              onSelect={(course) =>
                onCourseSelect({ ...course, semLabel: sem.label, program, onOpen })
              }
            />
          )}
        </div>
      ))}
    </div>
  ) :program==="MASTERS"?(
    <div className={dropdownStyles.dropdownContainer} >
      {mastersNavData.map((sem) => (
        <div key={sem.id} style={{ position: "relative" }}>
          <button
            className={dropdownStyles.dropdownItem(openSem, sem.id)}

            onMouseEnter={() => setOpenSem(sem.id)}
          >
            <span>{sem.label}</span>
            <span style={styles.chevron}>›</span>
          </button>
          {openSem === sem.id && (
            <CourseFlyout
              courses={sem.courses}
              onSelect={(course) =>
                onCourseSelect({ ...course, semLabel: sem.label, program, onOpen })
              }
            />
          )}
        </div>
      ))}
    </div>
  ):<div className={dropdownStyles.dropdownContainer} >
      {resumeNavData.map((sem) => (
        <div key={sem.id} style={{ position: "relative" }}>
          <button
            className={dropdownStyles.dropdownItem(openSem, sem.id)}

            onMouseEnter={() => setOpenSem(sem.id)}
          >
            <span>{sem.label}</span>
            <span style={styles.chevron}>›</span>
          </button>
          {openSem === sem.id && (
            <CourseFlyout
              courses={sem.courses}
              onSelect={(course) =>
                onCourseSelect({ ...course, semLabel: sem.label, program, onOpen })
              }
            />
          )}
        </div>
      ))}
    </div>;

}

const styles = {
    chevron: { fontSize: 11, opacity: 0.7 },
    flyoutCode: { fontSize: 11, color: "#534AB7", fontWeight: 600 },
    flyoutName: { fontSize: 13, color: "#333" }
   }