"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Select } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import OrderDetailsModal from './OrderDetailsModal'; // Import the new modal component
import moment from 'moment';
import { useAuth } from '@clerk/nextjs';
import OrderApi from '@/api/Order';

const { Option } = Select;

const StatusCell = ({ status, record, onStatusChange }: any) => {
    const [editing, setEditing] = useState(false);

    const handleChange = (newStatus: string) => {
        onStatusChange(newStatus, record.key);
        setEditing(false);
    };

    return editing ? (
        <Select
            defaultValue={status}
            style={{ width: 120 }}
            onChange={handleChange}
            onBlur={() => setEditing(false)} // Exit edit mode on blur
        >
            <Option value="Pending">Pending</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
            <Option value="Refunded">Refunded</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Processing">Processing</Option>
        </Select>
    ) : (
        <Tag
            color={status === 'Pending' ? 'orange' 
                : status === 'Completed' ? 'green' 
                : status === 'Cancelled' ? 'red' :
                status === 'Refunded' ? 'blue' :
                status === 'Shipped' ? 'blue' :
                status === 'Delivered' ? 'green' :
                'blue'}
            onClick={() => setEditing(true)}
        >
            {status}
        </Tag>
    );
};

export default function OrderManagement() {
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

    const handleStatusChange = (newStatus: string, key: string) => {
        const updatedOrders = orders.map(order =>
            order.key === key ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
    };


    // Filter the data based on the search and filter criteria
    const filteredData = orders.filter(item => {
        const isOrderIdMatch = item.orderCode.includes(searchText);
        // const isNameMatch = item.customerName.toLowerCase().includes(searchText.toLowerCase());
        const isDateMatch = !dateRange || (moment(item.createdAt).isBetween(dateRange[0], dateRange[1], null, '[]'));
        const isStatusMatch = !statusFilter || item.status === statusFilter;
        const isTotalMatch = (totalRange.length === 0 || (item.totalAmount >= totalRange[0] && item.totalAmount <= totalRange[1]));

        return (isOrderIdMatch || isNameMatch) && isDateMatch && isStatusMatch && isTotalMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Order Code',
            dataIndex: 'orderCode',
            key: 'orderCode',
        },
        // {
        //     title: 'Customer Name',
        //     dataIndex: 'customerName',
        //     key: 'customerName',
        // },
        {
            title: 'Customer ID',
            dataIndex: 'customerID',
            key: 'customerID',
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text: number) => `$${text}`,
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string, record: any) => (
                <StatusCell status={status} record={record} onStatusChange={handleStatusChange} />
            ),
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
                status={true}
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
