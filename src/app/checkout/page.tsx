"use client";

import React, { useState, useEffect } from "react";
import { Card, Empty, Spin } from "antd";
import { CartItemComponent } from "./components/CartItem";
import { CartSummaryComponent } from "./components/CartSummary";
import CartApi, { CartItemProps } from "@/api/Cart";
import { useAuth } from "@clerk/nextjs";
import { LoadingOutlined } from "@ant-design/icons";

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

const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [refetch, setRefetch] = useState(false);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    shipping: 200000,
    total: 0,
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { getToken } = useAuth();

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

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", items);
  };

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

  return (
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
    </div>
  );
};

export default ShoppingCart;
