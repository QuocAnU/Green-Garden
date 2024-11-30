"use client";
import React, { useState, useEffect } from "react";
import { Card, Empty } from "antd";
import { CartItemComponent } from "./components/CartItem";
import { CartSummaryComponent } from "./components/CartSummary";
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

const ShoppingCart: React.FC = () => {
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
