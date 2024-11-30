"use client";

import ArrowRight from "@/icons/arrow-right.svg";
import Image from "next/image";
import { ALLPLANTLIST } from "./mock-data";
// import { useEffect, useState } from "react";
// import ProductApi from "@/api/Product";

export const AllPlant = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await ProductApi.getAll(null);
  //       console.log("All plan api", response?.data);
  //       setProducts(response?.data?.metadata);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <div className="flex flex-col items- justify-center gap-5">
      <div className="flex items-center justify-end">
        <button className="flex items-center justify-center gap-2">
          <div className="text-center text-[16px] font-[400] text-[#3B823E] underline">
            Xem thêm
          </div>
          <Image src={ArrowRight} alt="" />
        </button>
      </div>
      <div className="flex justify-center items-center gap-6">
        {ALLPLANTLIST.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center gap-6"
          >
            <div className="rounded-[125px] h-[200px] w-[200px]">
              <Image
                src={item.img}
                className="h-full w-full rounded-full object-cover"
                style={{ boxShadow: "0px 8px 23px 0px rgba(80,107,82,0.16)" }}
                alt=""
              />
            </div>
            <div className="text-center text-[16px] font-[700] text-[#343434] uppercase">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
