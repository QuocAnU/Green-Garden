"use client";

import React from "react";
import { Typography, Row, Col, Button, Space } from "antd";
import ProductCard from "./ProductCard";
import { FilterOutlined } from "@ant-design/icons";

const { Title } = Typography;

interface Product {
  id: number;
  title: string;
  price: number;
  soldCount: number;
  imageUrl: string;
  discount?: number;
}

const MOCK_PRODUCTS: Product[] = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    title: "Jade Terrarium",
    price: 350,
    soldCount: 30,
    imageUrl:
      "https://media.istockphoto.com/id/819464736/vi/anh/c%C3%A2y-s%E1%BB%93i-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=XM-kVEVXQzU3ZNXEJ3qmy-mW46gSQj5xS5RTd8ngGw8=",
    discount: index === 0 ? 25 : undefined,
  }));

const ProductList: React.FC = () => {
  return (
    <div className="px-6 max-w-screen-lg mx-auto">
      {/* Header section */}
      <div className="flex justify-between items-center mb-5">
        <Space>
          <Title level={4} className="m-0">
            Cây cảnh để bàn
          </Title>
          <span className="text-gray-500">
            ({MOCK_PRODUCTS.length} sản phẩm)
          </span>
        </Space>

        <Button icon={<FilterOutlined />} className="hover:bg-gray-200">
          filter & sort
        </Button>
      </div>

      {/* Products grid */}
      <Row gutter={[16, 16]}>
        {MOCK_PRODUCTS.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8}>
            <ProductCard {...product} />
          </Col>
        ))}
      </Row>

      {/* View more button */}
      <div className="text-center mt-8">
        <Button type="primary" className="bg-green-800 hover:bg-green-700 w-52">
          Xem thêm
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
