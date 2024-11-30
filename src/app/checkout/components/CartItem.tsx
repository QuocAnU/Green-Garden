import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "@/utils/formatCurrency";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}
export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  return (
    <div className="flex items-start py-4 border-b max-w-[1336px] mx-auto min-h-[40vh]">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <img
          src={item.image}
          alt={item.name}
          className="absolute top-0 left-0 w-full h-full object-fill rounded-md"
        />
      </div>

      <div className="flex-grow ml-4">
        <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-green-500 font-medium">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Button
            size="small"
            onClick={() =>
              onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
          >
            -
          </Button>
          <InputNumber
            min={1}
            value={item.quantity}
            onChange={(value) => onUpdateQuantity(item.id, value || 1)}
            className="w-16 mx-2"
          />
          <Button
            size="small"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </Button>
        </div>

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(item.id)}
          className="ml-4"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};