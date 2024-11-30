"use client";

import React, { useState, useEffect } from "react";
import { Carousel, Typography } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ProductCard from "../../components/ProductCard";
import ProductApi from "@/api/Product";
import { CarouselRef } from "antd/es/carousel";

const { Title } = Typography;
interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  stockQuantity: number;
  images?: string[];
}

interface productProps {
  productIds: string[];
}

const SimilarProducts: React.FC<productProps> = ({ productIds }) => {
  const [similarProducts, setSimilarProducts] = useState<Product[]>();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductApi.getAll(null);
        console.log("Hello minh hieu", response?.data?.metadata);
        setSimilarProducts(response?.data?.metadata);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const carouselRef = React.useRef<CarouselRef | null>(null);

  const next = () => {
    carouselRef.current?.next();
  };

  const previous = () => {
    carouselRef.current?.prev();
  };

  if (similarProducts?.length === 0) return null;

  return (
    <div className="relative px-4 py-5 mb-10">
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
        {productIds?.length > 0 &&
          similarProducts
            ?.filter((item) => {
              return productIds?.includes(item?._id);
            })
            ?.map((product) => (
              <div key={product._id} className="px-2">
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
              </div>
            ))}
      </Carousel>
    </div>
  );
};

export default SimilarProducts;
