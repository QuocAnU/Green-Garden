import Image from "next/image"
import { BLOGLIST } from "./mock-data"
import { sansitaSwash } from "@/app/layout"
export const Blogs = () => {
    return (
        <div className="flex flex-col items-center gap-7 flex-shrink-0">
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className={`text-center text-[48px] font-[700] text-[#343434] ${sansitaSwash.className}`}>Blogs</div>
                <div className="w-[200px] h-[1px] bg-[rgba(52,52,52,0.80)]"></div>
            </div>
            <div className='flex justify-center items-center gap-6'>
                {BLOGLIST.map((item, idx) =>
                    <div key={idx} className="relative rounded-[16px] h-[286px] w-[588px] overflow-hidden" style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[rgba(80,107,82,0.25)] to-[rgba(80,107,82,0.25)]"
                        ></div>
                        <Image
                            src={item.img}
                            className="h-full w-full object-cover"
                            alt=""
                        />
                        <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 text-center text-[28px] font-[400] text-[#FFF]" style={{ textShadow: "0px 4px 4px rgba(52, 52, 52, 0.25)" }}>
                            {item.title}
                        </div>
                        <button className=" absolute bottom-[40px] left-1/2 transform -translate-x-1/2 h-[64px] w-[400px] p-2 justify-center items-center rounded-[8px] bg-[#3B823E]" style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                            <div className="text-center text-[20px] font-[700] text-[#FFF]">Đọc thêm</div>
                        </button>
                    </div>

                )}
            </div>
        </div>
    )
}