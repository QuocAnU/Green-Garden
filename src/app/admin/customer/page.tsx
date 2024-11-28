"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import { useAuth } from '@clerk/nextjs';
import UserApi from '@/api/User';

export default function CustomerManagement() {
    const [searchText, setSearchText] = useState('');
    const [users, setUsers] = useState([]);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await getToken();
                const response = await UserApi.getAll(token);
                if (response && response.data && response.data.metadata) {
                    setUsers(response.data.metadata.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, [getToken]);

    const toggleBanStatus = async (userId: string, currentStatus: boolean) => {
        try {
            const token = await getToken();

            const response = currentStatus ? await UserApi.unBanUser(token, userId) : await UserApi.banUser(token, userId);
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


    const formatData = users.map((user: any) => ({
        email: user.emailAddresses[0].emailAddress,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        banned: user.banned,
    }));

    const filteredData = formatData.filter((user: any) => {
        const name = `${user.firstName} ${user.lastName}`.toLowerCase();
        const email = user.email.toLowerCase();
        return name.includes(searchText.toLowerCase()) || email.includes(searchText.toLowerCase()) || statusMatch;
    });

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
            render: (text: boolean, record: any) => (
                <Button
                    type = 'primary'
                    danger = {text}
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
