"use client";

import React, { useState } from 'react';
import { Table, Button } from 'antd';
import Filters from './../components/Filters'; // Adjust the import path as necessary 
import moment from 'moment';
// Sample data for the table
const initialData = [
    {
        key: '1',
        customerId: 'C12345',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Springfield',
        ordersCount: 5,
        totalSpent: 5000.00,
        registeredAt: '2023-01-01',
    },
    {
        key: '2',
        customerId: 'C67890',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '987-654-3210',
        address: '456 Elm St, Metropolis',
        ordersCount: 2,
        totalSpent: 1200.00,
        registeredAt: '2023-03-15',
    },
    // Add more sample data as needed
];

export default function CustomerManagement() {
    const [data] = useState(initialData);
    const [searchText, setSearchText] = useState('');

    // Filter the data based on the search and filter criteria
    const filteredData = data.filter(item => {
        const isIdMatch = item.customerId.includes(searchText);
        const isNameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
      

        return (isIdMatch || isNameMatch);
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Customer ID',
            dataIndex: 'customerId',
            key: 'customerId',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Orders Count',
            dataIndex: 'ordersCount',
            key: 'ordersCount',
        },
        {
            title: 'Total Spent',
            dataIndex: 'totalSpent',
            key: 'totalSpent',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Registered At',
            dataIndex: 'registeredAt',
            key: 'registeredAt',
            render: (text: string) => moment(text).format('YYYY-MM-DD'),
        },
    ];

    return (
        <div>
            <h1>Customer Management</h1>

            {/* Filters Component */}
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}        
            />

            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
}
