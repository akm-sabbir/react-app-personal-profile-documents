import { useState } from "react";

// ── Hamburger button ──────────────────────────────────────
export const HamburgerButton = ({ isOpen, onClick }) => {
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
        transform:  !isOpen ? "translateY(6.5px) rotate(45deg)" : "none",
      }} />
      <span style={{
        display:    "block",
        width:      16,
        height:     1.5,
        background: "#111827",
        borderRadius: 2,
        transition: "transform 0.28s ease, opacity 0.2s ease",
        opacity:    !isOpen ? 0 : 1,
        transform:  !isOpen ? "scaleX(0)" : "none",
      }} />
      <span style={{
        display:    "block",
        width:      16,
        height:     1.5,
        background: "#111827",
        borderRadius: 2,
        transition: "transform 0.28s ease, opacity 0.2s ease",
        transform:  !isOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
      }} />
    </button>
  );
}