"use client";

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Filters from './../components/Filters'; // Adjust the import path as necessary 
import { useAuth } from '@clerk/clerk-react';
import FeedbackApi from '@/api/Contact';

interface Feedback {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
    updatedAt: string;
}

export default function FeedbackManagement(){
    const [searchText, setSearchText] = useState('');
    const { getToken } = useAuth(); 
    const [data, setFeedback] = useState<Feedback[]>([]);

    useEffect(() => {
          const fetchFeedback = async () => {
            const token = await getToken();
            try {
              const feedback = await FeedbackApi.getAll(token);
              setFeedback(feedback.data.metadata);
            } catch (error) {
              console.error('Error fetching feedback:', error);
            }
          }
          fetchFeedback();
      }, [getToken]);

    // Filter the data based on the search criteria
    const filteredData = data.filter(item => {
        const isIdMatch = item._id.includes(searchText);
        const isNameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const isMessageMatch = item.message.toLowerCase().includes(searchText.toLowerCase());

        return isIdMatch || isNameMatch || isMessageMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Feedback ID',
            dataIndex: '_id',
            key: '_id',
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
