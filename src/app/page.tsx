import { AllPlant } from '@/components/home/all-plant';
import { BestSeller } from '@/components/home/best-seller';
import { Blogs } from '@/components/home/blogs';
import { HotSale } from '@/components/home/hot-sale';
import { Supply } from '@/components/home/plant-supply';
import { Popular } from '@/components/home/popular';
import { Pot } from '@/components/home/pot';
import { Reason } from '@/components/home/reason';
import Banner from '@/images/banner.svg'
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <Image src={Banner} className='w-full' alt='' />
      <div className='flex flex-col items-center justify-center gap-16 px-6 py-12 bg-green-50'>
        <AllPlant />
        <BestSeller />
        <Popular />
        <Blogs />
        <HotSale />
        <Pot />
        <Supply />
        <Reason />
      </div>
    </>
  );
}
