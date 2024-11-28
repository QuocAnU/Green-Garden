"use client";

import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import OrderApi from '@/api/Order';
import './OrderDetailsModal.css';

import { useAuth } from '@clerk/nextjs';


interface orderItems {
  productName: string;
  priceAtTime: number;
  quantity: number;

}
interface OrderDetails {
  _id: string;
  customerName: string;
  orderCode: string;
  orderDate: string;
  email: string;
  phone: string;
  address: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderItems: orderItems[]
}

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  orderID: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ visible, onClose, orderID }) => {

  const [order, setOrder] = useState<OrderDetails>();
  const { getToken } = useAuth();


  useEffect(() => {
    if (orderID) {
      const fetchOrder = async () => {
        const token = await getToken();
        try {
          const order = await OrderApi.getOrderDetail(token,orderID);
          setOrder(order.data.metadata);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      }
      fetchOrder();
    }
  }, [orderID, getToken]);

  return (
    <Modal
      title={<span className='text-2xl text-center flex justify-center'>Order Details</span>}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      {order ? (
        <div className="order-details" id="order-details">
          <div className="order-header">
            <p><strong>Order ID:</strong> #{order._id}</p>
            <p><strong>Order Code:</strong> {order.orderCode}</p>
            <p><strong>Customer:</strong> {order.customerName}</p>
            <p><strong>Order Date:</strong> {order.orderDate}</p>
          </div>
          <table className="order-table">
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>QTY</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((product : orderItems, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.productName}</td>
                  <td>${product.priceAtTime.toLocaleString()}</td>
                  <td>{product.quantity}x</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-summary">
            <p><strong>Total:</strong> <span className="total">${order.totalAmount}</span></p>
          </div>
        </div>
      ) : (
        <p>No order details available.</p>
      )}
    </Modal>
  );
};

export default OrderDetailsModal;
