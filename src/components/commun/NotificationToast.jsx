import React, { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(
    function () {
      const timer = setTimeout(onClose, 3000);
      return function () {
        clearTimeout(timer);
      };
    },
    [onClose]
  );

  const colors = {
    success: { bg: "#10b981", icon: "✓" },
    error: { bg: "#ef4444", icon: "✕" },
    info: { bg: "#0ea5e9", icon: "ℹ" },
  };
  const color = colors[type] || colors.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: "translateX(-50%)",
        background: color.bg,
        color: "white",
        padding: "12px 24px",
        borderRadius: "10px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        fontWeight: 500,
        zIndex: 99999,
        minWidth: "280px",
      }}
      role="status"
      aria-live="polite"
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {color.icon}
      </span>
      {message}
    </div>
  );
}
