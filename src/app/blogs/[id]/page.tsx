
'use client'

import Image from "next/image";
import { useParams } from "next/navigation";
import Banner from '@/images/banner-no-text.svg'
import { BLOGLIST } from "@/components/home/blogs/mock-data";

const BlogsDetail = () => {
    const params = useParams();
    const title = Array.isArray(params.id)
        ? params.id.map(decodeURIComponent).join(", ")
        : params.id
            ? decodeURIComponent(params.id)
            : "";

    const blogDetail = BLOGLIST.find(item => item.title === title);

    return (
        <>
            <div className="w-full relative">
                <Image src={Banner} className='w-full' alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] font-[600] text-[#FFF]">Blogs</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div className="flex items-start justify-center gap-12 px-12 py-12">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex flex-col items-start gap-3">
                            <div className="text-[32px] font-[700] leading-[44px] text-[#224229]">{blogDetail?.title}</div>
                            <div className="w-[100px] h-[4px] bg-[rgba(34,66,41,0.85)]"></div>
                        </div>
                        {blogDetail?.content?.map((detail, detail_idx) => (
                            <div key={detail_idx} className="flex flex-col items-start gap-4">
                                <div className="text-[27px] font-[600] leading-[25.6px] text-[#224229]">{detail_idx + 1} - {detail.title}</div>
                                {detail.content[1].length > 0 && (<div className="text-[20px] font-[600] leading-[25.6px] text-[#224229]">&emsp;• Ý nghĩa</div>)}
                                {detail.content[0].map((meaning, meaning_idx) => (
                                    <div key={meaning_idx} className="flex flex-col items-start gap-3">
                                        <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">{meaning}</div>
                                    </div>
                                ))}
                                {detail.content[1].length > 0 && (
                                    <>
                                        <div className="text-[20px] font-[600] leading-[25.6px] text-[#224229]">&emsp;• Cách chăm sóc</div>
                                        {detail.content[1]?.map((takecare, takecare_idx) => (
                                            <div key={takecare_idx} className="flex flex-col items-start gap-3">
                                                <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">{takecare}</div>
                                            </div>
                                        ))}
                                    </>
                                )}
                                {detail.img !== '' && (
                                    <div className="flex items-center justify-center w-full">
                                        <Image src={detail.img} alt="" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229] text-justify">

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogsDetail;