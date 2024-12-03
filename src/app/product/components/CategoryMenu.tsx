/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface CategoryItem {
  key: string;
  label: string;
  children?: CategoryItem[];
}

const groupByTypeAndCategory = (data: any): CategoryItem[] => {
  const result: CategoryItem[] = [];

  data?.forEach((item: any) => {
    const typeIndex = result.findIndex((cat) => cat.label === item.type);
    if (typeIndex === -1) {
      result.push({
        key: item.type,
        label: item.type,
        children: [
          {
            key: `${item.id}_${item.category.toLowerCase().replace(/\s+/g, '-')}`,
            label: item.category,
          },
        ],
      });
    } else {
      const categoryIndex = result[typeIndex].children?.findIndex((cat) => cat.label === item.category);
      if (categoryIndex === -1) {
        result[typeIndex].children?.push({
          key: `${item.id}_${item.category.toLowerCase().replace(/\s+/g, '-')}`,
          label: item.category,
        });
      }
    }
  });

  return result;
};

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  stockQuantity: number;
  images?: string[];
  category: string;
}

interface CategoryMenuProps {
  products: Product[];
  setCategory: (category: string) => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ products, setCategory }) => {
  const [openKeys, setOpenKeys] = useState<string[]>(["Cây cảnh"]);
  const groupedCategories = groupByTypeAndCategory(products);
  
  React.useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = globalStyles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const renderExpandIcon = (isOpen: boolean) => {
    return isOpen ? (
      <CaretUpOutlined className="text-white text-xs" />
    ) : (
      <CaretDownOutlined className="text-white text-xs" />
    );
  };

  return (
    <div className="w-[300px] flex items-center justify-center sticky top-0">
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        className="custom-menu"
        items={groupedCategories.map((category) => ({
          key: category.key,
          label: (
            <div className="flex justify-between items-center">
              <span className="text-white text-base font-medium">
                {category.label}
              </span>
            </div>
          ),
          children: category.children?.map((subCategory) => ({
            key: subCategory.key,
            label: (
              <span
                className="text-gray-800 text-sm font-semibold block"
                onClick={() => setCategory(subCategory.label)}
              >
                {subCategory.label}
              </span>
            ),
          })),
          expandIcon: ({ isOpen }) => renderExpandIcon(Boolean(isOpen)),
        }))}
      />
    </div>
  );
};

export default CategoryMenu;

const globalStyles = `
  .custom-menu.ant-menu-inline > .ant-menu-submenu > .ant-menu-submenu-title {
    height: 48px !important;
    line-height: 48px !important;
    padding: 0 16px !important;
    margin: 5px 0 !important;
    background-color: #2D5A27 !important;
    border-radius: 5px !important;
    width: 294px;
  }

  .custom-menu.ant-menu-inline .ant-menu-submenu-title:hover {
    background-color: #234420 !important;
  }

  .custom-menu.ant-menu-inline .ant-menu-item {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 24px !important;
    margin: 5px 0 !important;
    background-color: #f5f5f5 !important;
  }

  .custom-menu.ant-menu-inline .ant-menu-item:hover {
    background-color: #e8e8e8 !important;
  }

  .custom-menu .ant-menu-sub.ant-menu-inline {
    width: 294px;
    background-color: #f5f5f5 !important;
    border-radius: 0 !important;
    margin: 5px 0 !important;
    font-weight: 500;
  }

  .custom-menu.ant-menu {
    border-right: none !important;
  }

  .custom-menu .ant-menu-submenu-arrow {
    display: none;
  }

  .custom-menu .ant-menu-item::after {
    display: none !important;
  }

  .custom-menu .ant-menu-item-selected {
    background-color: #e8e8e8 !important;
    color: rgba(0, 0, 0, 0.88) !important;
  }
`;
