import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        {/* <Header /> */}
        
        {/* Main content */}
        <main className="p-6 flex-1 bg-white shadow-md rounded-lg">
          {children}
        </main>
      </div>
    </div>
  );
}
