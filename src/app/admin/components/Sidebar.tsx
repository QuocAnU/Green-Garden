import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Plan A Plant</h1>
      <ul>
        <li className="mb-4">
          <Link href="/dashboard" className="text-gray-700 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/order" className="text-gray-700 hover:text-blue-500">
            Order Management
          </Link>
        </li>
      </ul>
    </aside>
  );
}
