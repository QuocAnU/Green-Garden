/* eslint-disable no-unused-vars */
// CreateProductModal.tsx

import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import { NewProduct } from '../../product/page';

interface CreateProductModalProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: (newProduct: NewProduct ) => void;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({ visible, onCancel, onCreate }) => {
    const [form] = Form.useForm();

    const handleCreateProduct = (values: NewProduct) => {
        onCreate(values); 
        form.resetFields(); 
    };

    return (
        <Modal
            title="Create New Product"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={handleCreateProduct} layout="vertical">
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

                <Form.List
                    name="imageUrls"
                    initialValue={['']}
                    rules={[
                        {
                            validator: async (_, fields) => {
                                if (!fields || fields.length < 1) {
                                    return Promise.reject(new Error('At least one image URL is required'));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey }) => {
                                const validFieldKey = fieldKey ?? key; // Fallback to 'key' if 'fieldKey' is undefined

                                return (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            label={`Image URL ${key + 1}`}
                                            name={[name, 'imageUrl']}
                                            fieldKey={[validFieldKey, 'imageUrl']} // Use the fallback validFieldKey here
                                            rules={[{ required: true, message: 'Please enter an image URL' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Button danger onClick={() => remove(name)}>
                                            Remove
                                        </Button>
                                    </Space>
                                );
                            })}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                    Add Image URL
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>





                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Create Product
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateProductModal;
