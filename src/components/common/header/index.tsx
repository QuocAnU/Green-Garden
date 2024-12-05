"use client";

import Cart from "@/icons/shopping-cart.svg";
import Avatar from "@/icons/account_circle.svg";
import Logo from "@/images/logo-header.svg";
import Search from "@/icons/search.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";

export const Header = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const userRole = user?.publicMetadata?.role;

  const navLinkClass = (path: string) =>
    `text-[18px] font-[600] text-center ${pathname === path
      ? "text-[#3B823E]"
      : "text-[#343434] hover:text-[#3B823E]"
    }`;

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header>
      {/* Top bar remains the same */}
      <div className="flex w-full md:px-32 px-6 justify-center items-center gap-[10px] bg-[#01370C]">
        <div className="flex h-10 py-2 md:justify-center justify-end items-center gap-3 w-full">
          <div className="hidden md:flex md:h-8 md:justify-center md:items-center md:gap-14">
            <div className="w-6 h-6"></div>
            <div className="w-6 h-6"></div>
          </div>
          <div className="hidden md:block md:text-center md:text-sm md:font-[400] md:text-[#FFF] md:w-full">
            Chào mừng bạn đến với Green Garden !
          </div>
          <div className="flex h-8 justify-center items-center gap-14">
            <button className="w-6 h-6">
              <Link
                href="/checkout"
                className="text-[16px] font-[400] text-[#FFF]"
              >
                <Image src={Cart} alt="Cart" />
              </Link>
            </button>

            {/* Authentication Button */}
            <div className="relative">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="w-6 h-6 flex items-center justify-center gap-3"
                >
                  <Image src={Avatar} alt="Sign In" />
                  <p className="font-semibold text-16">{user?.fullName}</p>
                </Link>
              </SignedOut>
              <SignedIn>
                <button
                  onClick={toggleUserDropdown}
                  className="w-6 h-6 flex items-center justify-center relative"
                >
                  <UserButton />
                </button>
              </SignedIn>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-green-50 border-gray-200">
        <div className="flex flex-wrap items-center justify-center mx-auto py-3 gap-12">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={Logo} className="h-12 w-full object-fit" alt="Logo" />
          </a>
          <div className="flex justify-center items-center p-2 gap-12 flex-shrink-0">
            <Link key="home" href="/" className={navLinkClass("/")}>
              Trang chủ
            </Link>

            <Link
              key="sanpham"
              href="/product"
              className={navLinkClass("/product")}
            >
              Sản phẩm
            </Link>

            <Link
              key="gioithieu"
              href="/gioithieu"
              className={navLinkClass("/gioithieu")}
            >
              Giới thiệu
            </Link>

            <Link
              key="lienhe"
              href="/lienhe"
              className={navLinkClass("/lienhe")}
            >
              Liên hệ
            </Link>

            <Link
              key="policy"
              href="/policy"
              className={navLinkClass("/policy")}
            >
              Chính sách
            </Link>

            {userRole === "admin" && (
              <Link
                key="admin-dashboard"
                href="/admin/dashboard"
                className={navLinkClass("/admin/dashboard")}
              >
                Quản trị
              </Link>
            )}

            <div className="flex w-fit max-w-[154px] h-[40px] py-3 px-2 items-center gap-3 rounded-[6px] border-[1px] border-[#343434]">
              <Image src={Search} alt="" />
              <input
                type="search"
                className="w-full bg-transparent text-[16px] font-[600] text-[#343434] placeholder:text-[rgba(52,52,52,0.50)] focus:outline-none"
                placeholder="Tìm kiếm"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
