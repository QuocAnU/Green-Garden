"use client";

import React, { useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import ProductCard from "./ProductCard";
import { FilterOutlined } from "@ant-design/icons";
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  stockQuantity: number;
  images?: string[];
}

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  const [productList, setProductList] = useState<Product[]>(products || []);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  return (
    <div className="px-6 max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <span className="m-0 text-16 font-semibold">Cây cảnh để bàn</span>
          <span className="text-gray-500">({productList.length} sản phẩm)</span>
        </div>

        <Button icon={<FilterOutlined />} className="hover:bg-gray-200">
          filter & sort
        </Button>
      </div>

      {/* Products grid */}
      {productList?.length === 0 ? (
        <div className="text-center text-gray-500">Không có sản phẩm</div>
      ) : (
        <Row gutter={[16, 16]}>
          {productList?.map((product) => (
            <Col key={product._id} xs={24} sm={12} md={8}>
              <ProductCard
                id={product?._id}
                title={product?.name}
                price={product?.price}
                quantity={product?.stockQuantity}
                imageUrl={
                  product?.images?.[0] ||
                  "https://media.istockphoto.com/id/819464736/vi/anh/c%C3%A2y-s%E1%BB%93i-tr%C6%B0%E1%BB%9Fng-th%C3%A0nh-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=XM-kVEVXQzU3ZNXEJ3qmy-mW46gSQj5xS5RTd8ngGw8="
                }
                soldCount={0}
              />
            </Col>
          ))}
        </Row>
      )}

      {/* View more button */}
      {productList?.length > 0 && (
        <div className="text-center mt-8">
          <Button
            type="primary"
            className="bg-green-800 hover:bg-green-700 w-52"
          >
            Xem thêm
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
