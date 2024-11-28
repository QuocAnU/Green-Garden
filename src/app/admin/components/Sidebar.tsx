'use client';
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import from next/navigation
import { DashboardOutlined, AppstoreAddOutlined, UsergroupAddOutlined, UnorderedListOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname(); // Get the current path
  
  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 bg-white h-screen flex flex-col items-center justify-between p-4">
      <div className="w-full flex flex-col items-center">
        <ul className="w-full">
          <li className="mb-4">
            <Link href="/admin/dashboard" className={`flex items-center ${isActive("/admin/dashboard") ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"}`}>
              <DashboardOutlined className="mr-2" />
              Dashboard
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/order" className={`flex items-center ${isActive("/admin/order") ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"}`}>
              <UnorderedListOutlined className="mr-2" />
              Order Management
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/product" className={`flex items-center ${isActive("/admin/product") ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"}`}>
              <AppstoreAddOutlined className="mr-2" />
              Product Management
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/customer" className={`flex items-center ${isActive("/admin/customer") ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"}`}>
              <UsergroupAddOutlined className="mr-2" />
              Customer Management
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/admin/feedback" className={`flex items-center ${isActive("/admin/feedback") ? "text-blue-500 font-bold" : "text-gray-700 hover:text-blue-500"}`}>
              <QuestionCircleOutlined className="mr-2" />
              Feedback
            </Link>
          </li>
          <div className="text-black">
            <SignOutButton />
          </div>
        </ul>
      </div>
    </aside>
  );
}
