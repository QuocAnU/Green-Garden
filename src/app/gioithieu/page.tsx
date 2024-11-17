import Image from "next/image"
import Banner from '@/images/banner-no-text.svg'
import Introduce1 from '@/images/introduce-1.svg'
import Introduce2 from '@/images/introduce-2.svg'
import Introduce3 from '@/images/introduce-3.svg'
import Introduce4 from '@/images/introduce-4.svg'
import Introduce5 from '@/images/introduce-5.svg'
import Introduce6 from '@/images/introduce-6.svg'

const Gioithieu = () => {
    return (
        <>
            <div className="w-full relative">
                <Image src={Banner} className='w-full' alt="" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[100px] font-[600] text-[#FFF]">Giới thiệu</div>
            </div>
            <div className='flex flex-col items-center justify-center bg-green-50'>
                <div className="flex items-start justify-center gap-12 px-6 py-12">
                    <div className="flex flex-col items-start gap-4 max-w-[698px]">
                        <div className="flex flex-col items-start gap-3">
                            <div className="text-[29px] font-[700] leading-[44px] text-[#224229]">Món quà đến từ thiên nhiên</div>
                            <div className="w-[100px] h-[4px] bg-[rgba(34,66,41,0.85)]"></div>
                        </div>
                        <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">
                            Mỗi năm cây xanh có thể hấp thụ trung bình được khoảng 21kg khí CO2, nó tương đương với 22 tấn khí carbonic trong suốt cuộc đời của cây.
                            Điều đó nói lên tầm quan trọng của cây xanh đối với môi trường sống của con người. Toàn bộ lượng khí ô nhiễn (các oxit nitơ, amoniac, SO2 và ôzôn)
                            được cây xanh chuyển hóa thành oxi giúp cho con người được thở.
                            <br />
                            <br />
                            Việc kết nối với thường xuyên với thiên nhiên sẽ mang lại nhiều lợi ích lâu dài về mặt tinh thần, sức khỏe và cân bằng. Với đời sống hiện đại thì
                            việc liên kết với thiên nhiên ngày càng ít ỏi. Thiên nhiên có phải là một thứ xa xỉ hay không? Tại sao chúng ta không tạo ra những mảng xanh thư thái
                            ngay trong chính nơi chúng thường sống.
                            <br />
                            <br />
                            <span className="font-bold">Green Garden</span> tin rằng một khi bạn đã đi tìm kiếm mảng xanh cho không gian sống cho mình thì bạn đang cố gắng tạo ra kết nối với chính bản thân mình.
                            Và bạn cũng là một người có ý thức bảo vệ môi trường và giúp mọi người hành động vì mẹ Thiên Nhiên.
                            <br />
                            <br />
                            Tôn chỉ giúp <span className="font-bold">Green Garden</span> hoạt động chính là tinh thần trách nhiên với thiên nhiên cũng như mang lại những sản phẩm xanh và tự nhiên tới cộng đồng bằng
                            một dịch vụ chất lượng. Chúng tôi hy vọng rằng mình có thể lan tỏa mạnh mẽ tinh thần liên kết và bảo vệ Mẹ Thiên Nhiên nhiều hơn. Từ đó, cuộc sống
                            loài người sẽ trở nên tốt đẹp hơn từ những nỗ lực bảo vệ này.
                        </div>
                    </div>
                    <div className="h-[600px] w-[480px] flex-shrink-0">
                        <Image src={Introduce1} alt="" />
                    </div>
                </div>
                <Image src={Introduce2} className="w-full" alt="" />
                <div className="flex flex-row items-start justify-center gap-16 px-6 py-10">
                    <div className="flex flex-col justify-center items-center gap-4 max-w-[480px]">
                        <Image src={Introduce3} alt="" />
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <div className="text-[25px] font-[700] leading-[41px] text-[#224229]">Tạo kết nối</div>
                            <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">
                                Mối liên kết giữa con người và thiên nhiên là một điều kì diệu của tạo hóa. Khi chúng ta hòa hợp
                                với thiên nhiên thì cuộc sống của trở nên tốt đẹp hơn. Và chúng tôi luôn mong mỏi sẽ có thể tạo ra
                                thật nhiều kết nối này hơn nữa.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 max-w-[480px]">
                        <Image src={Introduce4} alt="" />
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <div className="text-[25px] font-[700] leading-[41px] text-[#224229]">Sự chân thành</div>
                            <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">
                                Và sau khi sự kết nối giữa con người và thiên nhiên được hình thành thì những tác động tích cực từ hoạt động này
                                sẽ bắt đầu diễn ra. Tâm hồn được tác động mạnh mẽ và chúng tôi muốn chia sẽ điều này với sự chân thành.
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center gap-4 max-w-[480px]">
                        <Image src={Introduce5} alt="" />
                        <div className="flex flex-col gap-5 justify-center items-center">
                            <div className="text-[25px] font-[700] leading-[41px] text-[#224229]">Cùng đồng hành</div>
                            <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">
                                <span className="font-bold">Green Garden</span> không bao giờ muốn dừng lại trên chặng hành trình này. Chúng tôi luôn chủ động thay đổi để không ngừng
                                cải thiện chất lượng dịch vụ. Ngoài ra, chúng tôi cũng luôn đồng hành cùng khách hàng để tạo ra một không gian sống thật sự xứng đáng.
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full relative">
                    <Image src={Introduce6} className='w-full' alt="" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5">
                        <div className="text-[28px] font-[700] leading-[40px] text-[#224229] text-center">Câu chuyện của Green Garden</div>
                        <div className="text-[16px] font-[500] leading-[25.6px] text-[#224229]">
                            Con người chúng ta vốn dĩ luôn mưu cầu hạnh phúc. Chúng ta đều biết, bản thân con người hạnh phúc hay không là ở tâm. Nếu tâm bất động,
                            hoặc dễ hiểu hơn là tâm đã đủ vui vẻ thì mọi người sẽ dễ dàng chạm đến niềm vui sướng, niềm hạnh phúc đích thực. Và đi tìm hạnh phúc đích thực
                            là sứ mệnh cũng như là lý do vì sao mình lại <span className="font-bold">Green Garden</span>.
                            <br />
                            <br />
                            Triết lý của <span className="font-bold">Green Garden</span> không chỉ dừng lại qua những sản phẩm cây xanh, những thiết kế mô hình không gian
                            xanh mang tính thẩm mỹ, nghệ thuật cao đến khách hàng mà thật lòng mong muốn khách hàng dành thời gian hiểu hơn về việc trồng cây, hiểu hơn về
                            thiên nhiên, yêu thương và trân trọng những gì do chính mình gieo trồng nên.
                            <br />
                            <br />
                            Vì những trải nghiệm ấy sẽ hướng khách hàng đến <span className="italic">sự thiền</span>. Mà <span className="italic">thiền</span> là cách tốt nhất
                            dẫn mọi người đến sự cân bằng trong cuộc sống cũng như trong tâm thức của chính mình. Từ đó, chúng ta sẽ có cơ hội để chạm tới trái tim cơ bản
                            thuần khiết giữa con người và thiên nhiên.
                            <br />
                            <br />
                            <span className="font-bold">Green Garden</span> giúp bạn tạo ra những kết nối với thực vật và tự nhiên, từ đó giúp bạn nuôi dưỡng một cuộc sống tốt đẹp hơn.
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Gioithieu