// ProductDetail.tsx

"use client";

import React, { useState, memo, useCallback } from "react";
import { Button, InputNumber, message } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import SimilarProducts from "./components/SimilarProduct";
import DeliveryInfo from "./components/DeliveryInfo";
import ProductReviewForm from "./components/ProductReviewForm";

// Types
interface ProductImage {
  src: string;
  alt: string;
}

interface ProductDimensions {
  pot: string;
  height: string;
}

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  status: string;
  description: string;
  scientificName: string;
  otherNames: string;
  careLevel: string;
  lightRequirement: string;
  wateringNeeds: string;
  dimensions: ProductDimensions;
  images: ProductImage[];
}

interface DetailRowProps {
  label: string;
  value: string;
}

interface ProductImageProps {
  src: string;
  alt: string;
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
  ({ src, alt, onClick, isSelected, priority = false }: ProductImageProps) => (
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
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-fill"
      />
    </div>
  )
);
ProductImage.displayName = "ProductImage";

const ProductDetailView: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product: ProductDetail = {
    id: "SGHE020",
    name: "Cây ngũ gia bì cẩm thạch nhỏ chậu ương",
    price: 800000,
    status: "còn hàng",
    description:
      "Cây Bàng Singapore LỚn có thể dễ dàng nhận ra ở những góc quán cafe, làm văn phòng. Với những chiếc lá cứng bóng bẩy đậm vẻ lâu năm, nhưng gần là hình chân chim nổi bật.",
    scientificName: "Ficus lyrata",
    otherNames: "Bàng Singapore / Sung lý bá",
    careLevel: "Dễ chăm sóc",
    lightRequirement: "Nắng trực tiếp / Ánh sáng tán xạ",
    wateringNeeds: "Tưới nước 2 - 3 lần/tuần",
    dimensions: {
      pot: "Kích thước chậu: 12×12 cm (DxC)",
      height: "Chiều cao tổng: 25 - 30 cm",
    },
    images: [
      {
        src: "https://media.istockphoto.com/id/680614076/vi/anh/c%C3%A2y-c%C3%B4-l%E1%BA%ADp.jpg?s=1024x1024&w=is&k=20&c=RzxgGqv-MTDOBg8uHEZbW_zJQ1C5lfi-6CJnHg9NarU=",
        alt: "Cây ngũ gia bì - Hình ảnh chính",
      },
      {
        src: "https://media.istockphoto.com/id/1451659440/vi/anh/c%C3%A2y-%C4%91%C6%B0%E1%BB%A3c-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng-ph%C3%B9-h%E1%BB%A3p-cho-c%E1%BA%A3-in-%E1%BA%A5n-v%C3%A0-trang-web.jpg?s=2048x2048&w=is&k=20&c=es4nc5gqmO2X_xxoJrT3RBQafrWvaeJebp69puvh01w=",
        alt: "Cây ngũ gia bì - Chi tiết lá",
      },
      {
        src: "https://media.istockphoto.com/id/1334783309/vi/anh/c%C3%A2y-xanh-bi%E1%BB%87t-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=2048x2048&w=is&k=20&c=VKyfbs9dHfixaKoenRcj0m0a4NgR1kiXEMPU8m9XCqo=",
        alt: "Cây ngũ gia bì - Toàn cảnh",
      },
      {
        src: "https://media.istockphoto.com/id/1152424659/vi/anh/c%C3%A2y-l%E1%BB%9Bn-b%E1%BB%8B-c%C3%B4-l%E1%BA%ADp-tr%C3%AAn-n%E1%BB%81n-tr%E1%BA%AFng.jpg?s=1024x1024&w=is&k=20&c=MX9qoICM1azWPaPjelbKsa1EqBXTNvZCSFdVlIcNLkA=",
        alt: "Cây ngũ gia bì - Chi tiết thân",
      },
    ],
  };

  const handleQuantityChange = useCallback((value: number | null) => {
    setQuantity(value || 1);
  }, []);

  const handleAddToCart = useCallback(async () => {
    try {
      setIsAddingToCart(true);
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success("Đã thêm sản phẩm vào giỏ hàng");
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsAddingToCart(false);
    }
  }, []);

  const handleAddToWishlist = useCallback(() => {
    message.success("Đã thêm vào danh sách yêu thích");
  }, []);

  return (
    <main className="container mx-auto px-4 py-8 max-w-[1440px] my-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-10">
        {/* Image Section */}
        <section className="space-y-4 sticky top-4" aria-label="Product Images">
          <ProductImage
            src={product.images[selectedImageIndex].src}
            alt={product.images[selectedImageIndex].alt}
            priority
          />

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <ProductImage
                key={index}
                src={image.src}
                alt={image.alt}
                onClick={() => setSelectedImageIndex(index)}
                isSelected={selectedImageIndex === index}
              />
            ))}
          </div>
        </section>

        {/* Product Info Section */}
        <section className="space-y-6">
          <header>
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-sm text-gray-500">Mã: {product.id}</p>
          </header>

          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-green-500">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500 capitalize">
              Tình trạng: {product.status}
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            <div className="space-y-2 border rounded-lg p-4 bg-gray-50">
              <DetailRow label="TÊN KHOA HỌC" value={product.scientificName} />
              <DetailRow label="TÊN GỌI KHÁC" value={product.otherNames} />
              <DetailRow label="ĐỘ KHÓ" value={product.careLevel} />
              <DetailRow
                label="YÊU CẦU ÁNH SÁNG"
                value={product.lightRequirement}
              />
              <DetailRow label="NHU CẦU NƯỚC" value={product.wateringNeeds} />
              <DetailRow
                label="KÍCH THƯỚC CÂY"
                value={product.dimensions.pot}
              />
              <DetailRow label="" value={product.dimensions.height} />
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
                max={99}
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
      <ProductReviewForm />
      <SimilarProducts />
    </main>
  );
};

export default ProductDetailView;
