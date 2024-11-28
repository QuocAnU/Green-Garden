"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import moment from 'moment';
import { useAuth } from '@clerk/nextjs';
import ProductApi from '@/api/Product';

import CreateProductModal from '../components/Modal/CreateProductModal';



export default function ProductManagement() {
    const [searchText, setSearchText] = useState('');

    const [products, setProducts] = useState([]);
    const { getToken } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);

    // Handle modal visibility
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle creating a product (called from CreateProductModal)
    const handleCreateProduct = async (newProduct: any) => {
        const data = { ...newProduct };
        data.images = newProduct.imageUrls.map((image: any) => image.imageUrl);
        delete data.imageUrls;

        const token = await getToken();
        try {
            const response = await ProductApi.create(token, data);
            if (response && response.data && response.data.metadata) {
                const newProductData = response.data.metadata;

                setProducts((prevProducts) => [newProductData, ...prevProducts]);
                notification.success({
                    message: 'Product created successfully',
                })
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }

        setIsModalVisible(false); // Close the modal
    };


    const handleDeleteProduct = async (productId: string) => {
        try {
            const token = await getToken();
            await ProductApi.delete(token, productId);
            setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
            notification.success({
                message: 'Product deleted successfully',
            })
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = await getToken();
                const response = await ProductApi.getAll(token);
                if( response && response.data && response.data.metadata) {
                    const sortData = response.data.metadata.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setProducts(sortData);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [getToken]);

    // Filter the data based on the search and filter criteria
    const filteredData = products.filter(item => {
        const isProductNameMatch = item.name.toLowerCase().includes(searchText.toLowerCase());
        const isProductIdMatch = item._id.toLowerCase().includes(searchText.toLowerCase());

        return isProductNameMatch || isProductIdMatch;
    });

    // Define columns for the table
    const columns = [
        {
            title: 'Product ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render  : (text: string) => text.length > 50 ? text.slice(0, 50) + '...' : text
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text: number) => `$${text.toFixed(2)}`,
        },
        {
            title: 'Stock',
            dataIndex: 'stockQuantity',
            key: 'stockQuantity',
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
                        onClick={() => handleDeleteProduct(record._id)}
                        danger
                    >
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Filters Component */}
            <Filters
                searchText={searchText}
                setSearchText={setSearchText}
                text = "Search by Product ID or Product Name"
            />

            <Button className='mb-4' type="primary" onClick={showModal}>
                Create Product
            </Button>

            <Table columns={columns} dataSource={filteredData} />

             <CreateProductModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onCreate={handleCreateProduct}
            />
        </div>
    );
}
