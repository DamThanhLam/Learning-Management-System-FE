// components/Sidebar.tsx
import Link from "next/link";
import { FaTachometerAlt, FaBook, FaDollarSign, FaCog } from "react-icons/fa";
interface SidebarProps {
  pathname: string;
}
const Sidebar: React.FC<SidebarProps> = ({ pathname }) => {
  return (
    <div className="w-1/5 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
          <span className="text-xl font-bold">byway</span>
        </div>
        <nav className="mt-8">
          <Link href="/dashboard">
            <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 cursor-pointer">
              <FaTachometerAlt />
              <span>Dashboard</span>
            </div>
          </Link>
          <Link href="/courses">
            <div className="flex items-center space-x-2 p-4 bg-blue-600">
              <FaBook />
              <span>Courses</span>
            </div>
          </Link>
          <Link href="/revenue">
            <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 cursor-pointer">
              <FaDollarSign />
              <span>Revenue</span>
            </div>
          </Link>
          <Link href="/settings">
            <div className="flex items-center space-x-2 p-4 hover:bg-gray-800 cursor-pointer">
              <FaCog />
              <span>Setting</span>
            </div>
          </Link>
        </nav>
      </div>
      <div className="p-4 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gray-500 rounded-full" />
        <span>Hi, John</span>
      </div>
    </div>
  );
};

export default Sidebar;