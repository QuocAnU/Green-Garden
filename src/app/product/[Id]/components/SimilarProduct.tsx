"use client";

import React from "react";
import { Carousel, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductCard from "../../components/ProductCard";
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
      "https://media.istockphoto.com/id/1451659440/vi/anh/c%C3%A2y-%C4%91%C6%B0%E1%BB%A3c-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-ph%C3%B9-h%E1%BB%A3p-cho-c%E1%BA%A3-in-%E1%BA%A5n-v%C3%A0-trang-web.jpg?s=2048x2048&w=is&k=20&c=es4nc5gqmO2X_xxoJrT3RBQafrWvaeJebp69puvh01w=",
    discount: index === 0 ? 25 : undefined,
  }));

const SimilarProducts: React.FC = () => {
  const carouselRef = React.useRef<any>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  return (
    <div className="relative py-5 mb-10">
      <Title level={4} className="m-0">
        Sản phẩm tương tự
      </Title>

      <button
        onClick={previous}
        className="absolute right-[65px] top-[30px] -translate-y-1/2 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <LeftOutlined />
      </button>

      <button
        onClick={next}
        className="absolute right-[20px] top-[30px] -translate-y-1/2 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white transition-colors"
      >
        <RightOutlined />
      </button>

      <Carousel
        ref={carouselRef}
        slidesToShow={4}
        slidesToScroll={2}
        dots={false}
        className="mx-4"
        responsive={[
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {MOCK_PRODUCTS.map((product) => (
          <div className="px-2">
            <ProductCard {...product} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SimilarProducts;
