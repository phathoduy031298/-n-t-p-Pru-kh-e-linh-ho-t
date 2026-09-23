export interface CheatsheetSection {
  title: string;
  iconName: string;
  badge: string;
  items: {
    heading: string;
    content: string;
    highlight?: string;
  }[];
}

export const PRODUCT_CHEATSHEET: CheatsheetSection[] = [
  {
    title: 'Quy trình 5 Bước Bảo Lãnh Viện Phí Chuẩn Prudential',
    iconName: 'ShieldCheck',
    badge: 'Quy trình 24/7',
    items: [
      {
        heading: 'Bước 1: Xuất trình thẻ & Giấy tờ tùy thân',
        content: 'Khách hàng xuất trình Thẻ bảo lãnh điện tử (e-Card trên app PRUOnline / Zalo) kèm CCCD/Hộ chiếu gốc (hoặc Giấy khai sinh cho trẻ < 14 tuổi) tại Quầy Tiếp đón / Quầy Bảo hiểm của Bệnh viện liên kết.',
        highlight: 'Dặn khách mở sẵn PRUOnline trước khi vào viện.'
      },
      {
        heading: 'Bước 2: Bệnh viện tiếp nhận & Gửi yêu cầu',
        content: 'Bệnh viện thăm khám, xác định chẩn đoán sơ bộ, lên dự toán chi phí và gửi đề nghị bảo lãnh kèm hồ sơ y tế sang bộ phận thẩm định Bảo lãnh viện phí của Prudential.',
        highlight: 'CSYT liên hệ trực tiếp Prudential, khách hàng không cần tự làm giấy tờ.'
      },
      {
        heading: 'Bước 3: Prudential phản hồi Thư bảo lãnh',
        content: 'Prudential đối soát điều kiện hợp đồng, phát hành Thư bảo lãnh viện phí (hoặc Bảo lãnh tạm ứng ban đầu đối với ca nội trú) gửi lại bệnh viện trong vòng 30 - 120 phút.',
        highlight: 'Khách hàng an tâm điều trị, được giảm/miễn khoản tiền tạm ứng.'
      },
      {
        heading: 'Bước 4: Điều trị & Theo dõi viện phí',
        content: 'Khách hàng an tâm điều trị theo chỉ định của Bác sĩ. Nếu phát sinh chi phí hoặc kéo dài thời gian nằm viện, bệnh viện sẽ cập nhật thông tin bổ sung với Prudential.',
        highlight: 'Đại lý chủ động thăm hỏi, hướng dẫn khách hàng lưu ý chi phí phát sinh.'
      },
      {
        heading: 'Bước 5: Ký xác nhận chi phí & Hoàn tất xuất viện',
        content: 'Bệnh viện gửi bảng kê chi phí xuất viện cuối cùng cho Prudential duyệt. Khách hàng kiểm tra bảng kê chi tiết viện phí, ký xác nhận vào Thư bảo lãnh, thanh toán phần chi phí ngoài phạm vi (nếu có) và nhận lại CCCD cùng Giấy ra viện.',
        highlight: 'Giữ lại bản sao/ảnh chụp Giấy ra viện và Bảng kê chi tiết.'
      }
    ]
  },
  {
    title: 'Bảng Thời Gian Chờ (Waiting Period) Cần Nhớ',
    iconName: 'Clock',
    badge: 'Điều kiện hiệu lực',
    items: [
      {
        heading: 'Tai nạn (Accident)',
        content: 'Thời gian chờ: 0 NGÀY. Có hiệu lực bảo vệ ngay lập tức sau khi hợp đồng được chấp thuận và phát hành hợp lệ.',
        highlight: 'Hiệu lực tức thì - Không áp dụng thời gian chờ.'
      },
      {
        heading: 'Bệnh thông thường (Common Illness)',
        content: 'Thời gian chờ: 30 NGÀY kể từ ngày hợp đồng có hiệu lực (các bệnh cấp tính như sốt xuất huyết, viêm phổi, viêm ruột thừa, ngộ độc thức ăn...).',
        highlight: 'Khẩu quyết: 30 ngày cho bệnh thông thường.'
      },
      {
        heading: 'Bệnh đặc biệt / Khối u / Phẫu thuật phức tạp',
        content: 'Thời gian chờ: 90 NGÀY hoặc 180 NGÀY theo quy tắc chi tiết từng sản phẩm (u nang, sỏi mật, sỏi thận, trĩ, viêm xoang mạn tính...).',
        highlight: 'Cần tra cứu kỹ danh mục bệnh đặc biệt trong quy tắc.'
      },
      {
        heading: 'Thai sản (Maternity - nếu có quyền lợi)',
        content: 'Thời gian chờ: 270 NGÀY kể từ ngày hiệu lực quyền lợi chăm sóc thai sản.',
        highlight: 'Khách hàng cần tham gia trước khi mang thai.'
      }
    ]
  },
  {
    title: 'Chi Phí Thuộc Phạm Vi vs Ngoài Phạm Vi Bảo Lãnh',
    iconName: 'ListChecks',
    badge: 'Thực chiến tài chính',
    items: [
      {
        heading: 'Được Bảo Lãnh Chi Trả (Phạm vi y tế thiết yếu)',
        content: 'Tiền phòng nằm điều trị nội trú (trong hạn mức gói thẻ), tiền phòng chăm sóc đặc biệt (ICU), thuốc theo đơn điều trị nội trú, chi phí phẫu thuật, gây mê, phòng mổ, vật tư y tế tiêu hao cần thiết, xét nghiệm và chẩn đoán hình ảnh theo chỉ định.',
        highlight: 'Bảo vệ toàn diện các chi phí y tế lớn.'
      },
      {
        heading: 'Khách Hàng Tự Thanh Toán (Ngoài phạm vi bảo lãnh)',
        content: 'Chi phí sinh hoạt cá nhân (nước suối, khăn mặt, bàn chải, đồ ăn người nhà, điện thoại...), thực phẩm chức năng / vitamin bồi bổ không mang tính điều trị thiết yếu, chi phí giường bệnh dịch vụ cao cấp vượt quá hạn mức tối đa của gói thẻ, phần trăm đồng chi trả (nếu gói có đồng chi trả).',
        highlight: 'Tư vấn trước rõ ràng giúp khách hàng hài lòng 100%.'
      }
    ]
  },
  {
    title: 'Xử Lý Tình Huống: Chưa Được Bảo Lãnh Trực Tiếp Tại Viện',
    iconName: 'AlertCircle',
    badge: 'Xử lý phản đối',
    items: [
      {
        heading: 'Nguyên nhân thường gặp',
        content: 'Thông tin chẩn đoán ban đầu của bệnh viện chưa đủ rõ ràng; Cần đối soát lịch sử y tế trước ngày tham gia; Bệnh viện gửi yêu cầu quá sát giờ xuất viện; Chưa liên kết tuyến ngoại trú hoặc hệ thống mạng CSYT tạm thời trục trặc.',
        highlight: 'Từ chối bảo lãnh tại viện KHÔNG PHẢI là từ chối bồi thường!'
      },
      {
        heading: 'Hành động đại lý hướng dẫn khách hàng',
        content: '1. Trấn an khách hàng: Quyền lợi hợp đồng vẫn nguyên vẹn.\n2. Hướng dẫn khách thanh toán trước với bệnh viện.\n3. Lấy đầy đủ 3 chứng từ: (1) Hóa đơn tài chính (Hóa đơn điện tử/Hóa đơn đỏ); (2) Bảng kê chi tiết viện phí; (3) Giấy ra viện hoặc Toa thuốc/Bệnh án.\n4. Nộp hồ sơ bồi thường online trên app PRUOnline chỉ mất 3 phút.',
        highlight: 'Đại lý đồng hành nộp hồ sơ claim online ngay sau khi ra viện.'
      }
    ]
  },
  {
    title: 'Bí Kíp Sản Phẩm Mới: PRUKhỏe Linh Hoạt',
    iconName: 'Sparkles',
    badge: 'Sản phẩm mới',
    items: [
      {
        heading: 'Đồng Chi Trả 0% hoặc 20%: Quy Tắc Vàng',
        content: 'Mức Đồng chi trả (0% hoặc 20%) CHỈ áp dụng khi khách hàng khám và điều trị tại Bệnh viện tư nhân hoặc Phòng khám tư nhân. Khi điều trị tại BỆNH VIỆN CÔNG LẬP, khách hàng luôn được chi trả 100% trong hạn mức (0% đồng chi trả)!',
        highlight: 'Đi viện công: Luôn 0% đồng chi trả, hưởng 100% chi phí hợp lý!'
      },
      {
        heading: 'Ưu Đãi Nhân Đôi Hạn Mức Tại Bệnh Viện Công Lập',
        content: 'Sản phẩm mới ưu đãi nhân đôi hạn mức chi trả tối đa cho các quyền lợi điều trị nội trú, phẫu thuật khi khách hàng lựa chọn điều trị tại các Bệnh viện Công lập trên toàn quốc.',
        highlight: 'Gia tăng tối đa sức mạnh tài chính khi điều trị viện công.'
      },
      {
        heading: '3 Phạm Vi Địa Lý Linh Hoạt',
        content: 'Khách hàng có thể linh hoạt lựa chọn giữa 3 vùng bảo hiểm: Việt Nam; Châu Á; hoặc Toàn Cầu (tùy theo nhu cầu di chuyển, công tác và định cư).',
        highlight: 'Bảo vệ sức khỏe xuyên biên giới cùng Prudential.'
      },
      {
        heading: 'Hạn Mức Quyền Lợi Bổ Sung Đỉnh Cao',
        content: 'Hỗ trợ quyền lợi Chăm sóc Thai sản lên đến 200 triệu VNĐ/năm; Điều trị Ngoại trú lên đến 150 triệu VNĐ/năm; Chăm sóc Nha khoa lên đến 30 triệu VNĐ/năm.',
        highlight: 'Giải pháp chăm sóc y tế toàn diện nhất phân khúc.'
      }
    ]
  }
];
