"use client";

import React from "react";
import CategoryMenu from "./components/CategoryMenu";
import ProductList from "./components/ProductList";
import ViewedProducts from "./components/ViewedProduct";

export default function ProductPage() {
  return (
    <div className="max-w-[1336px] mx-auto my-2">
      <div className="bg-white w-full min-h-screen flex items-start p-4 gap-4">
        <CategoryMenu />
        <div className="flex-1 px-4">
          <ProductList />
        </div>
      </div>
      <ViewedProducts />
    </div>
  );
}
