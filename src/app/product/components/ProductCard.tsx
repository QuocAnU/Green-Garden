"use client";

import { Badge, Card } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id?: string;
  title: string;
  price: number;
  quantity: number;
  soldCount: number;
  imageUrl: string;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  quantity,
  soldCount,
  imageUrl = "/api/placeholder/400/320",
  discount,
}) => {
  const cardCoverStyle: React.CSSProperties = {
    height: 200,
    objectFit: "cover",
    objectPosition: "center",
    padding: "5px",
  };
  const router = useRouter();

  return (
    <Card
      hoverable
      onClick={() => router.push(`/product/${id}`)}
      cover={
        <div style={{ position: "relative" }} className="p-5 rounded-4">
          <img
            alt={title}
            src={
              imageUrl ||
              "https://media.istockphoto.com/id/819464736/vi/anh/c%C3%A2y-s%E1%BB%93i-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=XM-kVEVXQzU3ZNXEJ3qmy-mW46gSQj5xS5RTd8ngGw8="
            }
            style={cardCoverStyle}
          />
          {discount && (
            <Badge.Ribbon
              text={`${discount}% off`}
              color="green"
              style={{
                position: "absolute",
                top: 12,
                right: 0,
              }}
            />
          )}
        </div>
      }
      style={{ padding: 16 }}
    >
      <p className="font-bold text-xl capitalize line-clamp-2 overflow-clip truncate">
        {title}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="font-bold text-2xl text-[#2D5A27]">
          $ {price.toLocaleString()}
        </p>
        <div className="text-sm font-normal">
          <p>
            Số lượng: <span className="font-semibold"> {quantity} </span>
          </p>
          <p>
            Đã bán: <span className="font-semibold"> {soldCount} </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
