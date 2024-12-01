'use client'

import ProductApi from "@/api/Product";
import { AllType } from "@/components/home/all-type";
import { BestSeller } from "@/components/home/best-seller";
import { Blogs } from "@/components/home/blogs";
import { HotSale } from "@/components/home/hot-sale";
import { NewArrival } from "@/components/home/new-arrival";
import { Plants } from "@/components/home/plant";
import { Popular } from "@/components/home/popular";
import { Pot } from "@/components/home/pot";
import { Reason } from "@/components/home/reason";
import Banner from "@/images/banner.svg";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { getToken } = useAuth();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = await getToken();
        const response = await ProductApi.getAll(token);
        // console.log(response.data);
        setProducts(response.data.metadata);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, [getToken]);

  return (
    <>
      <Image src={Banner} className="w-full" alt="" />
      <div className="flex flex-col items-center justify-center gap-16 px-6 py-12 bg-green-50">
        <AllType />
        <BestSeller products={products} />
        <Popular products={products} />
        <Blogs />
        <HotSale products={products} />
        <NewArrival products={products} />
        <Pot products={products} />
        <Plants products={products} />
        <Reason />
      </div>
    </>
  );
}
