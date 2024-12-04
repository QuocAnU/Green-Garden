/* eslint-disable no-unused-vars */
// CreateProductModal.tsx

import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Select } from 'antd';


import { NewProduct, Product } from '../../product/page';

interface CreateProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onSubmit: (product: NewProduct) => void;
    product?: Product | null
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ visible, onCancel, onSubmit, product }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (product) {
            console.log(product);
        form.setFieldsValue(product); // Pre-fill form with product data
        } else {
        form.resetFields(); // Clear form for new product
        }
    }, [product, form]);

    const handleFormSubmit = (values: NewProduct) => {
        onSubmit(values);
        form.resetFields();
    };

    const onCancelModal = () => {
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title={product ? 'Edit Product' : 'Create New Product'}
            visible={visible}
            onCancel={onCancelModal}
            footer={null}
        >
            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter the product name' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter the product description' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                    label="Price"
                    name="price"
                    rules={[{ required: true, message: 'Please enter the product price' }]}
                >
                    <InputNumber min={0} step={0.01} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Stock Quantity"
                    name="stockQuantity"
                    rules={[{ required: true, message: 'Please enter the stock quantity' }]}
                >
                    <InputNumber min={0} style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{ required: true, message: 'Please select the product category' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='Type'
                    name='type'
                    rules={[{ required: true, message: 'Please select the product type' }]}
                >
                    <Select>
                        <Select.Option value="Plant">cây cảnh</Select.Option>
                        <Select.Option value="Pot">chậu cảnh</Select.Option>
                    </Select>
                </Form.Item>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        label="Height"
                        name="height"
                        rules={[{ required: true, message: 'Please enter the product height' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Weight"
                        name="weight"
                        rules={[{ required: true, message: 'Please enter the product weight' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Width"
                        name="width"
                        rules={[{ required: true, message: 'Please enter the product width' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Length"
                        name="length"
                        rules={[{ required: true, message: 'Please enter the product length' }]}
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>

                </div>

                <Form.Item
                    label="ImageUrls ex: https://example.com/image1.jpg,https://example.com/image2.jpg"
                    name="images"
                    rules={[{ required: true, message: 'Please upload an image' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        {product ? 'Update Product' : 'Create Product'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProductModal;
