'use client'

import Image from "next/image"
import Banner from '@/images/banner-no-text.svg'
import Address from '@/images/address.svg'
import Email from '@/images/email.svg'
import Social from '@/images/social.svg'
import Hotline from '@/images/hotline.svg'
import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';

const CONTACTLIST = [
    {
        img: Address,
        title: 'Địa chỉ',
        content: ['268 Lý Thường Kiệt'],
    },
    {
        img: Email,
        title: 'Email',
        content: ['banhang@greengarden.com', 'hotro@greengarden.com'],
    },
    {
        img: Social,
        title: 'Mạng xã hội',
        content: ['Facebook', 'Youtube'],
    },
    {
        img: Hotline,
        title: 'Hotline',
        content: ['(+84) 8 9979 9968'],
    },
]

const Lienhe = () => {
    const position = { lat: 10.773, lng: 106.659 };

    return (
        <>
            <div className="w-full relative">
                <Image src={Banner} className='w-full' alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] font-[600] text-[#FFF] w-full text-center">Liên hệ với chúng tôi</div>
            </div>
            <div className="flex flex-col items-center justify-center gap-12 px-6 py-12 bg-green-50">
                <div className="flex flex-col justify-center items-center gap-5">
                    <div className="flex flex-col justify-center items-center gap-3">
                        <div className="text-[33px] font-[700] leading-[30px] text-[#214738]">Thông tin liên hệ</div>
                        <div className="w-[100px] h-[4px] bg-[rgba(34,66,41,0.85)]"></div>
                    </div>
                    <div className="grid items-center justify-center">
                        <div className="grid grid-cols-2 gap-12">
                            {CONTACTLIST.map((item, idx) =>
                                <div key={idx} className="flex py-7 px-[77px] flex-col items-center justify-center gap-4 rounded-[24px]" style={{ boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", background: "linear-gradient(0deg, rgba(80, 107, 82, 0.13) 0%, rgba(80, 107, 82, 0.13) 100%), #FFF" }}>
                                    <Image src={item.img} alt="" />
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <div className="text-[14px] font-[700] leading-[25.6px] text-[#224229]">{item.title}</div>
                                        <div className="flex flex-col justify-center items-center gap-2">

                                            {item.content.map((content, idx) =>
                                                <div key={idx} className="text-[14px] font-[500] leading-[25.6px] text-[#224229]">{content}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-[1050px] py-10 px-10 gap-4 justify-center items-center bg-[#FFF]">
                    <div className="text-[24px] font-[700] leading-[51.2px] text-[#224229]">Để lại lời nhắn</div>
                    <div className="w-[30px] h-[3px] bg-[#E3B845]"></div>
                    <div className="flex flex-col items-center justify-center gap-3 w-full">
                        <input type="text" placeholder="Tên" className="w-full focus:outline-none flex items-center py-3 px-4 h-[43px] rounded-[6px] border-[1px] border-[#DFE4EA] text-[16px] font-[400] leading-[24px] text-[#000] placeholder:text-[#9CA3AF]" />
                        <input type="email" placeholder="Email" className="w-full focus:outline-none flex items-center py-3 px-4 h-[43px] rounded-[6px] border-[1px] border-[#DFE4EA] text-[16px] font-[400] leading-[24px] text-[#000] placeholder:text-[#9CA3AF]" />
                        <textarea placeholder="Lời nhắn" className="w-full focus:outline-none p-4 h-[123px] rounded-[6px] border-[1px] border-[#DFE4EA] text-[16px] font-[400] leading-[24px] text-[#000] placeholder:text-[#9CA3AF]" />
                        <button type="submit" className="flex w-[200px] py-3 px-7 justify-center items-center rounded-[6px] bg-[#214738]">
                            <div className="text-[16px] font-[500] leading-[24px] text-[#FFF]">Gửi</div>
                        </button>
                    </div>
                </div>
                <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
                    <div className="h-[558px] w-[1050px]">
                        <Map defaultCenter={position} defaultZoom={17} mapId={process.env.NEXT_PUBLIC_MAP_ID}>
                            <AdvancedMarker position={position} />
                        </Map>
                    </div>
                </APIProvider>
            </div>
        </>
    )
}
export default Lienhe
