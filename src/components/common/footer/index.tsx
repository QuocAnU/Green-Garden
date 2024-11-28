import Image from 'next/image'
import Logo from '@/images/logo-footer.svg'
import Certificate from '@/images/certificate.svg'
import Link from 'next/link'
import Facebook from '@/icons/Facebook.svg'
import Twitter from '@/icons/Twitter.svg'
import Instagram from '@/icons/Instagram.svg'
import Visa from '@/icons/visa.svg'
import MasterCard from '@/icons/mastercard.svg'
export const Footer = () => {
    return (
        <footer>
            <div className="bg-[#436E35] flex py-[40px] justify-center">
                <div className='flex items-center justify-between  w-[1200px]'>
                    <div className="flex gap-[64px] items-start">
                        <Image src={Logo} alt='' />
                        <div className='flex flex-col gap-[16px]'>
                            <div className='text-[16px] font-[700] text-[#FFF]'>Quick Links</div>
                            <div className='flex flex-col gap-[8px]'>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>About Us</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Bulk Order</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Gifts</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Organic Garden</Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[16px]'>
                            <div className='text-[16px] font-[700] text-[#FFF]'>Legal</div>
                            <div className='flex flex-col gap-[8px]'>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>T&C</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Privacy Policy</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Returns</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Shipping</Link>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Cancellation</Link>
                            </div>
                        </div>
                        <div className='flex flex-col gap-[16px]'>
                            <div className='text-[16px] font-[700] text-[#FFF]'>Support</div>
                            <div className='flex flex-col gap-[8px]'>
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>FAQs</Link >
                                <Link href="/" className='text-[16px] font-[400] text-[#FFF]'>Contact Us</Link >
                            </div>
                        </div>
                    </div>
                    <Image className='self-start' src={Certificate} alt='' />
                    <div className="flex gap-[48px] flex-col self-start">
                        <div className='text-right text-[16px] font-[400] text-[#FFF]'>
                            © 2021 Plan A Plant
                            <br />
                            All Rights Reserved
                        </div>
                        <div className='flex items-center justify-center gap-4'>
                            <Link href="/"><Image src={Facebook} alt='' /></Link>
                            <Link href="/"><Image src={Twitter} alt='' /></Link>
                            <Link href="/"><Image src={Instagram} alt='' /></Link>
                        </div>
                        <div className='flex gap-[16px]'>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#01370C] flex p-[12px] gap-[48px] items-center justify-center">
                <div className="text-[16px] font-[400] text-[#FFF] text-right">We facilitate your payments through trusted gateways</div>
                <div className="flex gap-[24px]">
                    <Image src={Visa} alt='' />
                    <Image src={MasterCard} alt='' />
                </div>
            </div>
        </footer>

    )
}