"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import Filters from './../components/Filters'; // Adjust the import path as necessary
import moment from 'moment';
import { useAuth } from '@clerk/nextjs';
import ProductApi from '@/api/Product';

import CreateProductModal from '../components/Modal/CreateProductModal';

export interface ImageObj {
    imageUrl: string;
}

export interface NewProduct {
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    imageUrls: ImageObj[];
    images: string | string[];
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
    category: string;
    images: string | string[];
    createdAt: string;
    updatedAt: string;
}

export default function ProductManagement() {
    const [searchText, setSearchText] = useState('');
    const [products, setProducts] = useState<Product[]>([]); // Initialize as an empty array
    const { getToken } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Handle modal visibility
    const showModal = (product?: Product) => {
        setEditingProduct(product || null); // Set product for editing or null for creating
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingProduct(null); // Reset editing product when closing the modal
    };

    // Handle creating a product (called from CreateProductModal)
    const handleCreateOrUpdateProduct = async (newProduct: NewProduct) => {
        const data = { ...newProduct };
        if (newProduct.images && Array.isArray(newProduct.images)) {
        data.imageUrls = newProduct.images.map((image) => ({ imageUrl: image })); // Convert strings to ImageObj[]
        }
        if (typeof newProduct.images === "string") {
            data.images = newProduct.images.split(',').map((url) => url.trim());
        }

        const token = await getToken();
        try {
            let response;
            if (editingProduct) {
                // Update product
                response = await ProductApi.update(token, editingProduct._id, data);
                notification.success({ message: 'Product updated successfully' });
            } else {
                // Create product
                response = await ProductApi.create(token, data);
                notification.success({ message: 'Product created successfully' });
            }

            if (response && response.data && response.data.metadata) {
                const newProductData = response.data.metadata; // Assuming metadata is an object
                if (editingProduct) {
                    // Update the list after editing
                    setProducts((prevProducts) =>
                        prevProducts.map((product) =>
                            product._id === editingProduct._id ? newProductData : product
                        )
                    );
                } else {
                    // Add the new product to the list
                    setProducts((prevProducts) => [newProductData, ...prevProducts]);
                }
            }
        } catch (error) {
            console.error('Error creating/updating product:', error);
        }

        setIsModalVisible(false); // Close the modal
    };

    const handleEditProduct = (product: Product) => {
        showModal(product); // Open modal for editing product
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const token = await getToken();
            await ProductApi.delete(token, productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
            notification.success({
                message: 'Product deleted successfully',
            });
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = await getToken();
                const response = await ProductApi.getAll(token);
                if (response && response.data && response.data.metadata) {
                    const sortedData = response.data.metadata.sort(
                        (a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    );
                    setProducts(sortedData);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [getToken]);

    // Filter the data based on the search and filter criteria
    const filteredData = products.filter((item) => {
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
            render: (text: string) => (text.length > 20 ? text.slice(0, 20) + '...' : text),

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
            render: (_: unknown, record: Product) => (
                <div className="grid grid-cols-2">
                    <Button icon={<EditOutlined />} onClick={() => handleEditProduct(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDeleteProduct(record._id)} danger />
                </div>
            ),
        },
    ];

    return (
        <div>
            {/* Filters Component */}
            <Filters searchText={searchText} setSearchText={setSearchText} text="Search by Product ID or Product Name" />

            <Button className="mb-4" type="primary" onClick={() => showModal()}>
                Create Product
            </Button>

            <Table columns={columns} dataSource={filteredData} rowKey="_id" />

            <CreateProductModal
                visible={isModalVisible}
                onCancel={handleCancel}
                onSubmit={handleCreateOrUpdateProduct}
                product={editingProduct}
            />

        </div>
    );
}
