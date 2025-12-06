"use client";

import Sidebar from "../components/admin/Sidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 mt-20">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  );
}
