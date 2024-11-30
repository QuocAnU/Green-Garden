// components/CartSummary.tsx
import { Button, Divider } from "antd";
import { formatCurrency } from "@/utils/formatCurrency";


interface CartSummary {
  subtotal: number;
  shipping: number;
  total: number;
}

interface CartSummaryProps {
  summary: CartSummary;
  onCheckout: () => void;
}

export const CartSummaryComponent: React.FC<CartSummaryProps> = ({
  summary,
  onCheckout,
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h2 className="text-lg font-medium mb-4">Chi tiết đơn hàng</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Tổng giá trị sản phẩm</span>
          <span className="font-medium text-green-500">
            {formatCurrency(summary.subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Phí vận chuyển</span>
          <span className="font-medium text-green-500">
            {formatCurrency(summary.shipping)}
          </span>
        </div>

        <Divider className="my-4" />

        <div className="flex justify-between text-lg font-medium">
          <span>Tổng giá trị</span>
          <span className="text-green-500">
            {formatCurrency(summary.total)}
          </span>
        </div>

        <Button
          type="primary"
          size="large"
          block
          onClick={onCheckout}
          className="mt-6 bg-green-500 hover:bg-green-600"
        >
          Thanh toán
        </Button>
      </div>
    </div>
  );
};