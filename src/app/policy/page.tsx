// components/PolicyContent.tsx
"use client";
import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

const PolicyContent: React.FC = () => {
  const items: TabsProps["items"] = [
    {
      key: "privacy",
      label: "Bảo mật",
      children: (
        <div className="w-full mx-auto p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-8">
            Chính sách bảo mật thông tin
          </h2>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                1. Mục đích và phạm vi thu thập thông tin
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  Việc thu thập dữ liệu chủ yếu trên website bao gồm: họ tên,
                  email, điện thoại, địa chỉ khách hàng trong mục liên hệ. Đây
                  là các thông tin mà chúng tôi  cần thành viên cung cấp bắt
                  buộc khi gửi thông tin nhờ tư vấn hay muốn mua sản phẩm và để
                  chúng tôi  liên hệ xác nhận lại với khách hàng trên website
                  nhằm đảm bảo quyền lợi cho cho người tiêu dùng. Các thành viên
                  sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử
                  dụng dịch vụ dưới thông tin mà mình cung cấp và hộp thư điện
                  tử của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp
                  thời cho webiste chúng tôi  về những hành vi sử dụng trái
                  phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật
                  khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                2. Phạm vi sử dụng thông tin
              </h4>
              <p className="ml-6 mb-2">
                Chúng tôi sử dụng thông tin thành viên cung cấp để:
              </p>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Liên hệ xác nhận đơn hàng và giao hàng cho thành viên khi
                  nhận được yêu cầu từ thành viên.
                </p>
                <p className="text-gray-700">
                  • Cung cấp thông tin về sản phẩm đến khách hàng nếu có yêu cầu
                  từ khách hàng,
                </p>
                <p className="text-gray-700">
                  • Gửi email tiếp thị, khuyến mại về hàng hóa do chúng tôi bán
                </p>
                <p className="text-gray-700">
                  • Gửi các thông báo về các hoạt động trên website
                </p>
                <p className="text-gray-700">
                  • Liên lạc và giải quyết với người dùng trong những trường hợp
                  đặc biệt.
                </p>
                <p className="text-gray-700">
                  • Không sử dụng thông tin cá nhân của người dùng ngoài mục
                  đích xác nhận và liên hệ có liên quan đến giao dịch
                </p>
                <p className="text-gray-700">
                  • Khi có yêu cầu của cơ quan tư pháp bao gồm: Viện kiểm sát,
                  tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm
                  pháp luật nào đó của khách hàng.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                3. Thời gian lưu trữ thông tin
              </h4>
              <div className="ml-6">
                <p className="text-gray-700">
                  Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có
                  yêu cầu ban quản trị hủy bỏ. Còn lại trong mọi trường hợp
                  thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của
                  chúng tôi
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                4. Những người hoặc tổ chức có thể tiếp cận thông tin cá nhân
              </h4>
              <div className="ml-6">
                <p className="text-gray-700">
                  Đối tượng được tiếp cận với thông tin cá nhân của khách hàng
                  thuộc một trong những trường hợp sau:
                </p>
                <ul className="list-disc ml-6">
                  <li className="text-gray-700">Nhân viên của công ty</li>
                  <li className="text-gray-700">
                    Các đối tác có ký hợp đồng thực hiện một phần dịch vụ của
                    Công Ty. Các đối tác này sẽ nhận được thông tin theo thỏa
                    thuận hợp đồng (có thể một phần hoặc toàn bộ thông tin tùy
                    theo điều khoản hợp đồng) để hỗ trợ người dùng sử dụng dịch
                    vụ do Công ty cung cấp.
                  </li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                5. Địa chỉ đơn vị thu thập và quản lý thông tin cá nhân
              </h4>
              <div className="ml-6">
                <p className="text-gray-700">
                  Địa chỉ: 268 Lý Thường Kiệt, Phường 14, Quận 10, Hồ Chí Minh
                </p>
                <p className="text-gray-700">
                  ĐT: 08 9979 9968 | Email: support@greengarden.com
                </p>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa
                thông tin cá nhân của mình
              </h4>
              <div className="ml-6">
                <p className="text-gray-700">
                  Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy
                  bỏ thông tin cá nhân của mình bằng cách liên hệ với ban quản
                  trị website để thực hiện.
                </p>
                <p className="text-gray-700">
                  Thành viên có quyền gửi khiếu nại về nội dung bảo mật thông
                  tin đề nghị liên hệ Ban quản trị của website. Khi tiếp nhận
                  phản hồi, chúng tôi sẽ xác nhận và xử lý kịp thời.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                7. Cơ chế tiếp nhận và giải quyết khiếu nại của người dùng
              </h4>
              <div className="ml-6">
                <p className="text-gray-700">
                  + Mọi tranh chấp phát sinh giữa Công ty và Người dùng sẽ được
                  giải quyết trên cơ sở thương lượng. Nếu không đạt thỏa thuận,
                  các bên có quyền đưa vụ việc ra Tòa án nhân dân có thẩm quyền
                  để giải quyết.
                </p>
                <p className="text-gray-700">
                  + Khi không giải quyết được qua thương lượng, bên bị vi phạm
                  có thể tập hợp chứng cứ và liên hệ với Công ty để được giải
                  quyết. Công ty sẽ liên hệ lại để xử lý kịp thời.
                </p>
                <p className="text-gray-700">
                  + Nếu vụ việc vượt quá thẩm quyền, Công ty sẽ chuyển cho các
                  cơ quan chức năng có thẩm quyền và hỗ trợ bảo vệ bên bị vi
                  phạm.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "warranty",
      label: "Bảo hành",
      children: (
        <div className="w-full mx-auto p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-8">
            Chính sách bảo hành
          </h2>
          <div className="space-y-6">
            {/* Điều kiện bảo hành */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                1. Điều kiện bảo hành - hoàn trả sản phẩm
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Quý khách cần giữ các nhãn về việc đã mua hàng tại Green Garden theo đơn mua hàng, biên nhận giao hàng, sao kê của ngân hàng
                </p>
                <p className="text-gray-700">
                  • Sản phẩm không nằm trong danh mục hạn chế đổi trả
                </p>
                <p className="text-gray-700">
                  • Sản phẩm phải còn nguyên tem, mác, nguyên đai kiện ban đầu (trừ trường hợp sản phẩm bị lỗi hoặc hư hại trong quá trình vận chuyển) và quà tặng kèm (nếu có)
                </p>
              </div>
            </div>

            {/* Quy trình thực hiện đổi trả hàng */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                2. Quy trình thực hiện đổi trả hàng
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Quý khách vui lòng kiểm tra kỹ sản phẩm trước khi ký nhận hàng và báo ngay cho nhân viên giao hàng nếu có phát hiện lỗi sản phẩm hoặc liên hệ ngay với bộ phận chăm sóc khách hàng
                </p>
                <p className="text-gray-700">
                  • Bộ phận kỹ thuật sẽ liên hệ ngay với quý khách để xác nhận yêu cầu và lý do đổi trả, thống nhất phương án đổi trả cho sản phẩm
                </p>
                <p className="text-gray-700">
                  • Đối với hàng hoá nhỏ và đơn hàng các tỉnh thành khác: quý khách vui lòng gửi trực tuyến/vận chuyển tới cửa hàng hoặc kho hàng gần nhất để đổi trả
                </p>
                <p className="text-gray-700">
                  • Đối với hàng hoá cồng kềnh đã lắp ráp: Green Garden sẽ bảo hành tận nơi tại TP.HCM cho quý khách
                </p>
                <p className="text-gray-700">
                  • Quý khách hàng vui lòng kiểm tra kỹ sản phẩm một lần nữa trước khi ký nhận đổi trả hàng
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                3. Quy định đổi trả bảo hành
              </h4>
              <div className="ml-6 space-y-2">
                <h5 className="font-medium text-green-600">3.1. Quy định đổi trả/ bảo hành được áp dụng đối với những hàng hóa và lỗi sau:</h5>
                <p className="text-gray-700">
                  • Sản phẩm không đúng như thông tin đăng tải (sai công dụng, sai thành phần...)
                </p>
                <p className="text-gray-700">
                  • Sản phẩm bị bể/rớt/xước/biến dạng trong quá trình vận chuyển trừ trường hợp vận chuyển theo chỉ định của khách hàng
                </p>
                <p className="text-gray-700">
                  • Sản phẩm nhận không đúng với đơn hàng đã đặt
                </p>
                <p className="text-gray-700">
                  • Các lỗi sản phẩm do quá trình sản xuất hoặc vận chuyển, lắp ráp như sau:
                </p>
                <div className="ml-6">
                  <p className="text-gray-700">- Trầy trọc, chầy sơn bề mặt</p>
                  <p className="text-gray-700">- Móp, méo, cong vênh các chi tiết sản phẩm</p>
                  <p className="text-gray-700">- Sót, mẻ cạnh, góc sản phẩm</p>
                  <p className="text-gray-700">- Hở đinh, ốc</p>
                  <p className="text-gray-700">- Biến dạng sản phẩm (do vận chuyển, do môi trường bảo quản từ phía nhà cung cấp, do quy trình sản xuất...)</p>
                </div>

                <h5 className="font-medium text-green-600 mt-4">3.2. Không áp dụng đổi trả đối với những trường hợp sau:</h5>
                <p className="text-gray-700">
                  • Các sản phẩm trong Chương trình Giảm giá và Khuyến mại hoặc từ Cửa hàng Giảm giá
                </p>
                <p className="text-gray-700">
                  • Các lỗi hỏng gãy ra trong quá trình sử dụng sau khi mua hàng như sử dụng không đúng cách, đặt trong môi trường không đảm bảo, bảo quản không đúng hướng dẫn, lắt trong quá mức về sinh sản phẩm không đúng cách...
                </p>
                <p className="text-gray-700">
                  • Các hao mòn thông thường (cơ sự phát mờ, rỉ sét, lỏng đinh vít hoặc bản lề sau một khoảng thời gian...)
                </p>
                <p className="text-gray-700">
                  • Và chậm trễ tại nạn khi sử dụng hoặc khi quý khách tự vận chuyển sản phẩm
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                4. Thời gian giải quyết các đơn hàng đổi trả
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Việc gởi sản phẩm thay thế hoặc hoàn tiền chỉ được bắt đầu sau khi chúng tôi đã hoàn tất việc kiểm tra đánh giá sản phẩm quý khách gởi lại
                </p>
                <p className="text-gray-700">
                  • Quy trình đánh giá chất lượng sản phẩm từ 3-5 ngày làm việc
                </p>
                <p className="text-gray-700">
                  • Bộ phận kỹ thuật sẽ liên hệ và thống nhất với khách hàng về quyết định của chúng hoặc đổi trả, thống nhất lịch giao hàng với quý khách hàng
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-green-700">
                5. Phí vận chuyển đổi sản phẩm đổi trả/bảo hành
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Green Garden bảo hành miễn phí đổi với các sản phẩm cùng kênh trong thời hạn bảo hành
                </p>
                <p className="text-gray-700">
                  • Quý khách thanh toán phí vận chuyển đối với các đơn hàng đổi trả theo biểu phí tại mục II.3
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      key: "payment",
      label: "Thanh toán",
      children: (
        <div className="w-full mx-auto p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-8">
            Chính sách thanh toán
          </h2>

          <div className="space-y-6">
            {/* Các hình thức thanh toán */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                1. Các hình thức thanh toán
              </h4>
              <div className="ml-6 space-y-2">
                <p className="text-gray-700">
                  • Thanh toán trực tiếp tiền mặt
                </p>
                <p className="text-gray-700">
                  • Thanh toán qua cổng thanh toán trực tiếp trên website greengarden.com
                </p>
                <p className="text-gray-700">
                  • Thanh toán khi nhận được hàng (COD) chỉ áp dụng cho khách hàng tại TP.HCM
                </p>
                <p className="text-gray-700">
                  • Thanh toán bằng hình thức chuyển khoản
                </p>
              </div>
            </div>

            {/* Thông tin các tài khoản */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                2. Thông tin chi tiết về số tài khoản
              </h4>
              <div className="ml-6 space-y-4">
                <div>
                  <p className="text-gray-700 font-medium">Ngân hàng TMCP Ngoại Thương Việt Nam</p>
                  <p className="text-gray-700">Chi nhánh Tân Bình</p>
                  <p className="text-gray-700">Chủ tài khoản: Nguyễn Trọng Thưởng</p>
                  <p className="text-gray-700">Số Tài Khoản: 0071 000 097 309</p>
                </div>

                <div>
                  <p className="text-gray-700 font-medium">Ngân hàng TMCP Công Thương Việt Nam</p>
                  <p className="text-gray-700">Chi nhánh Chợ Lớn</p>
                  <p className="text-gray-700">Chủ tài khoản: Nguyễn Trọng Thưởng</p>
                  <p className="text-gray-700">Số Tài Khoản: 1088 6930 9024</p>
                </div>
              </div>
            </div>

            {/* Nội dung tin chú ý */}
            <div>
              <h4 className="text-xl font-semibold text-green-700">
                3. Nội dung tin chú ý, quý khách hàng vui lòng lưu ý:
              </h4>
              <div className="ml-6 space-y-3">
                <p className="text-gray-700">
                  <span className="font-medium">Lưu ý:</span>
                </p>
                <p className="text-gray-700">
                  • Nội dung chuyển khoản ghi rõ HỌ TÊN hoặc TÊN ĐƠN VỊ - MÃ ĐƠN HÀNG. Sau khi chuyển khoản, chúng tôi sẽ liên hệ xác nhận và tiến hành giao hàng.
                </p>
                <p className="text-gray-700">
                  • Nếu sau thời gian thỏa thuận mà chúng tôi không giao hàng hoặc không phản hồi lại, quý khách có thể gởi khiếu nại trực tiếp về công ty và yêu cầu bồi thường nếu chứng minh được sự chậm trễ làm ảnh hưởng đến kinh doanh của quý khách.
                </p>
                <p className="text-gray-700">
                  • Đối với khách hàng có nhu cầu mua số lượng lớn để kinh doanh hoặc buôn sỉ vui lòng liên hệ trực tiếp với chúng tôi để có chính sách giá cả hợp lý và việc thanh toán sẽ được thực hiện theo hợp đồng.
                </p>
                <p className="text-gray-700">
                  • Chúng tôi cam kết kinh doanh minh bạch, hợp pháp, bán hàng chất lượng.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <Tabs
          defaultActiveKey="privacy"
          items={items}
          className="bg-white rounded-lg shadow-sm"
          size="large"
          tabBarStyle={{
            marginBottom: 0,
            paddingLeft: 24,
            borderBottom: "1px solid #f0f0f0",
          }}
        />
      </div>
    </div>
  );
};

export default PolicyContent;
