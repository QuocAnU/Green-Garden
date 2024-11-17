import Image from "next/image"
import Thumbnail from '@/images/reason-thumbnail.jpg'
import { sansitaSwash } from "@/app/layout"
export const Reason = () => {
    return (
        <div className="flex items-center gap-6 max-w-[1200px]">
            <div className="flex flex-col justify-center items-start gap-7">
                <div className="flex flex-col items-start gap-5">
                    <div className="flex flex-col items-start gap-4">
                        <div className={`text-[48px] font-[700] text-[#343434] ${sansitaSwash.className}`}>Lý do chọn Green Garden?</div>
                        <div className="w-[200px] h-[1px] bg-[rgba(52,52,52,0.80)]"></div>
                    </div>
                    <div className="text-[24px] font-[400] text-[#343434]">Whether it is growing your own food or setting
                        up your roof-top garden, we provide the highest
                        quality landscaping services, contributing to a greener world and substantial living!
                        <br />
                        Schedule your service appointment today!
                    </div>
                </div>
                <button className="flex w-[282px] h-[64px] p-2 justify-center items-center rounded-[8px] bg-[#3B823E]" style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                    <div className="text-center text-[20px] font-[700] text-[#FFF]">Book Now!</div>
                </button>
            </div>
            <div className="rounded-[16px] border-[1px] border-[#3B823E] h-[442px] w-[588px] flex-shrink-0" style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                <Image src={Thumbnail} className="h-full w-full rounded-[16px] object-cover" alt="" />
            </div>
        </div>
    )
}