"use client";

import React, { useEffect, useState } from "react";
import CategoryMenu from "./components/CategoryMenu";
import ProductList from "./components/ProductList";
import ViewedProducts from "./components/ViewedProduct";
import ProductApi from "@/api/Product";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category ,setCategory] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductApi.getAll(null);
        console.log(response?.data);
        setProducts(response?.data?.metadata);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-[1336px] mx-auto my-2">
      <div className="bg-white w-full min-h-screen flex items-start p-4 gap-4">
        <CategoryMenu products={products} setCategory={setCategory} />
        <div className="flex-1 px-4">
          <ProductList products={products} category={category} setCategory={setCategory} />
        </div>
      </div>
      <ViewedProducts products={products} />
    </div>
  );
}
