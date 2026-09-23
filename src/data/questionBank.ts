import { Question } from '../types';

// ============================================================================
// BỘ 20 CÂU HỎI TÍNH TOÁN QUYỀN LỢI PRUKHỎE LINH HOẠT (TÌNH HUỐNG / TÍNH TOÁN)
// ============================================================================
export const CALCULATION_SCENARIO_QUESTIONS: Question[] = [
  {
    id: 'calc-01',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Khách hàng A tham gia gói PRUKhỏe Linh Hoạt 500 triệu/năm, điều trị nội trú không phẫu thuật.',
    question: 'Anh A tham gia PRUKhỏe Linh Hoạt với Hạn mức Nội trú 500 triệu đồng/năm, đồng chi trả 0%. Anh A nằm viện điều trị không phẫu thuật, tổng chi phí y tế hợp lệ là 300 triệu đồng. Hỏi số tiền tối đa Prudential chi trả cho quyền lợi nằm viện trong đợt này là bao nhiêu?',
    options: [
      '300 triệu',
      '250 triệu',
      '200 triệu',
      '150 triệu'
    ],
    correctAnswer: 1, // 250 triệu
    calculation: '500 triệu x 50% = 250 triệu đồng.',
    explanation: 'Nằm viện không phẫu thuật có giới hạn phụ 50% Hạn mức Hàng năm: 500 triệu x 50% = 250 triệu đồng. Do đó Prudential chi trả tối đa 250 triệu đồng.',
    memoryTip: 'Nằm viện không phẫu thuật: Giới hạn tối đa 50% hạn mức năm/đợt.',
    sourceDocPage: 'Bảng 1 - Quyền lợi Nội trú PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-02',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 30,
    scenario: 'Chị B nằm viện và có chỉ định phẫu thuật với chi phí y tế thực tế.',
    question: 'Chị B tham gia Hạn mức Nội trú 300 triệu đồng, đồng chi trả 0%. Chị B nằm viện và thực hiện phẫu thuật. Tổng chi phí y tế hợp lệ là 280 triệu đồng. Hỏi Prudential chi trả bao nhiêu?',
    options: [
      '150 triệu',
      '200 triệu',
      '280 triệu',
      '300 triệu'
    ],
    correctAnswer: 2, // 280 triệu
    calculation: 'Chi phí hợp lệ 280 triệu đồng, không vượt Hạn mức Nội trú 300 triệu đồng.',
    explanation: 'Nằm viện có phẫu thuật được chi trả theo Chi phí Y tế thực tế trong phạm vi Hạn mức Hàng năm (300 triệu). Toàn bộ 280 triệu đồng hợp lệ đều được chi trả.',
    memoryTip: 'Nằm viện có phẫu thuật: Chi trả theo chi phí y tế thực tế không quá hạn mức năm.',
    sourceDocPage: 'Bảng 1 - Quyền lợi Nội trú PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-03',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Khách hàng C nằm viện 10 ngày với giá phòng cao cấp 4 triệu/ngày.',
    question: 'Anh C có Hạn mức Nội trú 500 triệu đồng. Anh C nằm viện 10 ngày, tiền giường và phòng thực tế là 4 triệu đồng/ngày. Theo giới hạn của sản phẩm, tối đa Prudential chi trả tiền giường và phòng là bao nhiêu?',
    options: [
      '20 triệu',
      '25 triệu',
      '30 triệu',
      '40 triệu'
    ],
    correctAnswer: 2, // 30 triệu
    calculation: '500 triệu x 0,6% = 3 triệu/ngày; 3 triệu x 10 ngày = 30 triệu đồng.',
    explanation: 'Giới hạn tiền giường và phòng là 0,6% Hạn mức Hàng năm/ngày = 500 triệu x 0,6% = 3 triệu đồng/ngày. Nằm 10 ngày tối đa: 3 triệu x 10 = 30 triệu đồng.',
    memoryTip: 'Giường & Phòng Nội trú: Giới hạn 0,6% hạn mức năm/ngày (tối đa 100 ngày/năm).',
    sourceDocPage: 'Bảng 1 Mục A.1 - Chi phí Giường và Phòng'
  },
  {
    id: 'calc-04',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Chị D nằm viện tại Bệnh viện Công lập 5 ngày và đủ điều kiện hưởng phụ cấp.',
    question: 'Chị D có Hạn mức Nội trú 500 triệu đồng và nằm viện tại bệnh viện công ở Việt Nam 5 ngày. Giả sử đủ điều kiện nhận phụ cấp. Phụ cấp nằm viện tối đa là bao nhiêu?',
    options: [
      '1 triệu',
      '2,5 triệu',
      '10 triệu',
      '25 triệu'
    ],
    correctAnswer: 1, // 2,5 triệu
    calculation: '500 triệu x 0,1% = 500.000 đồng/ngày; 500.000 x 5 = 2,5 triệu đồng.',
    explanation: 'Phụ cấp nằm viện tại Bệnh viện Công là 0,1% Hạn mức Hàng năm/ngày (tối đa 5 ngày/đợt và 2 triệu/ngày). Với hạn mức 500 triệu: 500.000 đ/ngày x 5 ngày = 2,5 triệu đồng.',
    memoryTip: 'Phụ cấp Viện Công: 0,1% hạn mức/ngày (từ 3 ngày trở lên, tối đa 5 ngày/đợt).',
    sourceDocPage: 'Bảng 1 Mục A.1 - Phụ cấp Nằm Viện Bệnh Viện Công'
  },
  {
    id: 'calc-05',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Khách hàng E phát sinh chi phí y tế cả trước khi nhập viện và sau khi xuất viện.',
    question: 'Anh E có Hạn mức Nội trú 500 triệu đồng. Trước khi nhập viện 20 ngày, anh phát sinh 12 triệu đồng chi phí điều trị liên quan. Sau khi xuất viện 40 ngày, anh tiếp tục phát sinh 15 triệu đồng chi phí điều trị liên quan. Nếu các chi phí đều hợp lệ, tổng chi phí trước và sau nhập viện là bao nhiêu?',
    options: [
      '12 triệu',
      '15 triệu',
      '20 triệu',
      '27 triệu'
    ],
    correctAnswer: 3, // 27 triệu
    calculation: '12 triệu + 15 triệu = 27 triệu đồng.',
    explanation: 'Điều trị trước nhập viện trong vòng 30 ngày (20 ngày hợp lệ) và điều trị sau xuất viện trong vòng 60 ngày (40 ngày hợp lệ). Tổng chi trả = 12 + 15 = 27 triệu đồng.',
    memoryTip: 'Thời gian điều trị liên quan: 30 ngày TRƯỚC nhập viện & 60 ngày SAU xuất viện.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Chi phí Trước và Sau Nằm Viện'
  },
  {
    id: 'calc-06',
    category: 'Nội trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Anh F đã dùng hết 100% hạn mức năm ban đầu và kích hoạt quyền lợi Nhân đôi Hạn mức.',
    question: 'Anh F có Hạn mức Nội trú 500 triệu đồng. Trong năm hợp đồng, anh đã sử dụng hết 500 triệu đồng Hạn mức ban đầu. Sau đó anh tiếp tục nằm viện điều trị nội trú tại Bệnh viện Công và đáp ứng điều kiện kích hoạt Nhân đôi Hạn mức. Hạn mức tối đa có thể được sử dụng trong năm là bao nhiêu?',
    options: [
      '500 triệu',
      '750 triệu',
      '1 tỷ',
      '1,5 tỷ'
    ],
    correctAnswer: 2, // 1 tỷ
    calculation: '500 triệu + 100% x 500 triệu = 1 tỷ đồng.',
    explanation: 'Quyền lợi Nhân đôi Hạn mức cộng thêm 100% Hạn mức Hàng năm (thêm 500 triệu) khi thỏa điều kiện, nâng tổng hạn mức tối đa trong năm lên 1 tỷ đồng.',
    memoryTip: 'Nhân đôi Hạn mức: Cộng thêm 100% hạn mức ban đầu cho đợt nằm viện tiếp theo.',
    sourceDocPage: 'Điều 1.7 - Quyền lợi Nhân đôi Hạn mức'
  },
  {
    id: 'calc-07',
    category: 'Ngoại trú',
    questionType: 'scenario',
    timeLimit: 30,
    scenario: 'Chị G chọn chương trình kèm Quyền lợi Ngoại trú mức 4%.',
    question: 'Chị G tham gia Hạn mức Nội trú 500 triệu đồng và chọn Ngoại trú mức 4% Hạn mức Nội trú. Hạn mức Ngoại trú của chị G là bao nhiêu?',
    options: [
      '10 triệu',
      '20 triệu',
      '30 triệu',
      '40 triệu'
    ],
    correctAnswer: 1, // 20 triệu
    calculation: '500 triệu x 4% = 20 triệu đồng/năm.',
    explanation: 'Hạn mức Ngoại trú được tính theo tỷ lệ lựa chọn (4%) trên Hạn mức Nội trú: 500 triệu x 4% = 20 triệu đồng/năm.',
    memoryTip: 'Hạn mức Ngoại trú: Có 3 lựa chọn 2%, 4% hoặc 6% của Hạn mức Nội trú.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-08',
    category: 'Ngoại trú',
    questionType: 'scenario',
    timeLimit: 30,
    scenario: 'Khách hàng H tham gia Hạn mức Nội trú 1 tỷ đồng và chọn Ngoại trú mức cao nhất 6%.',
    question: 'Anh H có Hạn mức Nội trú 1 tỷ đồng, chọn Ngoại trú mức 6%. Hạn mức Ngoại trú là bao nhiêu?',
    options: [
      '40 triệu',
      '50 triệu',
      '60 triệu',
      '100 triệu'
    ],
    correctAnswer: 2, // 60 triệu
    calculation: '1 tỷ x 6% = 60 triệu đồng/năm.',
    explanation: 'Hạn mức Ngoại trú = 1 tỷ x 6% = 60 triệu đồng/năm (không vượt mức trần tối đa 150 triệu).',
    memoryTip: 'Hạn mức Ngoại trú = Tỷ lệ % lựa chọn x Hạn mức Nội trú (tối đa 150 triệu).',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-09',
    category: 'Ngoại trú',
    questionType: 'scenario',
    timeLimit: 40,
    scenario: 'Chị I đi khám ngoại trú Tây y tại phòng khám với hóa đơn 3 triệu đồng.',
    question: 'Chị I có Hạn mức Nội trú 500 triệu đồng, chọn Ngoại trú 4%. Một lần khám Tây y phát sinh chi phí hợp lệ 3 triệu đồng. Giới hạn chi trả cho lần khám này là bao nhiêu?',
    options: [
      '1 triệu',
      '2 triệu',
      '3 triệu',
      '20 triệu'
    ],
    correctAnswer: 1, // 2 triệu
    calculation: 'Hạn mức Ngoại trú = 500 triệu x 4% = 20 triệu; giới hạn lần khám = 20 triệu x 10% = 2 triệu đồng.',
    explanation: 'Hạn mức Ngoại trú = 20 triệu. Theo quy tắc sản phẩm, điều trị Tây y có giới hạn 10% Hạn mức Ngoại trú/lần khám = 20 triệu x 10% = 2 triệu đồng.',
    memoryTip: 'Khám Tây y Ngoại trú: Tối đa 10% hạn mức ngoại trú cho mỗi lần khám.',
    sourceDocPage: 'Bảng 2 Mục B.1 - Giới hạn Điều trị Tây y'
  },
  {
    id: 'calc-10',
    category: 'Ngoại trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Khách hàng K khám tại bệnh viện tư có áp dụng cơ chế đồng chi trả 20%.',
    question: 'Anh K có Hạn mức Ngoại trú 20 triệu đồng. Anh điều trị tại bệnh viện tư, một lần khám có tổng chi phí hợp lệ 2 triệu đồng. Tỷ lệ đồng chi trả là 20%. Prudential chi trả bao nhiêu?',
    options: [
      '400.000 đồng',
      '1 triệu đồng',
      '1,6 triệu đồng',
      '2 triệu đồng'
    ],
    correctAnswer: 2, // 1,6 triệu đồng
    calculation: '2 triệu x (100% - 20%) = 2 triệu x 80% = 1,6 triệu đồng.',
    explanation: 'Đồng chi trả 20% tại Bệnh viện Tư/Phòng khám Tư. Prudential chi trả 80% chi phí hợp lệ: 2 triệu x 80% = 1,6 triệu đồng (khách hàng chi trả 400.000 đồng).',
    memoryTip: 'Đồng chi trả 20% tại Viện Tư: Prudential chi trả 80%, khách hàng chi trả 20%.',
    sourceDocPage: 'Điều 1.3 & Bảng 2 - Cơ chế Đồng Chi Trả'
  },
  {
    id: 'calc-11',
    category: 'Ngoại trú',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Chị L trị liệu Đông y/vật lý trị liệu sau chấn thương phần mềm.',
    question: 'Chị L có Hạn mức Ngoại trú 20 triệu đồng. Chị sử dụng Y học thay thế/Vật lý trị liệu với chi phí 1 triệu đồng/lần khám. Giới hạn là 2,5% Hạn mức Ngoại trú/lần khám. Số tiền tối đa theo giới hạn là bao nhiêu?',
    options: [
      '200.000 đồng',
      '500.000 đồng',
      '1 triệu đồng',
      '2 triệu đồng'
    ],
    correctAnswer: 1, // 500.000 đồng
    calculation: '20 triệu x 2,5% = 500.000 đồng/lần khám.',
    explanation: 'Giới hạn chi trả Y học Thay thế/Vật lý Trị liệu là 2,5% Hạn mức Ngoại trú/lần khám = 20 triệu x 2,5% = 500.000 đồng/lần khám (tối đa 4 lần/năm).',
    memoryTip: 'Y học thay thế/Vật lý trị liệu: 2,5% hạn mức ngoại trú/lần (tối đa 4 lần/năm).',
    sourceDocPage: 'Bảng 2 Mục B.2 - Y học Thay thế và Vật lý Trị liệu'
  },
  {
    id: 'calc-12',
    category: 'Nha khoa',
    questionType: 'scenario',
    timeLimit: 30,
    scenario: 'Khách hàng M đăng ký quyền lợi tùy chọn Nha khoa mức 1,5%.',
    question: 'Anh M có Hạn mức Nội trú 500 triệu đồng, chọn Nha khoa mức 1,5% Hạn mức Nội trú. Hạn mức Nha khoa là bao nhiêu?',
    options: [
      '5 triệu',
      '7,5 triệu',
      '10 triệu',
      '15 triệu'
    ],
    correctAnswer: 1, // 7,5 triệu
    calculation: '500 triệu x 1,5% = 7,5 triệu đồng/năm.',
    explanation: 'Hạn mức Nha khoa được tính theo tỷ lệ lựa chọn (1,5%) trên Hạn mức Nội trú: 500 triệu x 1,5% = 7,5 triệu đồng/năm (tối đa 30 triệu).',
    memoryTip: 'Nha khoa có 3 tỷ lệ: 1%, 1,5% hoặc 2% Hạn mức Nội trú (tối đa 30 triệu).',
    sourceDocPage: 'Bảng 3 - Quyền lợi Nha khoa PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-13',
    category: 'Nha khoa',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Chị N đi cạo vôi và đánh bóng răng tại phòng nha.',
    question: 'Chị N có Hạn mức Nha khoa 10 triệu đồng. Chị đi cạo vôi và đánh bóng răng. Chi phí thực tế là 1,5 triệu đồng. Giới hạn quyền lợi là 10% Hạn mức Nha khoa/lần khám. Prudential chi trả tối đa bao nhiêu?',
    options: [
      '500.000 đồng',
      '1 triệu đồng',
      '1,5 triệu đồng',
      '10 triệu đồng'
    ],
    correctAnswer: 1, // 1 triệu đồng
    calculation: '10 triệu x 10% = 1 triệu đồng/lần khám.',
    explanation: 'Giới hạn chi trả cạo vôi và đánh bóng răng là 10% Hạn mức Nha khoa/lần khám: 10 triệu x 10% = 1 triệu đồng (tối đa 2 lần/năm).',
    memoryTip: 'Cạo vôi răng: Tối đa 10% hạn mức nha khoa/lần, tối đa 2 lần/năm.',
    sourceDocPage: 'Bảng 3 Mục C.1 - Cạo vôi và Đánh bóng răng'
  },
  {
    id: 'calc-14',
    category: 'Nha khoa',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Anh P điều trị răng tại phòng khám nha khoa tư nhân.',
    question: 'Anh P có Hạn mức Nha khoa 10 triệu đồng. Anh điều trị tại phòng khám tư, chi phí hợp lệ cho một lần điều trị là 2 triệu đồng và nằm trong giới hạn quyền lợi. Sau đồng chi trả 20%, Prudential chi trả bao nhiêu?',
    options: [
      '1 triệu',
      '1,2 triệu',
      '1,6 triệu',
      '2 triệu'
    ],
    correctAnswer: 2, // 1,6 triệu
    calculation: '2 triệu x (100% - 20%) = 2 triệu x 80% = 1,6 triệu đồng.',
    explanation: 'Tại phòng khám/bệnh viện tư nhân áp dụng đồng chi trả 20%. Prudential chi trả 80%: 2 triệu x 80% = 1,6 triệu đồng.',
    memoryTip: 'Nha khoa tại cơ sở tư nhân áp dụng đồng chi trả 20% (Prudential trả 80%).',
    sourceDocPage: 'Bảng 3 & Điều 1.3 - Đồng chi trả Nha khoa'
  },
  {
    id: 'calc-15',
    category: 'Thai sản',
    questionType: 'scenario',
    timeLimit: 30,
    scenario: 'Chị Q tham gia gói bảo hiểm nội trú 500 triệu có kèm quyền lợi Thai sản.',
    question: 'Chị Q tham gia Hạn mức Nội trú 500 triệu đồng. Hạn mức Thai sản của chị là bao nhiêu?',
    options: [
      '20 triệu',
      '30 triệu',
      '40 triệu',
      '50 triệu'
    ],
    correctAnswer: 2, // 40 triệu
    calculation: '500 triệu x 8% = 40 triệu đồng.',
    explanation: 'Hạn mức Thai sản cố định bằng 8% Hạn mức Nội trú: 500 triệu x 8% = 40 triệu đồng (tối đa 200 triệu đồng).',
    memoryTip: 'Hạn mức Thai sản = 8% Hạn mức Nội trú (tối đa 200 triệu).',
    sourceDocPage: 'Bảng 4 - Quyền lợi Thai sản PRUKhỏe Linh Hoạt'
  },
  {
    id: 'calc-16',
    category: 'Thai sản',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Sản phụ R sinh thường tại bệnh viện sau khi đã qua thời gian chờ 270 ngày.',
    question: 'Chị R có Hạn mức Nội trú 500 triệu đồng, tương ứng Hạn mức Thai sản 40 triệu đồng. Chị sinh thường và đáp ứng đầy đủ điều kiện chi trả. Chi phí sinh thường tối đa được chi trả là bao nhiêu?',
    options: [
      '20 triệu',
      '30 triệu',
      '40 triệu',
      '50 triệu'
    ],
    correctAnswer: 0, // 20 triệu
    calculation: '40 triệu x 50% = 20 triệu đồng.',
    explanation: 'Chi phí Sinh Thường được tính bằng 50% Hạn mức Thai sản: 40 triệu x 50% = 20 triệu đồng.',
    memoryTip: 'Sinh thường = 50% Hạn mức Thai sản; Sinh mổ = 100% Hạn mức Thai sản.',
    sourceDocPage: 'Bảng 4 Mục D.1 - Chi phí Sinh Thường'
  },
  {
    id: 'calc-17',
    category: 'Thai sản',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Sản phụ S có chỉ định sinh mổ tại bệnh viện.',
    question: 'Chị S có Hạn mức Nội trú 1 tỷ đồng. Hạn mức Thai sản = 8% Hạn mức Nội trú. Chị sinh mổ và đáp ứng điều kiện chi trả. Số tiền tối đa cho chi phí sinh mổ là bao nhiêu?',
    options: [
      '40 triệu',
      '60 triệu',
      '80 triệu',
      '100 triệu'
    ],
    correctAnswer: 2, // 80 triệu
    calculation: '1 tỷ x 8% = 80 triệu đồng; sinh mổ = 100% Hạn mức Thai sản = 80 triệu đồng.',
    explanation: 'Hạn mức Thai sản = 1 tỷ x 8% = 80 triệu đồng. Chi phí Sinh mổ được chi trả tối đa 100% Hạn mức Thai sản = 80 triệu đồng.',
    memoryTip: 'Sinh mổ: Chi trả tối đa 100% Hạn mức Thai sản.',
    sourceDocPage: 'Bảng 4 Mục D.1 - Chi phí Sinh Mổ'
  },
  {
    id: 'calc-18',
    category: 'Thai sản',
    questionType: 'scenario',
    timeLimit: 35,
    scenario: 'Chi phí khám thai trước sinh và kiểm tra sau sinh của sản phụ T.',
    question: 'Chị T có Hạn mức Thai sản 40 triệu đồng. Chi phí khám trước/sau sinh là 3 triệu đồng/lần. Giới hạn mỗi lần khám là 5% Hạn mức Thai sản. Hỏi tối đa Prudential chi trả cho mỗi lần khám?',
    options: [
      '1 triệu',
      '2 triệu',
      '3 triệu',
      '4 triệu'
    ],
    correctAnswer: 1, // 2 triệu
    calculation: '40 triệu x 5% = 2 triệu đồng/lần khám.',
    explanation: 'Giới hạn mỗi lần khám trước/sau sinh là 5% Hạn mức Thai sản: 40 triệu x 5% = 2 triệu đồng/lần khám (tối đa 3 lần khám/kỳ thai sản).',
    memoryTip: 'Khám thai trước/sau sinh: 5% hạn mức thai sản/lần (tối đa 3 lần/kỳ thai sản).',
    sourceDocPage: 'Bảng 4 Mục D.2 - Khám trước và sau sinh'
  },
  {
    id: 'calc-19',
    category: 'Thai sản',
    questionType: 'scenario',
    timeLimit: 40,
    scenario: 'Sản phụ U nằm viện nghỉ ngơi sau sinh 5 ngày.',
    question: 'Chị U có Hạn mức Thai sản 40 triệu đồng. Chị nằm viện 5 ngày sau sinh. Giới hạn chi phí giường và phòng là 10% Hạn mức Thai sản/ngày. Hỏi tối đa quyền lợi giường và phòng là bao nhiêu?',
    options: [
      '10 triệu',
      '15 triệu',
      '20 triệu',
      '40 triệu'
    ],
    correctAnswer: 2, // 20 triệu
    calculation: '40 triệu x 10% = 4 triệu/ngày; 4 triệu x 5 ngày = 20 triệu đồng.',
    explanation: 'Giới hạn chi phí giường và phòng thai sản là 10% Hạn mức Thai sản/ngày = 40 triệu x 10% = 4 triệu đồng/ngày. Nằm 5 ngày tối đa: 4 triệu x 5 = 20 triệu đồng.',
    memoryTip: 'Giường phòng Thai sản: Giới hạn 10% hạn mức thai sản/ngày.',
    sourceDocPage: 'Bảng 4 Mục D.3 - Giường và phòng sau sinh'
  },
  {
    id: 'calc-20',
    category: 'Tổng hợp',
    questionType: 'scenario',
    timeLimit: 60, // Câu hỏi tính toán tổng hợp 4 quyền lợi cần thời gian suy nghĩ 60s
    scenario: 'Khách hàng V tham gia gói bảo hiểm toàn diện đầy đủ 4 quyền lợi và phát sinh chi phí y tế trong năm.',
    question: 'Chị V tham gia Hạn mức Nội trú 500 triệu, Ngoại trú 4%, Nha khoa 1,5% và Thai sản 8%. Trong năm: (1) nằm viện có phẫu thuật, chi phí hợp lệ 200 triệu; (2) khám ngoại trú tại bệnh viện tư 2 triệu, đồng chi trả 20%; (3) điều trị nha khoa tại phòng khám tư 1 triệu, đồng chi trả 20%; (4) sinh thường đủ điều kiện hưởng quyền lợi. Tổng số tiền Prudential có thể chi trả theo 4 tình huống là bao nhiêu?',
    options: [
      '220 triệu',
      '222,4 triệu',
      '223,6 triệu',
      '240 triệu'
    ],
    correctAnswer: 1, // 222,4 triệu
    calculation: 'Nội trú 200 triệu + Ngoại trú (2 triệu x 80% = 1,6 triệu) + Nha khoa (1 triệu x 80% = 0,8 triệu) + Thai sản (500 triệu x 8% x 50% = 20 triệu) = 200 + 1,6 + 0,8 + 20 = 222,4 triệu đồng.',
    explanation: 'Chi tiết từng khoản: (1) Nội trú có phẫu thuật: 200 triệu; (2) Ngoại trú tại viện tư: 2 triệu x 80% = 1,6 triệu; (3) Nha khoa tại phòng khám tư: 1 triệu x 80% = 0,8 triệu; (4) Sinh thường: 500 triệu x 8% x 50% = 20 triệu. Tổng cộng = 200 + 1,6 + 0,8 + 20 = 222,4 triệu đồng.',
    memoryTip: 'Nguyên tắc tính: Tính độc lập từng quyền lợi theo hạn mức và tỷ lệ đồng chi trả rồi cộng lại.',
    sourceDocPage: 'Tổng hợp Điều 1 Quy tắc PRUKhỏe Linh Hoạt'
  }
];

