"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import OrderDetailsModal from './OrderDetailsModal'; // Import the new modal component
import moment from 'moment';
import { useAuth } from '@clerk/nextjs';
import OrderApi from '@/api/Order';

// Sample data for the table
const initialData = [
    {
        key: '1',
        orderId: '12345',
        customerName: 'John Doe',
        products: [
            { name: 'Laptop', quantity: 1, price: 1500.00 },
            { name: 'Mouse', quantity: 2, price: 25.00 },
        ],
        total: 1550.00,
        profit: 500.00,
        status: 'Shipped',
        createdAt: '2024-01-01',
    },
    {
        key: '2',
        orderId: '67890',
        customerName: 'Jane Smith',
        products: [
            { name: 'Smartphone', quantity: 1, price: 800.00 },
        ],
        total: 800.00,
        profit: 200.00,
        status: 'Processing',
        createdAt: '2024-01-05',
    },
    // Add more sample data as needed
];


export default function OrderManagement() {
    const [data] = useState(initialData); // Keep data constant for this example
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState<any>(null);
    const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);
    const [totalRange, setTotalRange] = useState<number[]>([]);
    const [profitRange, setProfitRange] = useState<number[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null); // State to hold the selected order
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const [orders, setOrders] = useState([]);

    const { getToken } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {   
            try {
                const token = await getToken();
                const response = await OrderApi.getAll(token);
                if(response && response.data && response.data.metadata) {
                    setOrders(response.data.metadata);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [getToken]);

    // Filter the data based on the search and filter criteria
    const filteredData = data.filter(item => {
        const isOrderIdMatch = item.orderId.includes(searchText);
        const isNameMatch = item.customerName.toLowerCase().includes(searchText.toLowerCase());
        const isDateMatch = !dateRange || (moment(item.createdAt).isBetween(dateRange[0], dateRange[1], null, '[]'));
        const isStatusMatch = !statusFilter || item.status === statusFilter;
        const isTotalMatch = (totalRange.length === 0 || (item.total >= totalRange[0] && item.total <= totalRange[1]));
        const isProfitMatch = (profitRange.length === 0 || (item.profit >= profitRange[0] && item.profit <= profitRange[1]));

        return (isOrderIdMatch || isNameMatch) && isDateMatch && isStatusMatch && isTotalMatch && isProfitMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Customer Name',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Profit',
            dataIndex: 'profit',
            key: 'profit',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => moment(text).format('YYYY-MM-DD'),
        },
        {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <div className='flex justify-center'>
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => showOrderDetails(record)}
                    style={{ marginRight: 8 }}
                >
                </Button>
                <Button
                    icon={<DeleteOutlined />}
                    // onClick={() => deleteOrder(record)}
                    danger
                >
                </Button>
            </div>
        ),
    },
    ];

    // Function to show order details in modal
    const showOrderDetails = (order: any) => {
        setSelectedOrder(order);
        setIsModalVisible(true);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedOrder(null);
    };

    return (
        <div>
            <h1>Order Management</h1>

            {/* Filters Component */}
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}
                dateRange={dateRange}
                setDateRange={setDateRange}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                totalRange={totalRange}
                setTotalRange={setTotalRange}
                profitRange={profitRange}
                setProfitRange={setProfitRange}
            />

            <Table columns={columns} dataSource={filteredData} />

            {/* Order Details Modal */}
            <OrderDetailsModal
                visible={isModalVisible}
                onClose={handleModalClose}
                order={selectedOrder}
            />
        </div>
    );
}
