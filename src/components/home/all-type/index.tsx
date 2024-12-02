// import ArrowRight from "@/icons/arrow-right.svg";
import Image from "next/image";
import { ALLPLANTLIST } from "./mock-data";

export const AllType = () => {
  return (
    <div className="flex flex-col items- justify-center gap-5">
      {/* <div className="flex items-center justify-end">
        <button className="flex items-center justify-center gap-2">
          <div className="text-center text-[16px] font-[400] text-[#3B823E] underline">
            Xem thêm
          </div>
          <Image src={ArrowRight} alt="" />
        </button>
      </div> */}
      <div className="flex justify-center items-center gap-6">
        {ALLPLANTLIST.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-center items-center gap-6"
          >
            <div className="rounded-[125px] h-[200px] w-[200px] hover:scale-110">
              <Image
                src={item.img}
                className="h-full w-full rounded-full object-cover"
                style={{ boxShadow: "0px 8px 23px 0px rgba(80,107,82,0.16)" }}
                alt=""
              />
            </div>
            <div className="text-center text-[16px] font-[700] text-[#343434] uppercase">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
