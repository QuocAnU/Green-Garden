/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import { Button, InputNumber, message } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import SimilarProducts from "./components/SimilarProduct";
import DeliveryInfo from "./components/DeliveryInfo";
import ProductApi from "@/api/Product";
import { useParams } from "next/navigation";
import ProductReviews from "./components/ProductReviews";
import { useRouter } from "next/navigation";
import CartApi from "@/api/Cart";
import { useAuth } from "@clerk/nextjs";

// Types
interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductDetailProps {
  _id: string;
  name: string | "";
  price: number | 0;
  stockQuantity: number | 0;
  description: string | "";
  images: string[] | [];
  averageRating: number | 0;
  type: string | "";
  tags: string[] | [];
  reviews: string[] | [];
  difficultyLevel: string | "";
  otherNames: string[] | [];
  scientificName: string | "";
  lightRequirement: string | "";
  waterRequirement: string | "";
  plantSize: string | "";
  length: number | 0;
  height: number | 0;
  relatedProducts: string[] | [];
}

interface DetailRowProps {
  label: string;
  value: string;
}

interface ProductImageProps {
  src: string;
  alt?: string;
  onClick?: () => void;
  isSelected?: boolean;
  priority?: boolean;
}

// Utility function for formatting price
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

// Memoized Components
const DetailRow = memo(({ label, value }: DetailRowProps) => (
  <div className="grid grid-cols-2 gap-4 py-1">
    <span className="text-gray-500 font-medium">{label}</span>
    <span className="text-gray-900">{value}</span>
  </div>
));
DetailRow.displayName = "DetailRow";

const ProductImage = memo(
  ({ src, alt, onClick, isSelected }: ProductImageProps) => (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
      relative aspect-square rounded-lg overflow-hidden max-h-[500px] w-full
      ${onClick ? "cursor-pointer transition-transform hover:scale-105" : ""}
      ${isSelected ? "ring-2 ring-green-500" : "ring-1 ring-gray-200"}
    `}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <img
        src={src}
        alt={alt || "Product Image"}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  )
);
ProductImage.displayName = "ProductImage";

const ProductDetailPropsView: React.FC = () => {
  const [product, setProduct] = useState<ProductDetailProps | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchProductDetailProps = async () => {
      try {
        setIsLoading(true);
        const response = await ProductApi.getById(null, params?.Id as string);
        const productData = response?.data?.metadata;
        setProduct(productData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        message.error("Không thể tải thông tin sản phẩm");
        setIsLoading(false);
      }
    };

    if (params?.Id) {
      fetchProductDetailProps();
    }
  }, [params?.Id]);

  const handleQuantityChange = useCallback((value: number | null) => {
    setQuantity(value || 1);
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product) return;

    try {
      setIsAddingToCart(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const data = {
        productId: product._id,
        quantity,
      };
      const token = await getToken();
      const response = await CartApi.add(token, data);

      if (response.status === 200) {
        router.push("/checkout");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsAddingToCart(false);
    }
  }, [product, quantity, router, getToken]);

  const handleAddToWishlist = useCallback(() => {
    message.success("Đã thêm vào danh sách yêu thích");
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Đang tải...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Không tìm thấy sản phẩm</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-[1440px] my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
        {/* Image Section */}
        <section className="space-y-4 sticky top-4" aria-label="Product Images">
          <ProductImage
            src={product?.images?.[selectedImageIndex]}
            alt={`${product?.name} - Hình ảnh ${selectedImageIndex + 1}`}
            priority
          />

          <div className="grid grid-cols-4 gap-2">
            {product?.images?.length > 0 &&
              product?.images?.map((imageUrl, index) => (
                <ProductImage
                  key={index}
                  src={imageUrl}
                  alt={`${product?.name} - Hình ảnh ${index + 1}`}
                  onClick={() => setSelectedImageIndex(index)}
                  isSelected={selectedImageIndex === index}
                />
              ))}
          </div>
        </section>

        {/* Product Info Section */}
        <section className="space-y-6">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">
              {product?.name}
            </h1>
            <p className="text-sm text-gray-500">Mã: {product?._id}</p>
          </header>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-500">
              {formatPrice(product?.price)}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              Tình trạng: {product?.stockQuantity > 0 ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {product?.description}
            </p>

            {/* You might want to add more detailed information here */}
            <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
              <DetailRow
                label="Tên khoa học"
                value={product?.scientificName || ""}
              />
              <DetailRow
                label="Tên gọi khác"
                value={product?.otherNames?.join(", ") || ""}
              />
              <DetailRow label="Độ khó" value={product?.difficultyLevel} />
              <DetailRow
                label="Yêu cầu ánh sáng"
                value={product?.lightRequirement || ""}
              />
              <DetailRow
                label="Nhu cầu nước"
                value={product?.waterRequirement}
              />
              <DetailRow
                label="Kích thước cây"
                value={`${product?.plantSize || ""} (${product?.height} x ${
                  product?.length
                })`}
              />
              <DetailRow
                label="Số lượng cây"
                value={`${product?.stockQuantity || 0}`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="text-gray-700 font-medium">
                Số lượng:
              </label>
              <InputNumber
                id="quantity"
                min={1}
                max={product?.stockQuantity}
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Số lượng sản phẩm"
                className="w-20"
              />
            </div>

            <div className="flex space-x-4">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                loading={isAddingToCart}
                disabled={product?.stockQuantity === 0}
                className="bg-green-500 hover:bg-green-600 min-w-[200px]"
              >
                {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </Button>
              <Button
                size="large"
                icon={<HeartOutlined />}
                onClick={handleAddToWishlist}
                className="min-w-[120px]"
              >
                Yêu thích
              </Button>
            </div>
          </div>

          <DeliveryInfo />
        </section>
      </div>
      <ProductReviews product={product} />
      <SimilarProducts productIds={product?.relatedProducts} />
    </main>
  );
};

export default ProductDetailPropsView;
