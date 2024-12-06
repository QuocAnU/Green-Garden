import { sansitaSwash } from "@/app/layout"
import Image from "next/image"
import { Product } from "@/types/product"
// import Plant from '@/images/indoor-plant.jpg';
import { useRouter } from "next/navigation";
export const BestSeller = ({ products }: { products: Product[] }) => {
    const router = useRouter();
    return (
        <div className="flex flex-col items-center gap-7 flex-shrink-0">
            <div className="flex flex-col gap-2 items-center justify-center">
                <div className={`text-center text-[48px] font-[700] text-[#343434] ${sansitaSwash.className}`}>Bán chạy nhất</div>
                <div className="w-[200px] h-[1px] bg-[rgba(52,52,52,0.80)]"></div>
            </div>
            <div className='flex justify-center items-start gap-8'>
                {products.slice(0, 3).map((item, idx) =>
                    <div key={idx} className='flex flex-col justify-center items-start gap-4 p-5 rounded-[16px] bg-[#FFF] hover:scale-110' style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                        <div className="relative rounded-[8px] h-[300px] w-[300px] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.4)]"
                            ></div>
                            <Image
                                src={item.images[0]}
                                // src={Plant}
                                width={500}
                                height={500}
                                className="h-full w-full object-cover"
                                alt=""
                            />
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-[24px] font-[600] uppercase text-[#FFF]" style={{ textShadow: "0px 4px 4px rgba(52, 52, 52, 0.25)" }}>
                                {item.name}
                            </div>
                        </div>

                        <button onClick={() => router.push(`/product/${item._id}`)} className="flex w-full h-[64px] p-2 justify-center items-center rounded-[8px] bg-[#3B823E]" style={{ boxShadow: "0px 8px 23px 0px rgba(80, 107, 82, 0.13)" }}>
                            <div className="text-center text-[20px] font-[700] text-[#FFF]">Mua ngay</div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}