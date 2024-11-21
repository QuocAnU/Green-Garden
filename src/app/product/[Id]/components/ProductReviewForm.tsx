// types.ts
interface ReviewFormData {
  rating: number;
  name: string;
  email: string;
  review: string;
}

// schema.ts
import { z } from "zod";

export const reviewSchema = z.object({
  rating: z.number().min(1, "Vui lòng chọn số sao"),
  name: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  review: z.string().min(10, "Nhận xét phải có ít nhất 10 ký tự"),
});

export type ReviewSchemaType = z.infer<typeof reviewSchema>;

// ProductReviewForm.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Form,
  Input,
  Rate,
  Button,
  Space,
  message,
  Typography,
} from "antd";

const { TextArea } = Input;
const { Title, Text } = Typography;

const ProductReviewForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewSchemaType>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      name: "",
      email: "",
      review: "",
    },
  });

  const onSubmit = async (data: ReviewSchemaType) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form data:", data);
      messageApi.success("Đã gửi đánh giá thành công!");
      // Reset form or handle success
    } catch (error) {
      messageApi.error("Có lỗi xảy ra. Vui lòng thử lại!");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card
        className="w-full mb-10"
        title={
          <div className="space-y-1">
            <Title level={4} className="!mb-0">
              Đánh giá
            </Title>
            <Text type="secondary">Chưa có đánh giá</Text>
          </div>
        }
      >
        <div className="bg-red-50 p-6 rounded-lg">
          <Title level={5} className="!mt-0 !mb-6">
            Nhận xét "Cây bàng Singapore mini để bàn chậu sứ"
          </Title>

          <Form
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
            className="space-y-4"
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
              label="Họ tên"
              validateStatus={errors.name ? "error" : ""}
              help={errors.name?.message}
            >
              <Controller
                name="name"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>

            <Form.Item
              label="Email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} type="email" />}
              />
            </Form.Item>

            <Form.Item
              label="Nhận xét của bạn"
              validateStatus={errors.review ? "error" : ""}
              help={errors.review?.message}
            >
              <Controller
                name="review"
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
        </div>
      </Card>
    </>
  );
};

export default ProductReviewForm;
