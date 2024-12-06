"use client";

import React, { useState, useEffect } from "react";
import { Card, Empty, Spin } from "antd";
import { CartItemComponent } from "./components/CartItem";
import { CartSummaryComponent } from "./components/CartSummary";
import CartApi, { CartItemProps } from "@/api/Cart";
import { useAuth } from "@clerk/nextjs";
import { LoadingOutlined } from "@ant-design/icons";
import OrderApi from "@/api/Order";
import Modal from "./components/CheckoutModal";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import PaymentApi from "@/api/Payment";
import { PendingPayment } from "./components/Pending/PendingPayment";
import { PaidPayment } from "./components/Paid/PaidPayment";
import { CancelPayment } from "./components/Cancel/CancelPayment";

interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export interface CartItem {
  productId: Product;
  quantity: number;
  _id: string;
  itemTotal: number;
}

export interface OrderDetail {
  newOrder: {
    createdAt: string,
    customerID: string,
    orderCode: number,
    orderDate: string,
    shippingPrice: number,
    status: string,
    totalPrice: number,
    updatedAt: string,
    __v: number,
    _id: string
  }

  newOrderItems: {
    createdAt: string
    orderID: string
    priceAtTime: number
    productID: string
    quantity: number
    updatedAt: string
    __v: number
    _id: string
  }[]
}

export interface PaymentDetails {
  _id: string,
  paymentMethod: string,
  amount: number,
  orderCode: string,
  status: string,
  currency: string,
  description: string,
  items:
  {
    name: string,
    quantity: number,
    price: number,
    _id: string
  }[]
  createdAt: string,
  updatedAt: string,
  __v: number
  checkoutUrl: string,
}

const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    shipping: 200000,
    total: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [paymentList, setPaymentList] = useState<PaymentDetails[]>([]);
  const [pendingPayment, setPendingPayment] = useState<{
    items: { name: string; quantity: number; price: number; _id: string, }[];
    orderCode: string;
    _id: string;
    checkoutUrl: string;
  }[]>([]);
  const [cancelPayment, setCancelPayment] = useState<{
    items: { name: string; quantity: number; price: number; _id: string }[];
    orderCode: string;
    _id: string;
  }[]>([]);
  const [paidPayment, setPaidPayment] = useState<{
    items: { name: string; quantity: number; price: number; _id: string }[];
    orderCode: string;
    _id: string;
  }[]>([]);

  const { getToken } = useAuth();

  useEffect(() => {
    const pendingPayments = paymentList
      .filter((payment) => payment.status === "PENDING")
      .map((payment) => ({ items: payment.items, orderCode: payment.orderCode, _id: payment._id, checkoutUrl: payment.checkoutUrl }));

    const cancelPayments = paymentList
      .filter((payment) => payment.status === "cancelled")
      .map((payment) => ({ items: payment.items, orderCode: payment.orderCode, _id: payment._id }));

    const paidPayments = paymentList
      .filter((payment) => payment.status === "PAID")
      .map((payment) => ({ items: payment.items, orderCode: payment.orderCode, _id: payment._id }));

    setPendingPayment(pendingPayments);
    setCancelPayment(cancelPayments);
    setPaidPayment(paidPayments);

  }, [paymentList, refetch]);

  const handleCancelPayment = (orderCode: string) => {
    setPendingPayment((prev) => prev.filter((payment) => payment.orderCode !== orderCode));
  };

  useEffect(() => {
    const fetchCartList = async () => {
      try {
        const token = await getToken();
        const response = await CartApi.getAll(token);
        setItems(response?.data?.metadata.cart.items || []);
      } catch (error) {
        console.log("ShoppingCart get api", error);
        setItems([]);
      }
    };
    fetchCartList();
  }, [getToken, refetch]);

  useEffect(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
    setSummary({
      subtotal,
      shipping: 0,
      total: subtotal + 0,
    });
  }, [items]);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = await getToken();
      const data: CartItemProps = {
        productId,
        quantity,
      };
      await CartApi.update(token, data);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.log("Update Item", error);
    }
  };

  const handleRemoveItem = async (item: CartItem) => {
    try {
      setIsUpdating(true);
      const token = await getToken();
      await CartApi.delete(token, item.productId._id);
      setRefetch((prev) => !prev);
    } catch (error) {
      console.log("Remove Item", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCheckout = async () => {
    setShowCheckoutModal(true);
    const orders = items.map(item => ({
      quantity: item.quantity,
      priceAtTime: item.productId.price,
      productID: item.productId._id,
    }));

    const token = await getToken();
    try {
      const response = await OrderApi.create(token, orders);
      if (response && response.data && response.data.metadata) {
        setOrderDetail(response.data.metadata);
        setShowCheckoutModal(true);
      }
    } catch (error) {
      console.error('Error processing payment', error);
    }

    try {
      const responses = await Promise.all(
        items.map((item) =>
          CartApi.delete(token, item.productId._id)
        )
      );

      responses.forEach((response) => {
        if (response && response.data && response.data.metadata) {
          console.log(response.data.metadata)
        }
      });
    } catch (error) {
      console.error('Error deleting cart', error);
    }
  };

  useEffect(() => {
    const fetchAllPayments = async () => {
      try {
        const token = await getToken();
        const response = await PaymentApi.getAll(token);
        setPaymentList(response.data.metadata);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchAllPayments();
  }, [getToken]);

  // Loading spinner
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  // Render content based on loading state
  const renderCartContent = () => {
    if (items.length === 0) {
      return <Empty description="Giỏ hàng trống" className="py-8" />;
    }

    return items.map((item) => (
      <CartItemComponent
        key={item.productId._id}
        item={item}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveItem}
      />
    ));
  };

  const cartTabs: TabsProps["items"] = [
    {
      key: "cart",
      label: "Giỏ hàng",
      children: (
        <div className="max-w-7xl mx-auto px-4 py-8">
          {isUpdating && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10">
              <Spin indicator={loadingIcon} />
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-medium mb-4">Giỏ hàng</h2>
              <Card className="mb-6">{renderCartContent()}</Card>
            </div>

            <div className="lg:col-span-1">
              <CartSummaryComponent summary={summary} onCheckout={handleCheckout} />
            </div>
          </div>
          {showCheckoutModal && orderDetail !== null && <Modal setShowCheckoutModal={setShowCheckoutModal} orderDetail={orderDetail} />}
        </div>
      )
    },
    {
      key: 'pending',
      label: 'Chờ thanh toán',
      children: (
        <PendingPayment pendingPayment={pendingPayment} onCancelPayment={handleCancelPayment} />
      )
    },
    {
      key: 'tracking',
      label: 'Đã thanh toán',
      children: (
        <PaidPayment paidPayment={paidPayment} />
      )
    },
    {
      key: 'cancel',
      label: 'Đã hủy',
      children: (
        <CancelPayment cancelPayment={cancelPayment} />
      )
    },
  ]
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Tabs
          defaultActiveKey="cart"
          items={cartTabs}
          className="bg-white rounded-lg shadow-sm"
          size="large"
          tabBarStyle={{
            marginBottom: 0,
            paddingLeft: 24,
            borderBottom: "1px solid #f0f0f0",
          }}
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
