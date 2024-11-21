import Link from "next/link";
import { DashboardOutlined, AppstoreAddOutlined, UsergroupAddOutlined, UnorderedListOutlined } from '@ant-design/icons';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white h-screen p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Plan A Plant</h1>
      <ul>
        <li className="mb-4">
          <Link href="/admin/dashboard" className="flex items-center text-gray-700 hover:text-blue-500">
            <DashboardOutlined className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/order" className="flex items-center text-gray-700 hover:text-blue-500">
            <UnorderedListOutlined className="mr-2" />
            Order Management
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/product" className="flex items-center text-gray-700 hover:text-blue-500">
            <AppstoreAddOutlined className="mr-2" />
            Product Management
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/admin/customer" className="flex items-center text-gray-700 hover:text-blue-500">
            <UsergroupAddOutlined className="mr-2" />
            Customer Management
          </Link>
        </li>
      </ul>
    </aside>
  );
}
