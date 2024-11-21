"use client";

import { Badge, Card } from "antd";
import React from "react";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id?: number;
  title: string;
  price: number;
  soldCount: number;
  imageUrl: string;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
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
          <img alt={title} src={imageUrl} style={cardCoverStyle} />
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
      bodyStyle={{ padding: 16 }}
    >
      <p className="font-bold text-xl">{title}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="font-normal">$ {price.toLocaleString()}</p>
        <p>Đã bán: {soldCount}</p>
      </div>
    </Card>
  );
};

export default ProductCard;
