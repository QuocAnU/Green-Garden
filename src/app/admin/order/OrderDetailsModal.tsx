// OrderDetailsModal.tsx

"use client"; // Add this line at the top of the file

import React from 'react';
import { Modal, Button } from 'antd';
import moment from 'moment';

interface Product {
    name: string;
    quantity: number;
    price: number;
}

interface OrderDetailsModalProps {
    visible: boolean;
    onClose: () => void;
    order: {
        orderId: string;
        customerName: string;
        products: Product[];
        total: number;
        profit: number;
        status: string;
        createdAt: string;
    } | null; // Specify a more detailed order structure
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ visible, onClose, order }) => {
    const handlePrint = () => {
        const printContent = document.getElementById('order-details');
        if (printContent) {
            const newWin = window.open('', '_blank');
            newWin?.document.write(`
                <html>
                    <head><title>Print Order</title></head>
                    <body>
                        <h1>Order ID: ${order?.orderId}</h1>
                        <p><strong>Customer Name:</strong> ${order?.customerName}</p>
                        <table>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            ${order?.products.map(product => `
                                <tr>
                                    <td>${product.name}</td>
                                    <td>${product.quantity}</td>
                                    <td>$${product.price.toFixed(2)}</td>
                                </tr>
                            `).join('')}
                        </table>
                        <p><strong>Total:</strong> $${order?.total.toFixed(2)}</p>
                        <p><strong>Profit:</strong> $${order?.profit.toFixed(2)}</p>
                        <p><strong>Status:</strong> ${order?.status}</p>
                        <p><strong>Created At:</strong> ${moment(order?.createdAt).format('YYYY-MM-DD')}</p>
                    </body>
                </html>
            `);
            newWin?.document.close();
            newWin?.print();
            newWin?.close();
        }
    };

    return (
        <Modal
            title="Order Details"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="print" onClick={handlePrint}>
                    Print
                </Button>,
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
            ]}
        >
            {order && (
                <div id="order-details">
                    <h2>Order ID: {order.orderId}</h2>
                    <p><strong>Customer Name:</strong> {order.customerName}</p>
                    <h3>Products</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
                    <p><strong>Profit:</strong> ${order.profit.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Created At:</strong> {moment(order.createdAt).format('YYYY-MM-DD')}</p>
                </div>
            )}
        </Modal>
    );
};

export default OrderDetailsModal;
