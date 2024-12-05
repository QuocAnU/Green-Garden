import React from "react";

export default function TopSellingCategory() {
  const categories = [
    { name: "Bonsai", value: 4567, color: "bg-blue-500", size: "w-40 h-40" },
    { name: "Sen Đá", value: 3167, color: "bg-blue-300", size: "w-32 h-32" },
    { name: "Xương Rồng", value: 1845, color: "bg-green-500", size: "w-28 h-28" },
    ];


  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <p className="text-sm text-gray-500">Total 10.4k Visitors</p>
      <div className="relative flex justify-center items-center">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${category.color} ${category.size} absolute rounded-full flex items-center justify-center text-white`}
            style={{ top: index === 0 ? '50px' : index === 1 ? '80px' : '170px', left: index === 0 ? '20px' : index === 1 ? '160px' : '115px' }}
          >
            <div className="text-center">
              <p className="font-bold">{category.name}</p>
              <p className="text-sm">{category.value.toLocaleString()} Per Day</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
