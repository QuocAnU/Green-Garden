// ProductReviews.tsx
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  Form,
  Input,
  Rate,
  Button,
  message,
  Typography,
  Empty,
} from "antd";
import { ProductDetailProps } from "../page";
import { useParams } from "next/navigation";
import * as Yup from "yup";
import ReviewApi from "@/api/Review";
import { useAuth } from "@clerk/nextjs";
const { TextArea } = Input;
const { Title, Text } = Typography;

// Validation Schema
const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Vui lòng chọn số sao")
    .max(5, "Đánh giá không được vượt quá 5 sao")
    .required("Vui lòng chọn số sao"),
  comment: Yup.string()
    .trim()
    .min(10, "Nhận xét phải có ít nhất 10 ký tự")
    .max(500, "Nhận xét không được vượt quá 500 ký tự")
    .required("Vui lòng nhập nhận xét"),
});

// Types
type ReviewSchemaType = Yup.InferType<typeof reviewSchema>;

interface Review {
  rating: number;
  comment: string;
}

interface ProductReviewsProps {
  product: ProductDetailProps;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const params = useParams();
  const { getToken } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  // Simulated fetch reviews (replace with actual API call)
  const fetchProductReviews = async () => {
    try {
      setLoading(true);
      const response = await ReviewApi.getAll(null, params?.Id as string);
      // Simulated data for now
      setReviews([...response?.data?.metadata]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductReviews();
  }, []);

  const onSubmit = async (data: ReviewSchemaType) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newReview: Review = {
        rating: data.rating,
        comment: data.comment,
      };
      try {
        const token = await getToken();
        const response = await ReviewApi.create(
          token,
          params?.Id as string,
          newReview
        );
        await fetchProductReviews();
      } catch (error) {}

      setReviews((prevReviews) => [newReview, ...prevReviews]);
      // Reset form
      reset();
    } finally {
      setLoading(false);
    }
  };

  const renderReviewsList = () => {
    if (reviews.length === 0) {
      return <Empty description="Chưa có đánh giá" />;
    }

    return reviews.map((review, index) => (
      <div key={index} className="border-b py-4 last:border-b-0">
        <div className="flex items-center mb-2">
          <Rate
            disabled
            defaultValue={review.rating}
            className="text-yellow-400 mr-2"
          />
          <Text type="secondary" className="text-sm">
            {new Date().toLocaleDateString()}
          </Text>
        </div>
        <Text>{review.comment}</Text>
      </div>
    ));
  };

  return (
    <Card
      className="w-full mb-10"
      title={
        <div className="space-y-1">
          <Title level={4} className="!mb-0">
            Đánh giá
          </Title>
          <Text type="secondary">{reviews.length} đánh giá</Text>
        </div>
      }
    >
      {contextHolder}
      <div className="p-6 rounded-lg">
        <Title level={5} className="!mt-0 !mb-6">
          Nhận xét{" "}
          <span className="text-[#2D5A27] font-bold">{product.name}</span>
        </Title>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="space-y-4 mb-6"
        >
          <Form.Item
            label="Đánh giá của bạn"
            validateStatus={errors.rating ? "error" : ""}
            help={errors.rating?.message}
          >
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Rate {...field} className="text-yellow-400" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Nhận xét của bạn"
            validateStatus={errors.comment ? "error" : ""}
            help={errors.comment?.message}
          >
            <Controller
              name="comment"
              control={control}
              render={({ field }) => <TextArea {...field} rows={4} />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="bg-green-600 hover:bg-green-700"
            >
              Gửi đánh giá
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6">
          <Title level={5} className="mb-4">
            Các đánh giá
          </Title>
          {renderReviewsList()}
        </div>
      </div>
    </Card>
  );
};

export default ProductReviews;
