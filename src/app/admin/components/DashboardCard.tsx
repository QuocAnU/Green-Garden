import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
interface DashboardCardProps {
  title: string;
  value: string;
  change: string;
  icon: FontAwesomeIconProps['icon'];
}

export default function DashboardCard({ title, value, change, icon }: DashboardCardProps) {
  return (
    <div className="bg-white flex flex-row items-center space-x-8 p-4 rounded-lg shadow-md">
      <div className="border-green-400 rounded-md">
        <FontAwesomeIcon icon={icon} className="text-3xl text-[#9B51DF]" />
      </div>
      <div className="flex flex-col">
      <h3 className="text-sm font-medium text-black">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className={`text-sm ${change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </p>
      </div>
    </div>
  );
}