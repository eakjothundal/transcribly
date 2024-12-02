import React from "react";
import { useLocation } from "react-router-dom";

interface PageProps {
  children: React.ReactNode;
}

export function Page({ children }: PageProps) {
  const location = useLocation();

  return (
    <div className="page-container">
      {/* <Sidebar currentPath={location.pathname} /> */}
      <main className="page-content">{children}</main>
    </div>
  );
}
