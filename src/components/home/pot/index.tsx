import { sansitaSwash } from "@/app/layout"
import { POTLIST } from "./mock-data"
import Image from "next/image"
export const Pot = () => {
    return (
        <div className="flex flex-col items-center gap-7 flex-shrink-0">
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className={`text-center text-[48px] font-[700] text-[#343434] ${sansitaSwash.className}`}>Chậu cây</div>
                <div className="w-[200px] h-[1px] bg-[rgba(52,52,52,0.80)]"></div>
            </div>
            <div className="grid gap-6 justify-center items-center">
                <div className="grid grid-cols-4 gap-6">
                    {POTLIST.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex p-5 flex-col items-start gap-4 rounded-[16px] bg-[#FFF]"
                            style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}
                        >
                            <div className="relative rounded-[8px] h-[158px] w-[226px] overflow-hidden">
                                <Image
                                    src={item.img}
                                    className="h-full w-full rounded-[8px] object-fill"
                                    alt=""
                                />
                            </div>
                            <div className="flex px-2 flex-col justify-center items-start gap-1">
                                <div className="text-[20px] font-[700] text-[#343434]">{item.name}</div>
                                <div className="text-center text-[20px] font-[400] text-[#343434]">$ {item.price}</div>
                            </div>
                            <button
                                className="flex w-full h-[64px] p-2 justify-center items-center rounded-[8px] bg-[#3B823E]"
                                style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}
                            >
                                <div className="text-center text-[20px] font-[700] text-[#FFF]">Mua</div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}