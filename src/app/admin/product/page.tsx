"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import moment from 'moment';
import { useAuth } from '@clerk/nextjs';
import ProductApi from '@/api/Product';

// Sample data for the table
const initialData = [
    {
        key: '1',
        productId: 'P12345',
        productName: 'Laptop',
        quantity: 10,
        price: 1500.00,
        stock: 50,
        createdAt: '2024-01-01',
    },
    {
        key: '2',
        productId: 'P67890',
        productName: 'Smartphone',
        quantity: 20,
        price: 800.00,
        stock: 30,
        createdAt: '2024-01-05',
    },
    // Add more sample data as needed
];

export default function ProductManagement() {
    const [data] = useState(initialData); // Keep data constant for this example
    const [searchText, setSearchText] = useState('');
    const [dateRange, setDateRange] = useState<any>(null);
    const [stockRange, setStockRange] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([]);

    const [products, setProducts] = useState([]);
    const { getToken } = useAuth();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = await getToken();
                const response = await ProductApi.getAll(token);
                console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [getToken]);

    // Filter the data based on the search and filter criteria
    const filteredData = data.filter(item => {
        const isProductNameMatch = item.productName.toLowerCase().includes(searchText.toLowerCase());
        const isDateMatch = !dateRange || (moment(item.createdAt).isBetween(dateRange[0], dateRange[1], null, '[]'));
        const isStockMatch = (stockRange.length === 0 || (item.stock >= stockRange[0] && item.stock <= stockRange[1]));
        const isPriceMatch = (priceRange.length === 0 || (item.price >= priceRange[0] && item.price <= priceRange[1]));

        return isProductNameMatch && isDateMatch && isStockMatch && isPriceMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Product ID',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
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
                        icon={<DeleteOutlined />}
                        // onClick={() => deleteProduct(record)} // You can add the delete functionality
                        danger
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            <h1>Product Management</h1>

            {/* Filters Component */}
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}
            />

            <Table columns={columns} dataSource={filteredData} />

        </div>
    );
}
