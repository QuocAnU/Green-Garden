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

const categories: CategoryItem[] = [
  {
    key: "cay-canh",
    label: "Cây cảnh",
    children: [
      { key: "1_cay-canh-de-ban", label: "Cây cảnh để bàn" },
      { key: "1_cay-thuy-sinh", label: "Cây thủy sinh" },
      { key: "1_terrarium", label: "Terrarium" },
      { key: "1_cay-bonsai", label: "Cây bonsai" },
      { key: "1_sen-da", label: "Sen đá" },
      { key: "1_xuong-rong", label: "Xương rồng" },
      { key: "1_cay-chau-treo", label: "Cây chậu treo" },
      { key: "1_cay-an-trai", label: "Cây ăn trái" },
      { key: "1_cay-canh-noi-that", label: "Cây cảnh nội thất" },
      { key: "1_cay-canh-ngoai-that", label: "Cây cảnh ngoại thất" },
    ],
  },
  {
    key: "chau-canh",
    label: "Chậu cảnh",
    children: [
      { key: "2-cay-canh-de-ban", label: "Cây cảnh để bàn" },
      { key: "2-cay-thuy-sinh", label: "Cây thủy sinh" },
      { key: "2-terrarium", label: "Terrarium" },
      { key: "2-cay-bonsai", label: "Cây bonsai" },
      { key: "2-sen-da", label: "Sen đá" },
      { key: "2-xuong-rong", label: "Xương rồng" },
    ],
  },
  {
    key: "vat-lieu",
    label: "Vật liệu",
    children: [
      { key: "3_cay-canh-de-ban", label: "Cây cảnh để bàn" },
      { key: "3_cay-thuy-sinh", label: "Cây thủy sinh" },
      { key: "3_terrarium", label: "Terrarium" },
      { key: "3_cay-bonsai", label: "Cây bonsai" },
      { key: "3_sen-da", label: "Sen đá" },
      { key: "3_xuong-rong", label: "Xương rồng" },
    ],
  },
  {
    key: "phu-kien",
    label: "Phụ kiện",
    children: [],
  },
];

const CategoryMenu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState<string[]>(["cay-canh"]);

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
        items={categories.map((category) => ({
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
              <span className="text-gray-800 text-sm font-semibold block">
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
