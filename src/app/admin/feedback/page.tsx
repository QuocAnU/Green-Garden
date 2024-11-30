"use client";

import React, { useState } from 'react';
import { Table } from 'antd';
import Filters from './../components/Filters'; // Adjust the import path as necessary 

// Sample data for feedback
const initialFeedbackData = [
    {
        key: '1',
        id: 'F12345',
        name: 'John Doe',
        message: 'Great service, I am very happy with the product!',
    },
    {
        key: '2',
        id: 'F67890',
        name: 'Jane Smith',
        message: 'The delivery was delayed, but the quality is good.',
    },
    // Add more sample data as needed
];

export default function FeedbackManagement() {
    const [data] = useState(initialFeedbackData);
    const [searchText, setSearchText] = useState('');

    // Filter the data based on the search criteria
    const filteredData = data.filter(item => {
        const isIdMatch = item.id.includes(searchText);
        const isNameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const isMessageMatch = item.message.toLowerCase().includes(searchText.toLowerCase());

        return isIdMatch || isNameMatch || isMessageMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Feedback ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
        },
    ];

    return (
        <div>
            {/* Filters Component */}
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}
                text='Search Feedback by ID, Name, or Message'
            />

            <Table columns={columns} dataSource={filteredData} />
        </div>
    );
}
