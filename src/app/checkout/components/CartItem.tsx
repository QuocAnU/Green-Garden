/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { InputNumber, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatCurrency } from "@/utils/formatCurrency";
import { CartItem } from "../page";
import { useEffect, useState, useRef, useCallback } from "react";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (item: CartItem) => void;
}

export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce function
  const debouncedUpdateQuantity = useCallback(
    (itemQuantity: number) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set a new timeout
      timeoutRef.current = setTimeout(() => {
        onUpdateQuantity(item.productId._id, itemQuantity);
      }, 500);
    },
    [onUpdateQuantity, item.productId._id]
  );

  // Update quantity when input changes
  useEffect(() => {
    if (item.quantity !== itemQuantity) {
      debouncedUpdateQuantity(itemQuantity);
    }

    // Cleanup function to clear timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    itemQuantity,
    item.productId._id,
    debouncedUpdateQuantity,
    item.quantity,
  ]);

  // Handlers for quantity modification
  const decreaseQuantity = () => {
    setItemQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const increaseQuantity = () => {
    setItemQuantity((prevQuantity) => Math.min(100, prevQuantity + 1));
  };

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0 && value < 100) {
      setItemQuantity(Math.max(1, value));
    }
  };

  return (
    <div className="flex items-start py-4 border-b max-w-[1336px] mx-auto border-gray-200">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <img
          src={ 
            item.productId.images[0] ||
            "https://images.grove.co/upload/f_auto,fl_progressive,ar_1:1,c_pad,b_white,w_650/v1588037272/global/Line%20Illustrations/no-image-available.png"
          }
          alt={item?.productId?.name}
          className="absolute top-0 left-0 w-full h-full object-fill rounded-md border-2 border-gray-300 border-solid"
        />
      </div>

      <div className="flex-grow ml-4">
        <h3 className="text-sm font-medium text-gray-800">
          {item?.productId?.name}
        </h3>
        <p className="text-sm text-green-500 font-medium">
          {formatCurrency(item?.productId?.price)}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <Button size="small" onClick={decreaseQuantity}>
            -
          </Button>
          <InputNumber
            readOnly
            min={1}
            max={100}
            value={itemQuantity}
            onChange={handleQuantityChange}
            className="w-16 mx-2"
          />
          <Button size="small" onClick={increaseQuantity}>
            +
          </Button>
        </div>

        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemove(item)}
          className="ml-4"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};
