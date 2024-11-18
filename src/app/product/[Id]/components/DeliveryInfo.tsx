import React from "react";
import Image from "next/image";
import MapIcon from "@/images/Group42.png";
import CallIcon from "@/images/Group46.png";
import ChangeIcon from "@/images/Group73.png";

export default async function DeliveryInfo() {
  const deliveryItems = [
    {
      icon: MapIcon,
      text: "Đến tận nơi nhận hàng, trả hoàn tiền trong 24h",
      alt: "Delivery icon",
    },
    {
      icon: CallIcon,
      text: "Hotline 1900.23.23.27 hỗ trợ từ 8h - 20h mỗi ngày",
      alt: "Support icon",
    },
    {
      icon: ChangeIcon,
      text: "Chính sách đổi trả dễ dàng trong 60 ngày",
      alt: "Return policy icon",
    },
  ];

  return (
    <div className="border-t pt-6 flex flex-wrap items-start justify-between gap-y-5">
      {deliveryItems.map((item, index) => (
        <div key={index} className="flex items-start space-x-3 w-[45%]">
          <div className="w-10 h--10 flex-shrink-0">
            <Image
              src={item.icon}
              alt={item.alt}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-600">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
