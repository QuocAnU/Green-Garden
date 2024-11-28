"use client";

// components/CartItem.tsx
import { InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

// utils/formatCurrency.ts
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
};

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-start py-4 border-b max-w-[1336px] mx-auto min-h-[40vh]">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <img
          src={item.image}
          alt={item.name}
          className="absolute top-0 left-0 w-full h-full object-fill rounded-md"
        />
      </div>

      <div className="flex-grow ml-4">
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-green-500 font-medium">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Button
            size="small"
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => onUpdateQuantity(item.id, value || 1)}
            className="w-16 mx-2"
          />
          <Button
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(item.id)}
          className="ml-4"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

// components/CartSummary.tsx
import { Button, Divider } from "antd";

interface CartSummaryProps {
  summary: CartSummary;
  onCheckout: () => void;
}

export const CartSummaryComponent: React.FC<CartSummaryProps> = ({
  summary,
  onCheckout,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Chi tiết đơn hàng</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span className="font-medium text-green-500">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span className="font-medium text-green-500">
            {formatCurrency(summary.shipping)}
          </span>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-between text-lg font-medium">
          <span>Tổng giá trị</span>
          <span className="text-green-500">
            {formatCurrency(summary.total)}
          </span>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={onCheckout}
          className="mt-6 bg-green-500 hover:bg-green-600"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

// components/ShoppingCart.tsx
import React, { useState, useEffect } from "react";
import { Card, Empty } from "antd";

const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Cây ngũ gia bì cẩm thạch nhỏ chậu sứ SCHE020",
    price: 800000,
    quantity: 1,
    image:
      "https://media.istockphoto.com/id/819464736/vi/anh/c%C3%A2y-s%E1%BB%93i-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=XM-kVEVXQzU3ZNXEJ3qmy-mW46gSQj5xS5RTd8ngGw8=",
  },
];

export const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    shipping: 200000,
    total: 0,
  });

  useEffect(() => {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSummary({
      subtotal,
      shipping: 200000,
      total: subtotal + 200000,
    });
  }, [items]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", items);
    // Implement checkout logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card title="Giỏ hàng" className="mb-6">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItemComponent
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))
            ) : (
              <Empty description="Giỏ hàng trống" className="py-8" />
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <CartSummaryComponent summary={summary} onCheckout={handleCheckout} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
