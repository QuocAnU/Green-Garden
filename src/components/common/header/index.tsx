'use client'

import Image from 'next/image'
import Cart from '@/icons/shopping-cart.svg'
import Avatar from '@/icons/account_circle.svg'
import ArrowDown from '@/icons/arrow-down.svg'
import Logo from '@/images/Logo-header.svg'
import Search from '@/icons/search.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const Header = () => {
    const [isPlantOpen, setIsPlantOpen] = useState(false);
    const [isPotOpen, setIsPotOpen] = useState(false);


    const handlePlantOpen = () => {
        if (isPotOpen) {
            setIsPotOpen(false)
        }
        setIsPlantOpen(!isPlantOpen)
    }

    const handlePotOpen = () => {
        if (isPlantOpen) {
            setIsPlantOpen(false)
        }
        setIsPotOpen(!isPotOpen)
    }

    return (
        <header>

            <div className="flex w-full md:px-32 px-6 justify-center items-center gap-[10px] bg-[#01370C]">
                <div className="flex h-10 py-2 md:justify-center justify-end items-center gap-3 w-full">
                    <div className='hidden md:flex md:h-8 md:justify-center md:items-center md:gap-14'>
                        <div className='w-6 h-6'></div>
                        <div className='w-6 h-6'></div>
                    </div>
                    <div className='hidden md:block md:text-center md:text-sm md:font-[400] md:text-[#FFF] md:w-full'>Chào mừng bạn đến với Green Garden !</div>
                    <div className='flex h-8 justify-center items-center gap-14'>
                        <button className='w-6 h-6' >
                            <Image src={Cart} alt="" />
                        </button>
                        <button className='w-6 h-6' >
                            <Image src={Avatar} alt="" />
                        </button>
                    </div>
                </div>
            </div>

            <nav className='bg-green-50 border-gray-200'>
                <div className="flex flex-wrap items-center justify-center mx-auto py-3 gap-12">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image src={Logo} className="h-8" alt="Logo" />
                    </a>
                    <div className='flex justify-center items-center p-2 gap-12 flex-shrink-0'>
                        <Link
                            key="home"
                            href="/"
                            className={`text-[18px] font-[600] text-center ${usePathname() === "/" ? ' text-[#3B823E]' : 'text-[#343434] hover:text-[#3B823E]'
                                }`}
                        >
                            Trang chủ
                        </Link>

                        <button onClick={handlePlantOpen} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="relative p-0 flex items-center justify-between outline-none">
                            <div className={`text-[18px] font-[600] text-center ${usePathname() === "/caycanh" ? ' text-[#3B823E]' : 'text-[#343434] hover:text-[#3B823E]'}`}>Cây cảnh</div>
                            <Image src={ArrowDown} alt='' />
                            {isPlantOpen &&
                                <div id="dropdownNavbar" className="absolute top-full bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44">
                                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className="text-left text-[16px] font-[500] hover:bg-gray-100 block px-4 py-2">Cây cảnh A</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-left text-[16px] font-[500] hover:bg-gray-100 block px-4 py-2">Cây cảnh B</a>
                                        </li>

                                    </ul>
                                </div>
                            }
                        </button>


                        <button onClick={handlePotOpen} id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" className="relative p-0 flex items-center justify-between outline-none">
                            <div className={`text-[18px] font-[600] text-center ${usePathname() === "/chaucay" ? ' text-[#3B823E]' : 'text-[#343434] hover:text-[#3B823E]'}`}>Chậu cây</div>
                            <Image src={ArrowDown} alt='' />
                            {isPotOpen &&
                                <div id="dropdownNavbar" className="absolute top-full bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44">
                                    <ul className="py-1" aria-labelledby="dropdownLargeButton">
                                        <li>
                                            <a href="#" className="text-left text-[16px] font-[500] hover:bg-gray-100 block px-4 py-2">Chậu cây A</a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-left text-[16px] font-[500] hover:bg-gray-100 block px-4 py-2">Chậu cây B</a>
                                        </li>

                                    </ul>
                                </div>
                            }
                        </button>


                        <Link
                            key="gioithieu"
                            href="/gioithieu"
                            className={`text-[18px] font-[600] text-center ${usePathname() === "/gioithieu" ? ' text-[#3B823E]' : 'text-[#343434] hover:text-[#3B823E]'
                                }`}
                        >
                            Giới thiệu
                        </Link>

                        <Link
                            key="lienhe"
                            href="/lienhe"
                            className={`text-[18px] font-[600] text-center ${usePathname() === "/lienhe" ? ' text-[#3B823E]' : 'text-[#343434] hover:text-[#3B823E]'
                                }`}
                        >
                            Liên hệ
                        </Link>

                        <div className='flex w-fit max-w-[154px] h-[40px] py-3 px-2 items-center gap-3 rounded-[6px] border-[1px] border-[#343434]'>
                            <Image src={Search} alt='' />
                            <input
                                type='search'
                                className='w-full bg-transparent text-[16px] font-[600] text-[#343434] placeholder:text-[rgba(52,52,52,0.50)] focus:outline-none'
                                placeholder='Tìm kiếm'
                            />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}