// ============================================================================
// BỘ 50 CÂU HỎI LÝ THUYẾT PRUKHỎE LINH HOẠT
// ============================================================================
export const THEORY_QUESTIONS: Question[] = [
  {
    id: 'theory-01',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Trong PRUKhỏe Linh Hoạt, quyền lợi nào là quyền lợi bảo hiểm cơ bản?',
    options: [
      'Ngoại trú',
      'Nha khoa',
      'Nội trú',
      'Thai sản'
    ],
    correctAnswer: 2, // Nội trú
    explanation: 'Quyền lợi Nội trú là quyền lợi bảo hiểm cơ bản bắt buộc; Ngoại trú, Nha khoa và Thai sản là các quyền lợi bảo hiểm tùy chọn gia tăng.',
    memoryTip: 'Cơ bản bắt buộc: Nội trú | Tùy chọn gia tăng: Ngoại trú, Nha khoa, Thai sản.',
    sourceDocPage: 'Trang 1 - Bảng tóm tắt sản phẩm PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-02',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Có bao nhiêu quyền lợi bảo hiểm tùy chọn trong PRUKhỏe Linh Hoạt?',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctAnswer: 2, // 3
    explanation: 'Có 3 quyền lợi bảo hiểm tùy chọn: Quyền lợi Ngoại trú, Quyền lợi Nha khoa và Quyền lợi Thai sản.',
    memoryTip: 'Bộ 3 tùy chọn: Ngoại trú - Nha khoa - Thai sản.',
    sourceDocPage: 'Điều 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-03',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Chương trình nào có thể được lựa chọn khi tham gia PRUKhỏe Linh Hoạt?',
    options: [
      'Chỉ Nội trú',
      'Nội trú + Ngoại trú',
      'Nội trú + Ngoại trú + Nha khoa',
      'Tất cả các tổ hợp được quy định trong 5 chương trình'
    ],
    correctAnswer: 3, // Tất cả các tổ hợp
    explanation: 'Sản phẩm có 5 chương trình linh hoạt: (1) Chỉ Nội trú; (2) Nội trú + Ngoại trú; (3) Nội trú + Ngoại trú + Nha khoa; (4) Nội trú + Ngoại trú + Thai sản; (5) Đầy đủ cả 4 quyền lợi.',
    memoryTip: 'Linh hoạt 5 chương trình đáp ứng trọn vẹn mọi nhu cầu và ngân sách của khách hàng.',
    sourceDocPage: 'Điều 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-04',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Người được bảo hiểm phải bao nhiêu tuổi tại thời điểm tham gia?',
    options: [
      'Từ 18 đến 50 tuổi',
      'Từ 30 ngày tuổi đến 70 tuổi',
      'Từ 6 đến 75 tuổi',
      'Từ 1 đến 100 tuổi'
    ],
    correctAnswer: 1, // Từ 30 ngày tuổi đến 70 tuổi
    explanation: 'Độ tuổi tham gia của Người Được Bảo Hiểm là từ 30 ngày tuổi đến 70 tuổi (tính theo sinh nhật gần nhất).',
    memoryTip: 'Tuổi tham gia: Từ 30 ngày tuổi đến 70 tuổi.',
    sourceDocPage: 'Điều 6 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-05',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Thời hạn bảo hiểm của PRUKhỏe Linh Hoạt là bao lâu?',
    options: [
      '6 tháng',
      '1 năm',
      '5 năm',
      '10 năm'
    ],
    correctAnswer: 1, // 1 năm
    explanation: 'Thời hạn bảo hiểm là 1 năm tính từ Ngày Hiệu Lực và tự động tái tục hàng năm cho đến tối đa 100 tuổi.',
    memoryTip: 'Thời hạn: 1 năm, tự động tái tục hàng năm đến 100 tuổi.',
    sourceDocPage: 'Điều 7 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-06',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Tuổi Bảo hiểm được hiểu là gì?',
    options: [
      'Tuổi theo năm dương lịch',
      'Tuổi tính theo ngày sinh nhật gần nhất trước Ngày Hiệu Lực hoặc Ngày Kỷ Niệm Năm Hợp Đồng',
      'Tuổi trên CCCD',
      'Tuổi khi ký hợp đồng'
    ],
    correctAnswer: 1,
    explanation: 'Tuổi Bảo hiểm được tính theo ngày sinh nhật gần nhất trước Ngày Hiệu Lực hoặc trước Ngày Kỷ Niệm Năm Hợp Đồng.',
    memoryTip: 'Tuổi Bảo hiểm: Tính theo sinh nhật gần nhất trước ngày hiệu lực/kỷ niệm hợp đồng.',
    sourceDocPage: 'Điều khoản định nghĩa - Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-07',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Đồng chi trả của quyền lợi Nội trú có thể là mức nào?',
    options: [
      '0% hoặc 10%',
      '10% hoặc 20%',
      '20% hoặc 0%',
      '30% hoặc 50%'
    ],
    correctAnswer: 2, // 20% hoặc 0%
    explanation: 'Khách hàng có thể lựa chọn mức Đồng Chi Trả 0% hoặc 20%. Mức đồng chi trả 20% chỉ áp dụng tại Bệnh Viện Tư / Phòng Khám Tư.',
    memoryTip: 'Đồng chi trả: 0% hoặc 20% (chỉ áp dụng tại cơ sở y tế tư nhân).',
    sourceDocPage: 'Bảng 1 & Điều 1.3 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-08',
    category: 'Tổng quan',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Đồng chi trả nếu có áp dụng cho điều trị tại đâu?',
    options: [
      'Mọi bệnh viện',
      'Chỉ bệnh viện công',
      'Bệnh viện Tư hoặc Phòng khám Tư',
      'Chỉ điều trị ở nước ngoài'
    ],
    correctAnswer: 2, // Bệnh viện Tư hoặc Phòng khám Tư
    explanation: 'Theo quy tắc sản phẩm, tỷ lệ Đồng Chi Trả chỉ áp dụng khi Người Được Bảo Hiểm khám/điều trị tại Bệnh Viện Tư hoặc Phòng Khám Tư. Bệnh Viện Công luôn được trả 100%.',
    memoryTip: 'Đồng chi trả: Chỉ áp dụng tại Viện Tư/Phòng Khám Tư. Viện Công trả 100%.',
    sourceDocPage: 'Điều 1.3 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-09',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Hạn mức Nội trú có những lựa chọn nào theo Bảng 1?',
    options: [
      '100, 200, 300, 500 triệu; 600, 800 triệu; 1, 2 tỷ; 3, 5 tỷ',
      'Chỉ 100, 200, 500 triệu',
      'Chỉ 500 triệu và 1 tỷ',
      '50, 100, 150, 200 triệu'
    ],
    correctAnswer: 0,
    explanation: 'Bảng 1 quy định dải hạn mức phong phú từ 100, 200, 300, 500 triệu; 600, 800 triệu; 1 tỷ, 2 tỷ; đến 3 tỷ, 5 tỷ đồng.',
    memoryTip: 'Hạn mức Nội trú đa dạng: Từ 100 triệu đến 5 tỷ đồng.',
    sourceDocPage: 'Bảng 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-10',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Phạm vi địa lý của quyền lợi Nội trú có thể là gì?',
    options: [
      'Chỉ Việt Nam',
      'Việt Nam, Châu Á hoặc Toàn cầu',
      'Chỉ Châu Á',
      'Toàn cầu bắt buộc'
    ],
    correctAnswer: 1, // Việt Nam, Châu Á hoặc Toàn cầu
    explanation: 'Phạm vi địa lý của Quyền lợi Nội trú bao gồm: Việt Nam, Châu Á hoặc Toàn cầu tùy thuộc vào Hạn mức Hàng năm được lựa chọn.',
    memoryTip: 'Phạm vi địa lý: Việt Nam, Châu Á hoặc Toàn cầu.',
    sourceDocPage: 'Bảng 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-11',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Nằm viện không có phẫu thuật có giới hạn phụ bao nhiêu % Hạn mức Hàng năm?',
    options: [
      '20%',
      '30%',
      '50%',
      '100%'
    ],
    correctAnswer: 2, // 50%
    explanation: 'Nằm viện không có phẫu thuật có giới hạn phụ là 50% Hạn mức Hàng năm cho mỗi đợt nằm viện.',
    memoryTip: 'Nằm viện không phẫu thuật: Giới hạn phụ 50% hạn mức năm/đợt.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Chi phí Nằm viện không phẫu thuật'
  },
  {
    id: 'theory-12',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Nằm viện có phẫu thuật được áp dụng giới hạn phụ theo cách nào?',
    options: [
      'Luôn cố định 50% Hạn mức',
      'Theo Chi phí Y tế thực tế, trong phạm vi Hạn mức và giới hạn áp dụng',
      'Chỉ được 20% Hạn mức',
      'Không được chi trả'
    ],
    correctAnswer: 1,
    explanation: 'Nằm viện có phẫu thuật được chi trả theo Chi phí Y tế thực tế trong phạm vi Hạn mức Hàng năm và các giới hạn phụ áp dụng.',
    memoryTip: 'Nằm viện có phẫu thuật: Trả theo chi phí y tế thực tế.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Phẫu thuật Nội trú'
  },
  {
    id: 'theory-13',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Giới hạn Chi phí Giường và Phòng của quyền lợi Nội trú là bao nhiêu?',
    options: [
      '0,1%/ngày',
      '0,5%/ngày',
      '0,6%/ngày',
      '1%/ngày'
    ],
    correctAnswer: 2, // 0,6%/ngày
    explanation: 'Chi phí Giường và Phòng có giới hạn là 0,6% Hạn mức Hàng năm/ngày (tối đa 100 ngày trong một Năm Hợp Đồng).',
    memoryTip: 'Giường & Phòng Nội trú: 0,6% hạn mức năm/ngày.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Giường và Phòng'
  },
  {
    id: 'theory-14',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Chi phí Giường và Phòng tối đa bao nhiêu ngày trong một Năm Hợp Đồng?',
    options: [
      '30 ngày',
      '60 ngày',
      '90 ngày',
      '100 ngày'
    ],
    correctAnswer: 3, // 100 ngày
    explanation: 'Chi phí Giường và Phòng được chi trả tối đa lên đến 100 ngày trong mỗi Năm Hợp Đồng.',
    memoryTip: 'Số ngày giường phòng tối đa: 100 ngày/năm hợp đồng.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Giường và Phòng'
  },
  {
    id: 'theory-15',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Phụ cấp nằm viện tại Bệnh viện Công chỉ áp dụng khi điều trị nội trú từ bao nhiêu ngày trở lên?',
    options: [
      '1 ngày',
      '2 ngày',
      '3 ngày',
      '5 ngày'
    ],
    correctAnswer: 2, // 3 ngày
    explanation: 'Phụ cấp nằm viện tại Bệnh viện Công ở Việt Nam chỉ áp dụng khi Người Được Bảo Hiểm điều trị nội trú từ 3 ngày trở lên.',
    memoryTip: 'Điều kiện phụ cấp viện công: Nằm viện từ 3 ngày trở lên.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Phụ cấp viện công'
  },
  {
    id: 'theory-16',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Phụ cấp nằm viện tại Bệnh viện Công có giới hạn tối đa bao nhiêu ngày cho một đợt nằm viện?',
    options: [
      '3 ngày',
      '5 ngày',
      '10 ngày',
      '30 ngày'
    ],
    correctAnswer: 1, // 5 ngày
    explanation: 'Phụ cấp nằm viện tại Bệnh viện Công tối đa 5 ngày cho một Đợt Nằm Viện và tối đa 30 ngày trong một Năm Hợp Đồng.',
    memoryTip: 'Phụ cấp viện công: Tối đa 5 ngày/đợt và 30 ngày/năm hợp đồng.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Phụ cấp viện công'
  },
  {
    id: 'theory-17',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Giới hạn Chi phí Giường dành cho Thân nhân là bao nhiêu?',
    options: [
      '0,05%/ngày',
      '0,1%/ngày',
      '0,5%/ngày',
      '1%/ngày'
    ],
    correctAnswer: 1, // 0,1%/ngày
    explanation: 'Chi phí Giường dành cho Thân nhân có giới hạn 0,1% Hạn mức Hàng năm/ngày (tối đa 30 ngày trong một Năm Hợp Đồng).',
    memoryTip: 'Giường thân nhân: 0,1% hạn mức/ngày (tối đa 30 ngày/năm).',
    sourceDocPage: 'Bảng 1 Mục A.1 - Giường thân nhân'
  },
  {
    id: 'theory-18',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Điều trị trước khi nhập viện được tính trong khoảng thời gian nào?',
    options: [
      '7 ngày',
      '15 ngày',
      '30 ngày trước khi nhập viện',
      '60 ngày'
    ],
    correctAnswer: 2, // 30 ngày trước khi nhập viện
    explanation: 'Chi phí điều trị y tế liên quan trước khi nhập viện được chi trả nếu phát sinh trong vòng 30 ngày trước ngày nhập viện.',
    memoryTip: 'Trước nhập viện: Trong vòng 30 ngày.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Điều trị trước nhập viện'
  },
  {
    id: 'theory-19',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Điều trị sau khi xuất viện được tính trong khoảng thời gian nào?',
    options: [
      '15 ngày',
      '30 ngày',
      '60 ngày sau khi xuất viện',
      '90 ngày'
    ],
    correctAnswer: 2, // 60 ngày sau khi xuất viện
    explanation: 'Chi phí điều trị y tế liên quan sau khi xuất viện được chi trả nếu phát sinh trong vòng 60 ngày kể từ ngày xuất viện.',
    memoryTip: 'Sau xuất viện: Trong vòng 60 ngày.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Điều trị sau xuất viện'
  },
  {
    id: 'theory-20',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Dịch vụ Chăm sóc Y tế tại Nhà được chi trả tối đa bao nhiêu ngày trong một Năm Hợp Đồng?',
    options: [
      '5 ngày',
      '10 ngày',
      '15 ngày',
      '30 ngày'
    ],
    correctAnswer: 2, // 15 ngày
    explanation: 'Dịch vụ Chăm sóc Y tế tại Nhà phát sinh trong vòng 60 ngày sau xuất viện và được chi trả tối đa 15 ngày trong một Năm Hợp Đồng.',
    memoryTip: 'Chăm sóc tại nhà: Tối đa 15 ngày/năm hợp đồng.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Chăm sóc y tế tại nhà'
  },
  {
    id: 'theory-21',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Phòng Chăm sóc Đặc biệt (ICU) được chi trả tối đa bao nhiêu ngày trong một Năm Hợp Đồng?',
    options: [
      '15 ngày',
      '20 ngày',
      '30 ngày',
      '60 ngày'
    ],
    correctAnswer: 2, // 30 ngày
    explanation: 'Chi phí Phòng Chăm sóc Đặc biệt (ICU) được chi trả theo Chi phí Y tế thực tế, tối đa 30 ngày trong một Năm Hợp Đồng.',
    memoryTip: 'ICU (Hồi sức tích cực): Tối đa 30 ngày/năm hợp đồng.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Phòng ICU'
  },
  {
    id: 'theory-22',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Cấp cứu do Tai nạn phải phát sinh trong khoảng thời gian nào kể từ khi xảy ra Tai nạn?',
    options: [
      '6 giờ',
      '12 giờ',
      '24 giờ',
      '72 giờ'
    ],
    correctAnswer: 2, // 24 giờ
    explanation: 'Quyền lợi Cấp cứu Do Tai Nạn chi trả khi Người Được Bảo Hiểm được cấp cứu điều trị trong vòng 24 giờ kể từ khi xảy ra Tai nạn.',
    memoryTip: 'Cấp cứu Tai nạn: Trong vòng 24 giờ kể từ khi tai nạn.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Cấp cứu Tai nạn'
  },
  {
    id: 'theory-23',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Chi phí Xe Cứu Thương tại Việt Nam được giới hạn tối đa bao nhiêu lần trong một Năm Hợp Đồng?',
    options: [
      '2 lần',
      '3 lần',
      '4 lần',
      '5 lần'
    ],
    correctAnswer: 2, // 4 lần
    explanation: 'Chi phí Xe Cứu Thương nội địa tại Việt Nam được chi trả theo Chi phí Y tế thực tế, tối đa 4 lần trong một Năm Hợp Đồng.',
    memoryTip: 'Xe cứu thương tại Việt Nam: Tối đa 4 lần/năm hợp đồng.',
    sourceDocPage: 'Bảng 1 Mục A.1 - Xe cứu thương'
  },
  {
    id: 'theory-24',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Quyền lợi Nhân đôi Hạn mức cộng thêm tối đa bao nhiêu % Hạn mức Nội trú ban đầu?',
    options: [
      '50%',
      '75%',
      '100%',
      '200%'
    ],
    correctAnswer: 2, // 100%
    explanation: 'Khi Hạn mức Hàng năm ban đầu đã được chi trả hết và đáp ứng điều kiện, quyền lợi Nhân Đôi sẽ cộng thêm tối đa 100% Hạn mức Hàng năm.',
    memoryTip: 'Nhân đôi hạn mức: Thêm tối đa 100% hạn mức ban đầu.',
    sourceDocPage: 'Điều 1.7 - Quyền lợi Nhân đôi Hạn mức'
  },
  {
    id: 'theory-25',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Quyền lợi Nhân đôi Hạn mức áp dụng cho một đợt nằm viện tiếp theo tối đa bao nhiêu lần trong một Năm Hợp Đồng?',
    options: [
      'Không giới hạn',
      '2 đợt',
      '1 đợt',
      '5 đợt'
    ],
    correctAnswer: 2, // 1 đợt
    explanation: 'Quyền lợi Nhân đôi Hạn mức được áp dụng một lần duy nhất cho một Đợt Nằm Viện tiếp theo trong một Năm Hợp Đồng.',
    memoryTip: 'Nhân đôi hạn mức: Áp dụng 1 lần duy nhất cho 1 đợt nằm viện tiếp theo.',
    sourceDocPage: 'Điều 1.7 - Quyền lợi Nhân đôi Hạn mức'
  },
  {
    id: 'theory-26',
    category: 'Nội trú',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Điều trị Ung thư theo Bảng 1 được chi trả theo nguyên tắc nào?',
    options: [
      '50% Hạn mức',
      '10% Hạn mức',
      'Theo Chi phí Y tế thực tế trong phạm vi quy định',
      'Không chi trả'
    ],
    correctAnswer: 2,
    explanation: 'Điều trị Ung thư (hóa trị, xạ trị, liệu pháp trúng đích) được chi trả theo Chi phí Y tế thực tế trong phạm vi Hạn mức Hàng năm và các điều khoản áp dụng.',
    memoryTip: 'Điều trị Ung thư: Chi trả theo chi phí y tế thực tế.',
    sourceDocPage: 'Bảng 1 Mục A.2 - Điều trị Ung thư'
  },
  {
    id: 'theory-27',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Quyền lợi Ngoại trú có mấy lựa chọn Hạn mức Hàng năm?',
    options: [
      '2',
      '3',
      '4',
      '5'
    ],
    correctAnswer: 1, // 3
    explanation: 'Ngoại trú có 3 lựa chọn hạn mức tính theo tỷ lệ: 2%, 4% hoặc 6% của Hạn mức Hàng năm Quyền lợi Nội trú.',
    memoryTip: 'Ngoại trú có 3 lựa chọn: 2%, 4% hoặc 6% hạn mức nội trú.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-28',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Lựa chọn 1 của Hạn mức Ngoại trú bằng bao nhiêu % Hạn mức Nội trú?',
    options: [
      '1%',
      '2%',
      '4%',
      '6%'
    ],
    correctAnswer: 1, // 2%
    explanation: 'Lựa chọn 1 của Hạn mức Ngoại trú bằng 2% Hạn mức Hàng năm của Quyền lợi Nội trú.',
    memoryTip: 'Lựa chọn 1: Ngoại trú = 2% Nội trú.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú'
  },
  {
    id: 'theory-29',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Lựa chọn 2 của Hạn mức Ngoại trú bằng bao nhiêu % Hạn mức Nội trú?',
    options: [
      '2%',
      '3%',
      '4%',
      '6%'
    ],
    correctAnswer: 2, // 4%
    explanation: 'Lựa chọn 2 của Hạn mức Ngoại trú bằng 4% Hạn mức Hàng năm của Quyền lợi Nội trú.',
    memoryTip: 'Lựa chọn 2: Ngoại trú = 4% Nội trú.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú'
  },
  {
    id: 'theory-30',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Lựa chọn 3 của Hạn mức Ngoại trú bằng bao nhiêu % Hạn mức Nội trú?',
    options: [
      '2%',
      '4%',
      '5%',
      '6%'
    ],
    correctAnswer: 3, // 6%
    explanation: 'Lựa chọn 3 của Hạn mức Ngoại trú bằng 6% Hạn mức Hàng năm của Quyền lợi Nội trú.',
    memoryTip: 'Lựa chọn 3: Ngoại trú = 6% Nội trú.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú'
  },
  {
    id: 'theory-31',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Hạn mức Ngoại trú tối đa là bao nhiêu?',
    options: [
      '50 triệu đồng',
      '100 triệu đồng',
      '150 triệu đồng',
      '200 triệu đồng'
    ],
    correctAnswer: 2, // 150 triệu đồng
    explanation: 'Hạn mức Hàng năm của Quyền lợi Ngoại trú tối đa là 150 triệu đồng.',
    memoryTip: 'Trần Hạn mức Ngoại trú: Tối đa 150 triệu đồng/năm.',
    sourceDocPage: 'Bảng 2 - Quyền lợi Ngoại trú'
  },
  {
    id: 'theory-32',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Giới hạn điều trị Tây y của Ngoại trú là bao nhiêu?',
    options: [
      '5%/lần khám',
      '10%/lần khám',
      '20%/lần khám',
      '50%/lần khám'
    ],
    correctAnswer: 1, // 10%/lần khám
    explanation: 'Chi phí điều trị Tây y ngoại trú có giới hạn phụ là 10% Hạn mức Ngoại trú cho mỗi lần khám.',
    memoryTip: 'Khám Tây y: Tối đa 10% hạn mức ngoại trú/lần khám.',
    sourceDocPage: 'Bảng 2 Mục B.1 - Điều trị Tây y'
  },
  {
    id: 'theory-33',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Y học Thay thế/Vật lý Trị liệu có giới hạn bao nhiêu % Hạn mức Ngoại trú mỗi lần khám?',
    options: [
      '1%',
      '2,5%',
      '5%',
      '10%'
    ],
    correctAnswer: 1, // 2,5%
    explanation: 'Y học Thay thế và Vật lý Trị liệu có giới hạn 2,5% Hạn mức Ngoại trú cho mỗi lần khám.',
    memoryTip: 'Y học thay thế/Vật lý trị liệu: 2,5% hạn mức ngoại trú/lần.',
    sourceDocPage: 'Bảng 2 Mục B.2 - Y học thay thế'
  },
  {
    id: 'theory-34',
    category: 'Ngoại trú',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Y học Thay thế/Vật lý Trị liệu được chi trả tối đa bao nhiêu lần khám trong một Năm Hợp Đồng?',
    options: [
      '2 lần',
      '4 lần',
      '8 lần',
      'Không giới hạn'
    ],
    correctAnswer: 1, // 4 lần
    explanation: 'Chi phí Y học Thay thế và Vật lý Trị liệu được chi trả tối đa 4 lần khám trong một Năm Hợp Đồng.',
    memoryTip: 'Y học thay thế: Tối đa 4 lần khám/năm hợp đồng.',
    sourceDocPage: 'Bảng 2 Mục B.2 - Y học thay thế'
  },
  {
    id: 'theory-35',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Điều kiện để lựa chọn Quyền lợi Nha khoa là gì?',
    options: [
      'Chỉ cần Nội trú',
      'Phải có Ngoại trú',
      'Phải có Thai sản',
      'Chỉ cần mua riêng Nha khoa'
    ],
    correctAnswer: 1, // Phải có Ngoại trú
    explanation: 'Khách hàng chỉ có thể lựa chọn Quyền lợi Nha khoa khi đồng thời tham gia Quyền lợi Ngoại trú.',
    memoryTip: 'Điều kiện Nha khoa: Bắt buộc phải có Ngoại trú đi kèm.',
    sourceDocPage: 'Điều 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-36',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Nha khoa có bao nhiêu lựa chọn Hạn mức Hàng năm theo % Hạn mức Nội trú?',
    options: [
      '1',
      '2',
      '3',
      '4'
    ],
    correctAnswer: 2, // 3
    explanation: 'Nha khoa có 3 lựa chọn hạn mức tính theo tỷ lệ Hạn mức Nội trú: 1%, 1,5% hoặc 2%.',
    memoryTip: 'Nha khoa có 3 mức: 1%, 1,5% và 2% của Hạn mức Nội trú.',
    sourceDocPage: 'Bảng 3 - Quyền lợi Nha khoa'
  },
  {
    id: 'theory-37',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Hạn mức Nha khoa tối đa là bao nhiêu?',
    options: [
      '10 triệu đồng',
      '20 triệu đồng',
      '30 triệu đồng',
      '50 triệu đồng'
    ],
    correctAnswer: 2, // 30 triệu đồng
    explanation: 'Hạn mức Hàng năm của Quyền lợi Nha khoa tối đa là 30 triệu đồng.',
    memoryTip: 'Trần Hạn mức Nha khoa: Tối đa 30 triệu đồng/năm.',
    sourceDocPage: 'Bảng 3 - Quyền lợi Nha khoa'
  },
  {
    id: 'theory-38',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Phạm vi địa lý của quyền lợi Nha khoa là gì?',
    options: [
      'Việt Nam',
      'Châu Á',
      'Toàn cầu',
      'Việt Nam và Châu Á'
    ],
    correctAnswer: 0, // Việt Nam
    explanation: 'Quyền lợi Nha khoa áp dụng Phạm vi Địa lý tại Việt Nam.',
    memoryTip: 'Phạm vi địa lý Nha khoa: Chỉ áp dụng tại Việt Nam.',
    sourceDocPage: 'Bảng 3 - Quyền lợi Nha khoa'
  },
  {
    id: 'theory-39',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Đồng chi trả của Nha khoa nếu có áp dụng là bao nhiêu và ở đâu?',
    options: [
      '10% tại mọi nơi',
      '20% tại Bệnh viện Tư/Phòng khám Tư',
      '20% tại bệnh viện công',
      '0% tại mọi nơi'
    ],
    correctAnswer: 1, // 20% tại Bệnh viện Tư/Phòng khám Tư
    explanation: 'Tỷ lệ Đồng Chi Trả của quyền lợi Nha khoa là 20% và chỉ áp dụng khi điều trị tại Bệnh Viện Tư hoặc Phòng Khám Tư.',
    memoryTip: 'Đồng chi trả Nha khoa: 20% tại cơ sở y tế tư nhân.',
    sourceDocPage: 'Bảng 3 & Điều 1.3 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-40',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Cạo vôi và đánh bóng răng được giới hạn tối đa bao nhiêu lần trong một Năm Hợp Đồng?',
    options: [
      '1 lần',
      '2 lần',
      '4 lần',
      '8 lần'
    ],
    correctAnswer: 1, // 2 lần
    explanation: 'Cạo vôi răng và đánh bóng răng được chi trả tối đa 2 lần trong một Năm Hợp Đồng.',
    memoryTip: 'Cạo vôi & đánh bóng răng: Tối đa 2 lần/năm.',
    sourceDocPage: 'Bảng 3 Mục C.1 - Cạo vôi và đánh bóng răng'
  },
  {
    id: 'theory-41',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Bọc răng hoặc cắm implant được giới hạn tối đa bao nhiêu răng trong một Năm Hợp Đồng?',
    options: [
      '1 răng',
      '2 răng',
      '4 răng',
      'Không giới hạn'
    ],
    correctAnswer: 1, // 2 răng
    explanation: 'Chi phí bọc răng hoặc cắm implant được giới hạn tối đa 2 răng trong một Năm Hợp Đồng.',
    memoryTip: 'Bọc răng/Implant: Tối đa 2 răng/năm.',
    sourceDocPage: 'Bảng 3 Mục C.2 - Bọc răng và Implant'
  },
  {
    id: 'theory-42',
    category: 'Nha khoa',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Nhổ răng bệnh lý có Phẫu thuật và không có Phẫu thuật được chi trả theo nguyên tắc nào?',
    options: [
      '10% Hạn mức/lần',
      '20% Hạn mức/lần',
      'Theo Chi phí Y tế thực tế trong giới hạn',
      'Không chi trả'
    ],
    correctAnswer: 2,
    explanation: 'Nhổ răng bệnh lý có phẫu thuật và không có phẫu thuật được chi trả theo Chi phí Y tế thực tế trong phạm vi Hạn mức Nha khoa.',
    memoryTip: 'Nhổ răng bệnh lý: Chi trả theo chi phí y tế thực tế.',
    sourceDocPage: 'Bảng 3 Mục C.3 - Nhổ răng bệnh lý'
  },
  {
    id: 'theory-43',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Điều kiện để lựa chọn Quyền lợi Thai sản là gì?',
    options: [
      'Chỉ cần Nội trú',
      'Phải có Ngoại trú',
      'Phải có Nha khoa',
      'Không cần quyền lợi nào khác'
    ],
    correctAnswer: 1, // Phải có Ngoại trú
    explanation: 'Khách hàng chỉ có thể lựa chọn Quyền lợi Thai sản khi đồng thời tham gia Quyền lợi Ngoại trú.',
    memoryTip: 'Điều kiện Thai sản: Bắt buộc phải có Ngoại trú đi kèm.',
    sourceDocPage: 'Điều 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-44',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Quyền lợi Thai sản được áp dụng cho Người Được Bảo Hiểm nữ trong độ tuổi nào?',
    options: [
      '18 đến 45 tuổi',
      '18 đến 50 tuổi',
      '20 đến 60 tuổi',
      '30 đến 70 tuổi'
    ],
    correctAnswer: 1, // 18 đến 50 tuổi
    explanation: 'Quyền lợi Thai sản áp dụng cho Người Được Bảo Hiểm là nữ trong độ tuổi từ 18 đến 50 tuổi (với điều kiện tuổi khi bắt đầu tham gia không quá 45 tuổi).',
    memoryTip: 'Độ tuổi hưởng quyền lợi Thai sản: Nữ từ 18 đến 50 tuổi.',
    sourceDocPage: 'Điều 6 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-45',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Tuổi của Người Được Bảo Hiểm khi tham gia Thai sản không được quá bao nhiêu tuổi?',
    options: [
      '40',
      '45',
      '50',
      '55'
    ],
    correctAnswer: 1, // 45
    explanation: 'Tại thời điểm bắt đầu tham gia Quyền lợi Thai sản, tuổi của Người Được Bảo Hiểm nữ không được vượt quá 45 tuổi.',
    memoryTip: 'Tuổi tối đa khi THAM GIA Thai sản: Không quá 45 tuổi.',
    sourceDocPage: 'Điều 6 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'theory-46',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Thai sản được chi trả tối đa bao nhiêu kỳ thai sản trong một Năm Hợp Đồng?',
    options: [
      '1 kỳ',
      '2 kỳ',
      '3 kỳ',
      'Không giới hạn'
    ],
    correctAnswer: 0, // 1 kỳ
    explanation: 'Quyền lợi Thai sản được áp dụng cho tối đa 1 kỳ thai sản trong mỗi Năm Hợp Đồng.',
    memoryTip: 'Kỳ thai sản tối đa: 1 kỳ/năm hợp đồng.',
    sourceDocPage: 'Bảng 4 - Quyền lợi Thai sản'
  },
  {
    id: 'theory-47',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Hạn mức Thai sản bằng bao nhiêu % Hạn mức Nội trú?',
    options: [
      '4%',
      '6%',
      '8%',
      '10%'
    ],
    correctAnswer: 2, // 8%
    explanation: 'Hạn mức Hàng năm của Quyền lợi Thai sản bằng 8% Hạn mức Hàng năm của Quyền lợi Nội trú (tối đa 200 triệu đồng).',
    memoryTip: 'Hạn mức Thai sản: Bằng 8% Hạn mức Nội trú.',
    sourceDocPage: 'Bảng 4 - Quyền lợi Thai sản'
  },
  {
    id: 'theory-48',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Hạn mức Thai sản tối đa là bao nhiêu?',
    options: [
      '100 triệu đồng',
      '150 triệu đồng',
      '200 triệu đồng',
      '300 triệu đồng'
    ],
    correctAnswer: 2, // 200 triệu đồng
    explanation: 'Hạn mức Hàng năm tối đa của Quyền lợi Thai sản là 200 triệu đồng.',
    memoryTip: 'Trần Hạn mức Thai sản: Tối đa 200 triệu đồng/năm.',
    sourceDocPage: 'Bảng 4 - Quyền lợi Thai sản'
  },
  {
    id: 'theory-49',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 20,
    question: 'Chi phí Sinh Thường được chi trả bằng bao nhiêu % Hạn mức Thai sản?',
    options: [
      '20%',
      '50%',
      '80%',
      '100%'
    ],
    correctAnswer: 1, // 50%
    explanation: 'Chi phí Sinh Thường được tính bằng 50% Hạn mức Hàng năm của Quyền lợi Thai sản.',
    memoryTip: 'Sinh thường = 50% Hạn mức Thai sản; Sinh mổ = 100% Hạn mức Thai sản.',
    sourceDocPage: 'Bảng 4 Mục D.1 - Sinh thường'
  },
  {
    id: 'theory-50',
    category: 'Thai sản',
    questionType: 'theory',
    timeLimit: 25,
    question: 'Thời gian chờ đối với Thai sản và Biến chứng Thai sản là bao lâu?',
    options: [
      '30 ngày',
      '60 ngày',
      '90 ngày',
      '270 ngày'
    ],
    correctAnswer: 3, // 270 ngày
    explanation: 'Thời gian chờ đối với Thai sản và Biến chứng Thai sản là 270 ngày kể từ ngày hiệu lực hợp đồng hoặc ngày khôi phục hiệu lực gần nhất.',
    memoryTip: 'Thời gian chờ Thai sản: 270 ngày (9 tháng 10 ngày).',
    sourceDocPage: 'Điều 1.8 - Thời Gian Chờ Quy tắc PRUKhỏe Linh Hoạt'
  }
];

// ============================================================================
// TOÀN BỘ KHO ĐỀ (QUESTION BANK)
// ============================================================================
export const QUESTION_BANK: Question[] = [
  ...THEORY_QUESTIONS,
  ...CALCULATION_SCENARIO_QUESTIONS,
];

// Fisher-Yates Shuffle utility
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * THUẬT TOÁN TẠO ĐỀ THI 20 CÂU CHUẨN MỰC:
 * 1. Đúng 20 câu hỏi cho mỗi lượt chơi.
 * 2. 12 câu đầu là LÝ THUYẾT (60%), theo sau là 8 câu THỰC HÀNH / TÌNH HUỐNG (40%).
 * 3. Mạch kiến thức liên kết logic, sư phạm:
 *    - Lý thuyết: Tổng quan -> Nội trú -> Ngoại trú -> Nha khoa -> Thai sản -> Quy tắc bảo lãnh 24/7
 *    - Thực hành: Tình huống Nội trú -> Ngoại trú -> Nha khoa -> Thai sản -> Tính toán tổng hợp đỉnh cao
 * 4. Tự động cân nhắc thời gian suy nghĩ tối ưu cho từng câu (15s-25s cho lý thuyết, 30s-45s cho tính toán, 60s cho tổng hợp).
 * 5. Đúng 4 câu Nhân Đôi Điểm (x2 Double Points) ngẫu nhiên:
 *    - KHÔNG nằm trong 4 câu đầu tiên (chỉ từ câu 5 trở đi: index >= 4).
 *    - KHÔNG nằm ở hai câu liên tiếp nhau (khoảng cách tối thiểu giữa 2 câu x2 >= 2).
 *    - Đặt ở các vị trí kịch tính để tăng tính hấp dẫn (giữa lý thuyết, cuối lý thuyết, giữa thực hành và câu tổng hợp về đích).
 */
