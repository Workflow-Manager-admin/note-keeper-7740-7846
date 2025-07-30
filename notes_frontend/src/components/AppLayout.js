import React from "react";

// PUBLIC_INTERFACE
/**
 * Main layout with sidebar, topbar, and main content area.
 * @param {object} props
 * @param {React.ReactNode} props.sidebar
 * @param {React.ReactNode} props.topbar
 * @param {React.ReactNode} props.main
 */
export default function AppLayout({ sidebar, topbar, main }) {
  return (
    <div className="layout-root">
      <div className="layout-sidebar">{sidebar}</div>
      <div className="layout-main">
        {topbar}
        <div className="layout-content">{main}</div>
      </div>
    </div>
  );
}
