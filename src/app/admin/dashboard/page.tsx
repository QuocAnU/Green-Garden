'use client'

import DashboardCard from "../components/DashboardCard";
import Chart from "../components/Chart";
import TopSellingCategory from "../components/TopSalesCard";
import { faCartShopping, faChartLine, faChartPie, faUser  } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import OrderApi from "@/api/Order";
import { useAuth } from "@clerk/nextjs";
import { Table } from "antd";

import { Order } from "../order/page";

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [countOrders, setCountOrders] = useState<string>("");

  const { getToken } = useAuth();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const response = await OrderApi.getAll(token);
        if (response && response.data && response.data.metadata) {
          const sortedOrders = response.data.metadata.sort((a: Order, b: Order) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          setOrders(sortedOrders.slice(0, 10));
          const totalOrders = response.data.metadata.length.toString();
          setCountOrders(totalOrders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [getToken]);

  const formatData = orders.map((order: Order) => ({
    Id: order._id,
    customer: order.customerName,
    status: order.status,
    total: order.totalAmount,
  }))

  const columns = [
    {
      title: 'ID',
      dataIndex: 'Id',
      key: 'Id',
    }, 
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
  ]
  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard title="New Orders" value={countOrders} change="+2.00%" icon = {faCartShopping} />
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
            <TopSellingCategory />
        </div>
      </div>
      {/* Thêm các phần cho Best Selling Products và Recent Orders */}
      <div>
        <h2 className="font-semibold mb-4">Recent Orders</h2>
        <Table columns={columns} dataSource={formatData} pagination={false}  />
      </div>

    </div>
  );
}