export function generateGameQuestions(
  theoryPool: Question[] = THEORY_QUESTIONS,
  scenarioPool: Question[] = CALCULATION_SCENARIO_QUESTIONS
): Question[] {
  // 1. Phân nhóm kho Lý thuyết theo chủ đề
  const theoryByCat: Record<string, Question[]> = {
    'Tổng quan': shuffleArray(theoryPool.filter((q) => q.category === 'Tổng quan')),
    'Nội trú': shuffleArray(theoryPool.filter((q) => q.category === 'Nội trú')),
    'Ngoại trú': shuffleArray(theoryPool.filter((q) => q.category === 'Ngoại trú')),
    'Nha khoa': shuffleArray(theoryPool.filter((q) => q.category === 'Nha khoa')),
    'Thai sản': shuffleArray(theoryPool.filter((q) => q.category === 'Thai sản')),
  };

  // Chọn 12 câu lý thuyết mạch lạc theo tiến trình:
  // 2 Tổng quan -> 3 Nội trú -> 2 Ngoại trú -> 2 Nha khoa -> 2 Thai sản -> 1 Quy tắc/Thời gian chờ
  const selectedTheory: Question[] = [];
  selectedTheory.push(...theoryByCat['Tổng quan'].slice(0, 2));
  selectedTheory.push(...theoryByCat['Nội trú'].slice(0, 3));
  selectedTheory.push(...theoryByCat['Ngoại trú'].slice(0, 2));
  selectedTheory.push(...theoryByCat['Nha khoa'].slice(0, 2));
  selectedTheory.push(...theoryByCat['Thai sản'].slice(0, 2));

  // Lấy thêm 1 câu lý thuyết bổ sung để đủ 12 câu lý thuyết
  const selectedTheoryIds = new Set(selectedTheory.map((q) => q.id));
  const remainingTheory = shuffleArray(theoryPool.filter((q) => !selectedTheoryIds.has(q.id)));
  if (remainingTheory.length > 0 && selectedTheory.length < 12) {
    selectedTheory.push(...remainingTheory.slice(0, 12 - selectedTheory.length));
  }

  // 2. Phân nhóm kho Tình huống / Tính toán theo chủ đề
  const scenarioByCat: Record<string, Question[]> = {
    'Nội trú': shuffleArray(scenarioPool.filter((q) => q.category === 'Nội trú')),
    'Ngoại trú': shuffleArray(scenarioPool.filter((q) => q.category === 'Ngoại trú')),
    'Nha khoa': shuffleArray(scenarioPool.filter((q) => q.category === 'Nha khoa')),
    'Thai sản': shuffleArray(scenarioPool.filter((q) => q.category === 'Thai sản')),
    'Tổng hợp': shuffleArray(scenarioPool.filter((q) => q.category === 'Tổng hợp')),
  };

  // Chọn 8 câu tình huống mạch lạc từ đơn lẻ đến tổng hợp:
  // 2 Nội trú -> 2 Ngoại trú -> 1 Nha khoa -> 2 Thai sản -> 1 Tổng hợp (câu 20)
  const selectedScenario: Question[] = [];
  selectedScenario.push(...scenarioByCat['Nội trú'].slice(0, 2));
  selectedScenario.push(...scenarioByCat['Ngoại trú'].slice(0, 2));
  selectedScenario.push(...scenarioByCat['Nha khoa'].slice(0, 1));
  selectedScenario.push(...scenarioByCat['Thai sản'].slice(0, 2));

  // Lấy thêm câu tổng hợp đỉnh cao đặt ở cuối cùng
  if (scenarioByCat['Tổng hợp'].length > 0) {
    selectedScenario.push(...scenarioByCat['Tổng hợp'].slice(0, 1));
  } else {
    const selectedScenarioIds = new Set(selectedScenario.map((q) => q.id));
    const extraScenario = shuffleArray(scenarioPool.filter((q) => !selectedScenarioIds.has(q.id)));
    if (extraScenario.length > 0) {
      selectedScenario.push(extraScenario[0]);
    }
  }

  // Đảm bảo đủ đúng 8 câu tình huống
  const selectedScenarioIds = new Set(selectedScenario.map((q) => q.id));
  const remainingScenario = shuffleArray(scenarioPool.filter((q) => !selectedScenarioIds.has(q.id)));
  if (remainingScenario.length > 0 && selectedScenario.length < 8) {
    selectedScenario.push(...remainingScenario.slice(0, 8 - selectedScenario.length));
  }

  // 3. Ghép: 12 Lý thuyết ở đầu, theo sau là 8 Thực hành tình huống = Đúng 20 câu
  const fullQuestions: Question[] = [...selectedTheory, ...selectedScenario];

  // 4. Chọn đúng 4 câu x2 điểm:
  // - KHÔNG ở 4 câu đầu (index >= 4)
  // - KHÔNG liên tiếp nhau (|pos_i - pos_j| >= 2)
  // - Bố trí vào 4 chặng kịch tính (giữa lý thuyết, cuối lý thuyết, thực hành gay cấn, câu chung kết)
  const b1Options = [4, 5, 6]; // Câu 5 - 7
  const b1 = b1Options[Math.floor(Math.random() * b1Options.length)];

  const b2Options = [8, 9, 10, 11].filter((x) => x >= b1 + 2); // Câu 9 - 12
  const b2 = b2Options[Math.floor(Math.random() * b2Options.length)] || (b1 + 2);

  const b3Options = [13, 14, 15, 16].filter((x) => x >= b2 + 2); // Câu 14 - 17
  const b3 = b3Options[Math.floor(Math.random() * b3Options.length)] || (b2 + 2);

  const b4Options = [17, 18, 19].filter((x) => x >= b3 + 2); // Câu 18 - 20 (chặng nước rút về đích)
  const b4 = b4Options[Math.floor(Math.random() * b4Options.length)] || Math.min(19, b3 + 2);

  const doublePointIndices = new Set([b1, b2, b3, b4]);

  return fullQuestions.map((q, idx) => {
    let time = q.timeLimit;
    if (!time) {
      if (q.questionType === 'scenario') {
        time = q.category === 'Tổng hợp' ? 60 : 35;
      } else {
        time = q.options.some((o) => o.length > 50) ? 25 : 20;
      }
    }

    return {
      ...q,
      timeLimit: time,
      isDoublePoints: doublePointIndices.has(idx),
    };
  });
}
