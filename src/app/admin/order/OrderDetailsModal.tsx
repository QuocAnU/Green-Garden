"use client";

import React, { useEffect, useCallback, useState } from 'react';
import { Modal, Button } from 'antd';
import OrderApi from '@/api/Order';
import dynamic from 'next/dynamic';
import './OrderDetailsModal.css';

import { useAuth } from '@clerk/nextjs';

// Import html2pdf.js dynamically with the correct type
const html2pdf = dynamic(() => import('html2pdf.js'), { ssr: false }) as unknown as (element: HTMLElement, options?: Html2PdfOptions) => void;

interface Product {
  name: string;
  quantity: number;
  price: number;
  discount: number;
  total: number;
}

interface OrderDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  orderID: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ visible, onClose, orderID }) => {

  const [order, setOrder] = useState<any>(null);
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

  const handlePrint = useCallback(() => {

    const element = document.getElementById('order-details');
    if (!element) {
      console.error('Order details element not found');
      return;
    }

    if (html2pdf) {
      try {
        // Generate PDF with html2pdf
        html2pdf(element, {
          margin: 10,
          filename: 'order-details.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        }).then(() => {
          console.log('PDF generated successfully');
        }).catch((err: Error) => {
          console.error('Error generating PDF:', err.message);
        });
      } catch (error) {
        console.error('Unexpected error during PDF generation:', error);
      }
    } else {
      console.error('html2pdf.js is not loaded');
    }
  }, [order]);

  return (
    <Modal
      title={<span className='text-2xl text-center flex justify-center'>Order Details</span>}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="print" onClick={handlePrint} disabled={!order}>
          Download PDF
        </Button>,
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
              {order.orderItems.map((product, index) => (
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
