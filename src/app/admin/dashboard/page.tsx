import DashboardCard from "../components/DashboardCard";
import Chart from "../components/Chart";
import { faCartShopping, faChartLine, faChartPie, faUser  } from "@fortawesome/free-solid-svg-icons";
export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard title="New Orders" value="34,567" change="+2.00%" icon = {faCartShopping} />
        <DashboardCard title="Total Income" value="$74,567" change="+5.45%" icon = {faChartLine} />
        <DashboardCard title="Total Expense" value="$24,567" change="-2.00%" icon = {faChartPie} />
        <DashboardCard title="New Orders" value="34,567" change="+2.00%" icon = {faUser} />
      </div>
      <div className="flex gap-6">
        <div className="flex-1 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Yearly Stats</h2>
          <Chart />
        </div>
        <div className="w-1/3 bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Top Selling Category</h2>
          {/* Chart or content */}
        </div>
      </div>
      {/* Thêm các phần cho Best Selling Products và Recent Orders */}
    </div>
  );
}