import Sidebar from './components/Sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white text-white hidden md:block">
        <Sidebar />
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="p-6 flex-1 bg-white shadow-md rounded-lg overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
