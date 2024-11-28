"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import { useAuth } from '@clerk/nextjs';
import UserApi from '@/api/User';

// Type for user details
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    banned: boolean;
}

// Response type for the API call
interface UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    banned: boolean;
    emailAddresses: { emailAddress: string }[];
}

export default function CustomerManagement() {
    const [searchText, setSearchText] = useState<string>(''); // search text state
    const [users, setUsers] = useState<User[]>([]); // users data state
    const { getToken } = useAuth();

    // Fetch users on mount or when the token changes
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                const response = await UserApi.getAll(token);
                if (response && response.data && response.data.metadata) {
                    const usersData = response.data.metadata.data.map((user: UserResponse) => ({
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.emailAddresses[0]?.emailAddress || '', // Handle cases where emailAddresses might be empty
                        banned: user.banned,
                    }));
                    setUsers(usersData);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [getToken]);

    // Toggle ban status
    const toggleBanStatus = async (userId: string, currentStatus: boolean) => {
        try {
            const token = await getToken();
            const response = currentStatus
                ? await UserApi.unBanUser(token, userId)
                : await UserApi.banUser(token, userId);

            if (response && response.status === 200) {
                message.success(`User ${!currentStatus ? 'banned' : 'unbanned'} successfully.`);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === userId ? { ...user, banned: !currentStatus } : user
                    )
                );
            }
        } catch (error) {
            console.error('Error updating ban status:', error);
            message.error('Failed to update ban status.');
        }
    };

    // Filter data based on search text
    const filteredData = users.filter((user) => {
        const name = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchText.toLowerCase()) || email.includes(searchText.toLowerCase());
    });

    // Table columns
    const columns = [
        {
            title: 'Customer ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ban',
            dataIndex: 'banned',
            key: 'banned',
            render: (text: boolean, record: User) => (
                <Button
                    type='primary'
                    danger={text}
                    onClick={() => toggleBanStatus(record.id, text)}
                >
                    {text ? 'Unban' : 'Ban'}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}
                text="Search by Name or Email"
            />
            <Table columns={columns} dataSource={filteredData} rowKey="id" />
        </div>
    );
}
