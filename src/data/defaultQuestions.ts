import { Question } from '../types';

export const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 'pru-lh-01',
    category: 'Đối tượng & Độ tuổi',
    scenario: 'Khách hàng 68 tuổi muốn tham gia sản phẩm bảo hiểm sức khỏe PRUKhỏe Linh Hoạt để an tâm tuổi già.',
    question: 'Theo Quy tắc sản phẩm PRUKhỏe Linh Hoạt, độ tuổi tham gia của Người Được Bảo Hiểm và thời hạn bảo vệ tối đa là bao nhiêu?',
    options: [
      'Từ 30 ngày tuổi đến 65 tuổi, bảo vệ tối đa đến 75 tuổi.',
      'Từ 30 ngày tuổi đến 70 tuổi, bảo vệ tối đa đến khi Người Được Bảo Hiểm đạt 100 tuổi.',
      'Từ 0 ngày tuổi đến 60 tuổi, bảo vệ tối đa đến trọn đời không giới hạn số tuổi.',
      'Từ 1 tuổi đến 70 tuổi, bảo vệ tối đa đến 85 tuổi.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Độ tuổi tham gia tối đa lên đến 70 tuổi (không phải 65 tuổi) và thời hạn bảo vệ kéo dài đến 100 tuổi (không phải 75 tuổi).',
      'Phương án B ĐÚNG: Căn cứ Điều 6 & Điều 7, Người Được Bảo Hiểm từ 30 ngày tuổi đến 70 tuổi vào thời điểm tham gia, và hợp đồng được tái tục hàng năm tối đa đến Ngày kỷ niệm năm hợp đồng ngay sau sinh nhật lần thứ 100.',
      'Phương án C SAI: Độ tuổi bắt đầu tham gia là từ 30 ngày tuổi (không phải 0 ngày tuổi), và thời hạn tối đa là 100 tuổi (có mốc kết thúc xác định, không phải không giới hạn).',
      'Phương án D SAI: Trẻ nhỏ từ 30 ngày tuổi đã đủ điều kiện tham gia (không cần đợi đến 1 tuổi) và thời hạn bảo vệ kéo dài đến 100 tuổi.'
    ],
    explanation: 'PRUKhỏe Linh Hoạt mở rộng biên độ bảo vệ vượt trội: độ tuổi tiếp nhận tham gia rộng từ 30 ngày tuổi đến 70 tuổi, và đồng hành chăm sóc sức khỏe khách hàng đến tận 100 tuổi.',
    extraKnowledge: 'Thời hạn bảo hiểm là 1 năm và được tự động tái tục hàng năm tại mỗi Ngày kỷ niệm Năm hợp đồng cho đến 100 tuổi, trừ trường hợp khách hàng hoặc Prudential từ chối tái tục theo quy định.',
    memoryTip: 'Khẩu quyết: "Vào từ 30 ngày - Đến 70 tuổi - Chăm sóc trọn vẹn tới 100 tuổi"',
    sourceDocPage: 'Trang 28 - Điều 6 & Điều 7 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-02',
    category: 'Đồng Chi Trả & Cơ chế',
    scenario: 'Khách hàng thắc mắc tại sao khi điều trị tại Bệnh viện Chợ Rẫy (Bệnh viện công) lại không bị áp dụng tỷ lệ Đồng Chi Trả 20%.',
    question: 'Tỷ lệ Đồng Chi Trả (Co-payment) trong sản phẩm PRUKhỏe Linh Hoạt được áp dụng tại những cơ sở y tế nào?',
    options: [
      'Áp dụng tại tất cả các Bệnh viện và Phòng khám bao gồm cả Bệnh viện Công lập và Bệnh viện Tư nhân.',
      'Chỉ áp dụng khi Người Được Bảo Hiểm điều trị tại Bệnh Viện Tư hoặc Phòng Khám Tư; tại Bệnh Viện Công Prudential chi trả 100% chi phí y tế hợp lý.',
      'Chỉ áp dụng khi khách hàng khám ngoại trú tại Bệnh viện Công lập.',
      'Chỉ áp dụng khi phẫu thuật thẩm mỹ hoặc điều trị nha khoa tại nước ngoài.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Quy tắc ghi rõ Đồng Chi Trả không áp dụng cho Bệnh viện Công.',
      'Phương án B ĐÚNG: Căn cứ Khoản 31 (Trang 7) và Điều 1.3 (Trang 13-14), Đồng Chi Trả (nếu có) CHỈ áp dụng khi Người Được Bảo Hiểm điều trị tại Bệnh Viện Tư hoặc Phòng Khám Tư.',
      'Phương án C SAI: Tại Bệnh viện Công lập, khách hàng không bị áp dụng cơ chế đồng chi trả.',
      'Phương án D SAI: Phẫu thuật thẩm mỹ thuộc danh mục loại trừ bảo hiểm, không liên quan đến phạm vi áp dụng cơ chế đồng chi trả.'
    ],
    explanation: 'Quy tắc sản phẩm nêu rõ: Đồng Chi Trả chỉ áp dụng khi Người Được Bảo Hiểm khám và điều trị tại Bệnh Viện Tư hoặc Phòng Khám Tư. Khi nằm viện điều trị tại Bệnh Viện Công, Prudential chi trả 100% Chi Phí Y Tế thuộc phạm vi bảo hiểm mà không khấu trừ tỷ lệ Đồng Chi Trả.',
    extraKnowledge: 'Đây là lợi điểm bán hàng rất mạnh: Khách hàng chọn gói Đồng Chi Trả 20% sẽ được mức phí tiết kiệm đáng kể, nhưng khi vào Bệnh viện Công lớn (Bạch Mai, Chợ Rẫy, Việt Đức...) vẫn được thanh toán trọn vẹn 100% hạn mức.',
    memoryTip: 'Khẩu quyết: "Viện Tư chia sẻ 20% - Viện Công Prudential trả trọn 100%"',
    sourceDocPage: 'Trang 13-14 - Điều 1.3 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-03',
    category: 'Đồng Chi Trả & Độ tuổi',
    scenario: 'Đại lý tư vấn cho gia đình gồm bé 4 tuổi, bố mẹ 35 tuổi và ông nội 78 tuổi.',
    question: 'Theo quy định về Quyền Lợi Nội Trú của PRUKhỏe Linh Hoạt, nhóm độ tuổi nào BẮT BUỘC áp dụng tỷ lệ Đồng Chi Trả 20% tại Bệnh Viện Tư/Phòng Khám Tư?',
    options: [
      'Người từ 18 tuổi đến 60 tuổi.',
      'Trẻ em từ 30 ngày tuổi đến dưới 6 tuổi VÀ người cao tuổi từ 76 tuổi đến 100 tuổi.',
      'Tất cả khách hàng từ 6 tuổi đến 75 tuổi.',
      'Không có độ tuổi nào bắt buộc, mọi độ tuổi đều được tự do chọn 0% đồng chi trả.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Độ tuổi 18 đến 60 tuổi nằm trong nhóm 6 đến 75 tuổi, được quyền linh hoạt chọn 0% hoặc 20%.',
      'Phương án B ĐÚNG: Căn cứ Bảng tại Điều 1.3 (Trang 14), Người Được Bảo Hiểm từ 30 ngày tuổi đến dưới 6 tuổi và từ 76 tuổi đến 100 tuổi cố định tỷ lệ Đồng Chi Trả là 20% (Prudential chi trả 80%).',
      'Phương án C SAI: Nhóm từ 6 tuổi đến 75 tuổi được trao quyền lựa chọn giữa 20% hoặc 0% tùy theo khả năng tài chính và nhu cầu.',
      'Phương án D SAI: Điều khoản quy định rõ 2 nhóm tuổi nhạy cảm (dưới 6 tuổi và trên 75 tuổi) bắt buộc áp dụng tỷ lệ đồng chi trả 20%.'
    ],
    explanation: 'Bảng tỷ lệ Đồng Chi Trả phân chia rõ ràng: Trẻ em (30 ngày tuổi - dưới 6 tuổi) và Người cao tuổi (76 - 100 tuổi) áp dụng tỷ lệ Đồng Chi Trả 20% của Khách hàng / 80% của Prudential. Nhóm từ 6 - 75 tuổi được tùy chọn 0% hoặc 20%.',
    extraKnowledge: 'Đối với các Quyền Lợi Tùy Chọn (Ngoại trú, Nha khoa, Thai sản), tỷ lệ Đồng Chi Trả cố định là 20% áp dụng cho toàn bộ độ tuổi từ 30 ngày đến 100 tuổi tại Viện Tư/Phòng khám Tư.',
    memoryTip: 'Khẩu quyết: "Dưới 6 tuổi và trên 75 - Đồng chi trả 20% tại viện tư"',
    sourceDocPage: 'Trang 14 - Bảng tỷ lệ Đồng Chi Trả Điều 1.3'
  },
  {
    id: 'pru-lh-04',
    category: 'Đồng Chi Trả & Thay đổi',
    scenario: 'Khách hàng 32 tuổi đang tham gia gói có Đồng Chi Trả 20% và năm sau muốn đổi sang gói 0% Đồng Chi Trả để được thanh toán toàn bộ tại viện tư.',
    question: 'Khách hàng trong độ tuổi từ 6 đến 75 tuổi được phép thay đổi tỷ lệ Đồng Chi Trả của Quyền Lợi Nội Trú bao nhiêu lần trong suốt thời hạn bảo hiểm?',
    options: [
      'Được thay đổi không giới hạn số lần vào mỗi kỳ đóng phí hàng quý.',
      'Được thay đổi tối đa 1 (một) lần duy nhất trong suốt thời hạn Bảo Hiểm có hiệu lực.',
      'Được thay đổi mỗi năm một lần vào ngày sinh nhật của khách hàng.',
      'Hoàn toàn không được phép thay đổi sau khi hợp đồng đã phát hành.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Không được thay đổi tùy tiện theo quý; quy tắc giới hạn nghiêm ngặt để đảm bảo quỹ bảo hiểm ổn định.',
      'Phương án B ĐÚNG: Căn cứ Điều 1.9.2 (Trang 21), đối với Người Được Bảo Hiểm từ 6 đến 75 tuổi, Bên Mua Bảo Hiểm có quyền thay đổi Tỷ Lệ Đồng Chi Trả của Quyền Lợi Nội Trú 1 (một) lần duy nhất trong suốt thời hạn Bảo Hiểm có hiệu lực.',
      'Phương án C SAI: Chỉ được đổi duy nhất 1 lần trong cả đời hợp đồng, không phải mỗi năm một lần.',
      'Phương án D SAI: Khách hàng vẫn có quyền thay đổi 1 lần nếu gửi văn bản yêu cầu trước 30 ngày trước Ngày kỷ niệm năm hợp đồng.'
    ],
    explanation: 'Điều 1.9.2 quy định rõ: Bên Mua Bảo Hiểm có quyền thay đổi Tỷ Lệ Đồng Chi Trả của Quyền Lợi Nội Trú 1 (một) lần duy nhất trong suốt thời hạn bảo hiểm bằng cách gửi văn bản cho Prudential trong vòng 30 ngày trước Ngày Kỷ Niệm Năm Hợp Đồng.',
    extraKnowledge: 'Khi đổi từ 20% xuống 0% Đồng Chi Trả, phần chênh lệch tăng thêm quyền lợi sẽ phải áp dụng lại Thời Gian Chờ từ đầu theo quy định tại Điều 1.8.',
    memoryTip: 'Khẩu quyết: "Đổi tỷ lệ đồng chi trả: 1 LẦN DUY NHẤT - Báo trước 30 ngày"',
    sourceDocPage: 'Trang 21 - Điều 1.9.2 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-05',
    category: 'Nhân Đôi Hạn Mức',
    scenario: 'Khách hàng tham gia gói Nội Trú hạn mức 500 triệu đồng đã chi trả hết 500 triệu trong năm cho một ca phẫu thuật, sau đó tiếp tục phải nằm viện điều trị tại Bệnh viện K (Bệnh viện công).',
    question: 'Điều kiện nào để Quyền Lợi Nhân Đôi Hạn Mức (thêm tối đa 100% hạn mức) của PRUKhỏe Linh Hoạt tự động được kích hoạt?',
    options: [
      'Khách hàng phải đóng thêm 50% phí bảo hiểm bổ sung ngay tại thời điểm yêu cầu.',
      'Hạn Mức Hàng Năm ban đầu đã chi trả hết VÀ Người Được Bảo Hiểm nằm viện để Điều Trị Nội Trú tại Bệnh Viện Công.',
      'Khách hàng phải nằm viện điều trị tại các Bệnh viện Quốc tế cao cấp ở nước ngoài.',
      'Quyền lợi này áp dụng cho mọi đợt khám ngoại trú sau khi hết hạn mức.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Quyền lợi được kích hoạt tự động mà KHÔNG làm tăng phí bảo hiểm của hợp đồng.',
      'Phương án B ĐÚNG: Căn cứ Mục (*) Bảng 1 (Trang 17), khi Hạn Mức Hàng Năm của Quyền Lợi Nội Trú đã được chi trả hết, khách hàng được hưởng thêm tối đa 100% Hạn Mức với điều kiện nằm viện Điều Trị Nội Trú tại Bệnh Viện Công.',
      'Phương án C SAI: Quyền lợi nhân đôi hạn mức chỉ áp dụng khi điều trị nội trú tại Bệnh Viện Công ở Việt Nam, không áp dụng cho viện tư hay quốc tế.',
      'Phương án D SAI: Quyền lợi nhân đôi hạn mức chỉ dành riêng cho Điều Trị Nội Trú, không áp dụng cho Ngoại Trú.'
    ],
    explanation: 'Quyền Lợi Nhân Đôi Hạn Mức là điểm ưu việt vượt trội của PRUKhỏe Linh Hoạt: Tự động kích hoạt khi hạn mức ban đầu chi trả hết, cộng thêm tối đa 100% Hạn Mức Hàng Năm cho 1 Đợt Nằm Viện tiếp theo tại Bệnh Viện Công mà không tính thêm bất kỳ khoản phí nào!',
    extraKnowledge: 'Các giới hạn phụ (tiền phòng, ICU...) sẽ được làm mới và áp dụng lại từ đầu cho Đợt Nằm Viện được hưởng quyền lợi nhân đôi này.',
    memoryTip: 'Khẩu quyết: "Hết hạn mức ban đầu - Vào Viện Công nằm viện - Nhân đôi 100% không tăng phí"',
    sourceDocPage: 'Trang 14 & 17 - Quyền Lợi Nhân Đôi Hạn Mức Điều 1.4'
  },
  {
    id: 'pru-lh-06',
    category: 'Hạn Mức & Địa Lý',
    scenario: 'Tư vấn viên cần thiết kế giải pháp bảo lãnh viện phí khám chữa bệnh trên toàn khu vực Châu Á cho một doanh nhân thường xuyên công tác.',
    question: 'Theo Bảng 1 Quyền Lợi Nội Trú, các mức Hạn Mức Hàng Năm nào có Phạm Vi Địa Lý áp dụng tại khu vực Châu Á?',
    options: [
      '100 triệu đồng, 200 triệu đồng, 300 triệu đồng, 500 triệu đồng.',
      '600 triệu đồng, 800 triệu đồng, 1 tỷ đồng, 2 tỷ đồng.',
      '3 tỷ đồng và 5 tỷ đồng.',
      'Tất cả các hạn mức từ 100 triệu trở lên đều được áp dụng trên toàn thế giới.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Các hạn mức 100tr, 200tr, 300tr, 500tr có phạm vi địa lý chỉ tại Việt Nam.',
      'Phương án B ĐÚNG: Căn cứ Bảng 1 (Trang 14), các Hạn Mức 600 triệu, 800 triệu, 1 tỷ và 2 tỷ đồng có Phạm Vi Địa Lý áp dụng tại Châu Á.',
      'Phương án C SAI: Hạn mức 3 tỷ và 5 tỷ đồng có Phạm Vi Địa Lý là Toàn Cầu.',
      'Phương án D SAI: Phạm vi địa lý phân tầng rõ rệt theo từng nhóm hạn mức: Việt Nam - Châu Á - Toàn Cầu.'
    ],
    explanation: 'PRUKhỏe Linh Hoạt phân định rõ 3 bậc phạm vi địa lý: (1) Hạn mức 100tr - 500tr: Việt Nam; (2) Hạn mức 600tr - 2 tỷ: Châu Á; (3) Hạn mức 3 tỷ - 5 tỷ: Toàn Cầu.',
    extraKnowledge: 'Lưu ý: Các quyền lợi tùy chọn (Ngoại trú, Nha khoa, Thai sản) luôn chỉ áp dụng trong Phạm Vi Địa Lý ở Việt Nam.',
    memoryTip: 'Bảng phân tầng: "100-500tr: Việt Nam | 600tr-2 tỷ: Châu Á | 3-5 tỷ: Toàn Cầu"',
    sourceDocPage: 'Trang 14 - Bảng 1 Quyền Lợi Nội Trú'
  },
  {
    id: 'pru-lh-07',
    category: 'Phạm Vi Địa Lý Châu Á',
    scenario: 'Khách hàng tham gia gói hạn mức 1 tỷ đồng (phạm vi Châu Á) chuẩn bị sang Đài Loan điều trị bệnh.',
    question: 'Theo Khoản 39 Điều khoản PRUKhỏe Linh Hoạt, phạm vi Châu Á bao gồm chính xác những quốc gia/vùng lãnh thổ nào?',
    options: [
      'Tất cả hơn 50 quốc gia trên toàn lục địa Châu Á kể cả Trung Đông và Nga.',
      'Bao gồm 14 quốc gia/vùng lãnh thổ: Brunei, Cam-pu-chia, Trung Quốc, Đài Loan, Indonesia, Nhật Bản, Lào, Malaysia, Myanmar, Philippines, Singapore, Hàn Quốc, Thái Lan, Việt Nam.',
      'Chỉ bao gồm 3 nước Đông Dương: Việt Nam, Lào, Cam-pu-chia.',
      'Bao gồm các nước Châu Á nhưng loại trừ Singapore và Nhật Bản.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Định nghĩa loại trừ các vùng cấm vận và quy định danh sách đóng gồm đúng 14 quốc gia/vùng lãnh thổ y tế phát triển trong khu vực.',
      'Phương án B ĐÚNG: Căn cứ Khoản 39 (Trang 8-9), phạm vi Châu Á quy định rõ danh sách 14 quốc gia và vùng lãnh thổ được bảo lãnh chi trả.',
      'Phương án C SAI: Quá hẹp, phạm vi bao gồm cả các trung tâm y tế hàng đầu như Singapore, Nhật Bản, Hàn Quốc, Đài Loan...',
      'Phương án D SAI: Singapore và Nhật Bản là hai điểm đến y tế trọng điểm hoàn toàn nằm trong danh mục bảo hiểm.'
    ],
    explanation: 'Định nghĩa tại Điều khoản quy định cụ thể danh sách 14 quốc gia/vùng lãnh thổ thuộc phạm vi Châu Á nhằm giúp khách hàng tiếp cận nền y tế tiên tiến hàng đầu trong khu vực mà không lo rào cản chi phí.',
    extraKnowledge: 'Không áp dụng bảo hiểm tại các quốc gia thuộc danh sách cấm vận của LHQ, OFAC Mỹ, OFSI Anh, HKMA hoặc Bộ Ngoại giao Việt Nam.',
    memoryTip: 'Châu Á PRU: "14 quốc gia/vùng lãnh thổ Đông Nam Á + Đông Á tiên tiến"',
    sourceDocPage: 'Trang 8-9 - Định nghĩa 39 Phạm Vi Địa Lý'
  },
  {
    id: 'pru-lh-08',
    category: 'Nội Trú Không Phẫu Thuật',
    scenario: 'Khách hàng tham gia gói Nội Trú hạn mức 300 triệu đồng, nhập viện điều trị viêm phổi nặng 10 ngày nhưng không cần phẫu thuật.',
    question: 'Giới hạn chi trả tối đa cho một Đợt Nằm Viện KHÔNG có phẫu thuật là bao nhiêu % Hạn Mức Hàng Năm?',
    options: [
      'Tối đa 20% Hạn Mức Hàng Năm.',
      'Tối đa 50% Hạn Mức Hàng Năm của Quyền Lợi Nội Trú.',
      'Chi trả 100% không giới hạn cho một đợt nằm viện.',
      'Tối đa 10 triệu đồng cho mỗi đợt nằm viện không phẫu thuật.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Mức 20% là quá thấp và không đúng với bảng giới hạn phụ.',
      'Phương án B ĐÚNG: Căn cứ Bảng 1 Mục A.1 (Trang 15), Giới hạn phụ một đợt nằm viện không có Phẫu Thuật là 50% Hạn Mức Hàng Năm (đối với gói 300 triệu thì tối đa là 150 triệu/đợt). Nếu có phẫu thuật thì chi trả theo Chi Phí Y Tế thực tế.',
      'Phương án C SAI: Nằm viện không phẫu thuật có mức khống chế trần 50% hạn mức/đợt để đảm bảo cân đối quỹ điều trị cho cả năm.',
      'Phương án D SAI: Không có mức cố định 10 triệu; con số tính bằng tỷ lệ % hạn mức hàng năm.'
    ],
    explanation: 'Theo Bảng 1 Mục A.1: Một đợt nằm viện ĐIỀU TRỊ NỘI TRÚ KHÔNG CÓ PHẪU THUẬT có giới hạn phụ là 50% Hạn Mức Hàng Năm. Trường hợp NẰM VIỆN CÓ PHẪU THUẬT sẽ được thanh toán theo Chi Phí Y Tế thực tế (tối đa bằng Hạn Mức Hàng Năm).',
    extraKnowledge: 'Với khách hàng có gói 500 triệu, một ca sốt xuất huyết hay viêm phổi nằm viện nội khoa không mổ có thể được chi trả lên tới 250 triệu đồng/đợt.',
    memoryTip: 'Khẩu quyết: "Không mổ: tối đa 50% hạn mức/đợt | Có mổ: theo chi phí thực tế"',
    sourceDocPage: 'Trang 15 - Bảng 1 Mục A.1 Nằm Viện Điều Trị Nội Trú'
  },
  {
    id: 'pru-lh-09',
    category: 'Giường & Phòng Tiêu Chuẩn',
    scenario: 'Khách hàng có gói hạn mức 500 triệu đồng nằm viện tại Bệnh viện FV hoặc Vinmec.',
    question: 'Chi phí Giường Và Phòng trong Quyền Lợi Nội Trú được chi trả theo tỷ lệ bao nhiêu và số ngày tối đa trong một Năm Hợp Đồng là bao nhiêu?',
    options: [
      '1%/ngày, tối đa 60 ngày/Năm Hợp Đồng.',
      '0,6%/ngày của Hạn Mức Hàng Năm, tối đa 100 ngày/Năm Hợp Đồng.',
      '0,2%/ngày, tối đa 365 ngày/Năm Hợp Đồng.',
      'Thanh toán toàn bộ hóa đơn tiền phòng tổng thống không giới hạn số ngày.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Giới hạn phòng là 0,6%/ngày và số ngày tối đa lên đến 100 ngày (không phải 60 ngày).',
      'Phương án B ĐÚNG: Căn cứ Mục A.3.1 Bảng 1 (Trang 15), Chi Phí Giường Và Phòng chi trả 0,6%/ngày, tối đa 100 ngày/Năm Hợp Đồng. (Ví dụ gói 500 triệu = 3 triệu đồng/ngày phòng đơn).',
      'Phương án C SAI: Tỷ lệ 0,2% không khớp quy tắc và số ngày tối đa là 100 ngày.',
      'Phương án D SAI: Điều khoản loại trừ phòng VIP, phòng bao hoặc các phòng vượt chuẩn.'
    ],
    explanation: 'Giới hạn chi phí Giường và Phòng là 0,6%/ngày của Hạn Mức Hàng Năm, tối đa 100 ngày/năm hợp đồng. Ví dụ: Gói 300 triệu hỗ trợ 1,8 triệu/ngày; Gói 500 triệu hỗ trợ 3 triệu/ngày; Gói 1 tỷ hỗ trợ 6 triệu/ngày.',
    extraKnowledge: 'Đối với điều trị tại Bệnh Viện Tư, Prudential thanh toán theo chi phí của phòng đơn tiêu chuẩn có giá thấp nhất tại Bệnh Viện đó (đã bao gồm suất ăn bệnh lý), loại trừ phòng VIP hay phòng bao.',
    memoryTip: 'Công thức vàng tiền phòng: "0,6% Hạn mức/ngày - Tối đa 100 ngày/năm"',
    sourceDocPage: 'Trang 6 (Khoản 15) & Trang 15 (Mục A.3.1) Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-10',
    category: 'Phụ Cấp Viện Công',
    scenario: 'Khách hàng tham gia gói 500 triệu đồng nằm viện điều trị tại Bệnh viện Bạch Mai 6 ngày liên tục.',
    question: 'Điều kiện và mức chi trả của quyền lợi "Phụ Cấp Nằm Viện Tại Bệnh Viện Công" được quy định như thế nào?',
    options: [
      'Chi trả từ ngày nằm viện đầu tiên, tối đa 10 triệu đồng mỗi ngày.',
      'Chi trả 0,1%/ngày, áp dụng khi nằm viện từ 3 ngày trở lên; tối đa 2 triệu đồng/ngày, 5 ngày/Đợt Nằm Viện và 30 ngày/Năm Hợp Đồng.',
      'Chỉ áp dụng cho người trên 65 tuổi nằm viện vào các ngày lễ Tết.',
      'Chi trả 1 triệu đồng/ngày cho tất cả các đợt nằm viện kéo dài trên 30 ngày.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Phải nằm viện từ 3 ngày trở lên và mức tối đa là 2 triệu đồng/ngày (không phải 10 triệu).',
      'Phương án B ĐÚNG: Căn cứ Mục A.3.2 Bảng 1 (Trang 15) và Định nghĩa 47 (Trang 9), chi trả 0,1%/ngày khi nằm viện tại BV Công từ 3 ngày trở lên, tối đa 2 triệu đồng/ngày, 5 ngày/đợt và 30 ngày/năm.',
      'Phương án C SAI: Áp dụng cho mọi độ tuổi được bảo hiểm khi nằm viện công, không phân biệt lễ Tết.',
      'Phương án D SAI: Điều kiện là nằm viện từ 3 ngày trở lên, giới hạn tối đa 5 ngày cho 1 đợt.'
    ],
    explanation: 'Phụ cấp nằm viện Bệnh viện Công là món quà động viên thiết thực: 0,1% hạn mức/ngày (với gói 500tr là 500.000đ/ngày, gói 2 tỷ là tối đa trần 2 triệu/ngày) khi nằm viện từ 3 ngày trở lên, tối đa 5 ngày/đợt và 30 ngày/năm.',
    extraKnowledge: 'Số tiền phụ cấp này được cộng dồn vào quyền lợi bồi thường nhưng tổng số tiền tiền phòng + phụ cấp không vượt quá giới hạn phụ chi phí Giường và Phòng.',
    memoryTip: 'Quy tắc 3-5-30: "Từ 3 ngày viện công - Tối đa 5 ngày/đợt - 30 ngày/năm"',
    sourceDocPage: 'Trang 9 (Khoản 47) & Trang 15 (Mục A.3.2) Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-11',
    category: 'Phòng Chăm Sóc Đặc Biệt',
    scenario: 'Khách hàng bị suy hô hấp nặng phải nằm điều trị tại khoa ICU (Hồi sức tích cực).',
    question: 'Chi phí nằm tại Phòng Chăm Sóc Đặc Biệt (ICU) được PRUKhỏe Linh Hoạt chi trả như thế nào?',
    options: [
      'Chi trả theo mức cố định 1 triệu đồng/ngày, tối đa 10 ngày.',
      'Chi trả theo Chi Phí Y Tế thực tế, tối đa 30 ngày/Năm Hợp Đồng.',
      'Khách hàng phải tự chi trả toàn bộ vì ICU không thuộc phạm vi bảo hiểm.',
      'Chi trả 50% hóa đơn viện phí ICU trong suốt đời hợp đồng.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Chi phí phòng ICU rất đắt đỏ nên Prudential chi trả theo thực tế, không khoán mức 1 triệu.',
      'Phương án B ĐÚNG: Căn cứ Mục A.3.3 Bảng 1 (Trang 15), Phòng Chăm Sóc Đặc Biệt (ICU) được chi trả theo Chi Phí Y Tế thực tế, tối đa lên tới 30 ngày trong một Năm Hợp Đồng.',
      'Phương án C SAI: ICU là quyền lợi cốt lõi được bảo hiểm đầy đủ trong sản phẩm.',
      'Phương án D SAI: Chi trả theo chi phí thực tế (hoặc trừ đồng chi trả tại viện tư nếu có), số ngày tối đa 30 ngày/năm.'
    ],
    explanation: 'Tại khoa Hồi sức tích cực (ICU), chi phí mỗi ngày rất lớn do máy thở và theo dõi sinh tồn 24/7. PRUKhỏe Linh Hoạt hỗ trợ tối đa khi chi trả theo Chi Phí Y Tế thực tế lên đến 30 ngày/năm.',
    extraKnowledge: 'Định nghĩa ICU (Khoản 42): Khoa/bộ phận cung cấp điều trị tích cực liên tục 24/7 trang bị đầy đủ máy móc cấp cứu (không phải phòng hậu phẫu hay phòng cấp cứu thông thường).',
    memoryTip: 'Khẩu quyết: "Nằm ICU: Trả theo thực tế - Tối đa 30 ngày/năm"',
    sourceDocPage: 'Trang 9 (Khoản 42) & Trang 15 (Mục A.3.3) Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-12',
    category: 'Kính Đa Tiêu Cự',
    scenario: 'Khách hàng lớn tuổi muốn phẫu thuật thay thủy tinh thể bằng Kính Nội Nhãn Đa Tiêu Cự.',
    question: 'Quyền lợi phẫu thuật thay Kính Nội Nhãn Đa Tiêu Cự được áp dụng cho chương trình nào và hạn mức chi trả là bao nhiêu?',
    options: [
      'Áp dụng cho tất cả các chương trình từ 100 triệu trở lên, tối đa 50 triệu đồng.',
      'Chỉ áp dụng cho Chương trình Toàn Cầu (hạn mức 3 tỷ và 5 tỷ), chi trả theo thực tế tối đa 20 triệu đồng / 2 mắt trọn đời.',
      'Chỉ áp dụng cho Chương trình Việt Nam với hạn mức 10 triệu đồng mỗi năm.',
      'Không chương trình nào chi trả vì kính nội nhãn luôn bị loại trừ tuyệt đối.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Chương trình Việt Nam và Châu Á ghi rõ "Không áp dụng".',
      'Phương án B ĐÚNG: Căn cứ Mục B.5 Bảng 1 (Trang 16-17), Kính Nội Nhãn Đa Tiêu Cự chỉ áp dụng cho phạm vi Toàn Cầu, chi trả theo chi phí thực tế, tối đa 20 triệu đồng cho 2 mắt trọn đời.',
      'Phương án C SAI: Chương trình Việt Nam không áp dụng quyền lợi kính đa tiêu cự.',
      'Phương án D SAI: Kính đơn tiêu cự thông thường nằm trong chi phí phẫu thuật chung; riêng Kính đa tiêu cự cao cấp được bảo hiểm ở gói Toàn Cầu.'
    ],
    explanation: 'Theo Bảng 1 Mục B.5: Quyền lợi Kính Nội Nhãn Đa Tiêu Cự không áp dụng ở gói Việt Nam và Châu Á; chỉ áp dụng đặc quyền cho gói Toàn Cầu (3 tỷ và 5 tỷ đồng) với mức hỗ trợ tối đa 20 triệu đồng/2 mắt trọn đời.',
    extraKnowledge: 'Đối với kính nội nhãn đơn tiêu cự cần thiết y khoa thì ở tất cả các gói đều đã được chi trả trong chi phí vật tư phẫu thuật.',
    memoryTip: 'Đặc quyền gói Toàn Cầu: "Kính đa tiêu cự tối đa 20 triệu/2 mắt trọn đời"',
    sourceDocPage: 'Trang 16-17 - Mục B.5 Bảng 1 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-13',
    category: 'Chăm Sóc Y Tế Tại Nhà',
    scenario: 'Bệnh nhân sau ca đại phẫu xuất viện về nhà cần nhân viên điều dưỡng đến thay băng, rửa vết thương và chăm sóc y tế.',
    question: 'Quyền lợi "Dịch Vụ Chăm Sóc Y Tế Tại Nhà" trong PRUKhỏe Linh Hoạt có điều kiện thời gian và giới hạn chi trả như thế nào?',
    options: [
      'Phát sinh bất cứ lúc nào khách hàng mệt mỏi, tối đa 100 ngày mỗi năm.',
      'Phát sinh trong vòng 60 ngày sau khi xuất viện, chi trả 0,1%/ngày của Hạn Mức Hàng Năm, tối đa 15 ngày/Năm Hợp Đồng.',
      'Chỉ chi trả khi thuê người giúp việc hoặc đi spa nghỉ dưỡng.',
      'Phát sinh trong 7 ngày đầu tiên sau mổ, chi trả 5% hạn mức mỗi ngày.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Phải có chỉ định y tế sau khi xuất viện và giới hạn tối đa là 15 ngày/năm (không phải 100 ngày).',
      'Phương án B ĐÚNG: Căn cứ Mục A.3.7 Bảng 1 (Trang 16) và Định nghĩa 21 (Trang 6), Dịch vụ chăm sóc tại nhà phải phát sinh trong vòng 60 ngày sau khi xuất viện, chi trả 0,1%/ngày, tối đa 15 ngày/Năm Hợp Đồng.',
      'Phương án C SAI: Định nghĩa loại trừ rõ ràng các biện pháp thiên nhiên, spa, an dưỡng.',
      'Phương án D SAI: Tỷ lệ là 0,1%/ngày (không phải 5%) và áp dụng trong 60 ngày sau xuất viện.'
    ],
    explanation: 'Chăm sóc y tế tại nhà do Bác sĩ hoặc Điều dưỡng được cấp phép thực hiện tại nơi ở của khách hàng trong vòng 60 ngày sau khi xuất viện, chi trả 0,1% hạn mức/ngày (gói 1 tỷ = 1 triệu/ngày), tối đa 15 ngày/năm.',
    extraKnowledge: 'Dịch vụ này giúp bệnh nhân yên tâm tĩnh dưỡng tại nhà mà vết mổ, đường truyền vẫn được chăm sóc y tế chuyên nghiệp.',
    memoryTip: 'Chăm sóc tại nhà: "Trong 60 ngày sau xuất viện - Tối đa 15 ngày/năm (0,1%/ngày)"',
    sourceDocPage: 'Trang 6 (Khoản 21) & Trang 16 (Mục A.3.7) Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-14',
    category: 'Trước & Sau Nhập Viện',
    scenario: 'Bệnh nhân có đợt nằm viện phẫu thuật từ ngày 15/10 và xuất viện ngày 20/10. Trước đó bệnh nhân có đi chụp MRI, xét nghiệm và sau khi xuất viện có đi tái khám lấy thuốc.',
    question: 'Khung thời gian được bảo hiểm chi trả cho chi phí "Điều Trị Trước Khi Nhập Viện" và "Điều Trị Sau Khi Xuất Viện" là bao nhiêu ngày?',
    options: [
      'Trước khi nhập viện trong vòng 10 ngày và sau khi xuất viện trong vòng 15 ngày.',
      'Trước khi nhập viện trong vòng 30 ngày VÀ sau khi xuất viện trong vòng 60 ngày.',
      'Trước khi nhập viện 60 ngày và sau khi xuất viện 30 ngày.',
      'Chỉ chi trả đúng các chi phí phát sinh trong ngày nhập viện và ngày xuất viện.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Thời gian được bảo vệ dài hơn nhiều (30 ngày trước và 60 ngày sau).',
      'Phương án B ĐÚNG: Căn cứ Khoản 27, 28 (Trang 7) và Bảng 1 Mục A.3.5 & A.3.6 (Trang 16), Điều trị trước khi nhập viện trong vòng 30 ngày và Điều trị sau khi xuất viện trong vòng 60 ngày đều được chi trả theo Chi Phí Y Tế thực tế.',
      'Phương án C SAI: Thứ tự bị đảo ngược; đúng là TRƯỚC 30 ngày và SAU 60 ngày.',
      'Phương án D SAI: Bao quát cả quá trình xét nghiệm chẩn đoán ban đầu và tái khám theo dõi sau điều trị.'
    ],
    explanation: 'PRUKhỏe Linh Hoạt bảo bọc trọn vẹn chu trình điều trị: Chi trả xét nghiệm, chẩn đoán hình ảnh liên quan trực tiếp phát sinh trong 30 NGÀY TRƯỚC khi nhập viện, và thăm khám, thuốc theo toa trong 60 NGÀY SAU khi xuất viện theo chi phí thực tế!',
    extraKnowledge: 'Lưu ý điều khoản: Quyền lợi Điều Trị Trước Nhập Viện và Sau Xuất Viện KHÔNG áp dụng cho Quyền Lợi Thai Sản.',
    memoryTip: 'Mốc thời gian vàng: "Trước 30 ngày - Sau 60 ngày - Chi trả theo thực tế"',
    sourceDocPage: 'Trang 7 (Khoản 27, 28) & Trang 16 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-15',
    category: 'Quyền Lợi Ngoại Trú',
    scenario: 'Khách hàng chọn gói Nội Trú 1 tỷ đồng và muốn bổ sung thêm Quyền Lợi Ngoại Trú để đi khám phòng khám.',
    question: 'Hạn Mức Hàng Năm của Quyền Lợi Ngoại Trú (tùy chọn) có mấy phương án lựa chọn và mức tối đa là bao nhiêu?',
    options: [
      'Chỉ có 1 mức duy nhất cố định là 10 triệu đồng.',
      'Có 3 lựa chọn: bằng 2%, 4%, hoặc 6% Hạn Mức Hàng Năm của Quyền Lợi Nội Trú; tối đa không vượt quá 150 triệu đồng.',
      'Có 5 lựa chọn từ 10% đến 50% hạn mức nội trú, tối đa 500 triệu đồng.',
      'Tự do điền số tiền mong muốn không có mức trần.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Ngoại trú có tới 3 phương án % linh hoạt tùy chọn.',
      'Phương án B ĐÚNG: Căn cứ Điều 1.5 & Bảng 2 (Trang 17-18), Khách hàng có 3 lựa chọn: 2%, 4% hoặc 6% Hạn Mức Nội Trú, tối đa không quá 150 triệu đồng.',
      'Phương án C SAI: Tỷ lệ quy định là 2%, 4%, 6% (không phải 10% - 50%).',
      'Phương án D SAI: Có mức trần tối đa theo quy tắc là 150 triệu đồng.'
    ],
    explanation: 'Quyền Lợi Ngoại Trú cực kỳ linh hoạt với 3 sự lựa chọn: 2%, 4%, hoặc 6% Hạn Mức Hàng Năm của Quyền Lợi Nội Trú. Trần tối đa của Quyền Lợi Ngoại Trú là 150 triệu đồng/năm.',
    extraKnowledge: 'Giới hạn phụ ngoại trú: Điều trị Tây y tối đa 10% Hạn mức Ngoại trú / Lần khám. Điều trị Y học thay thế / Vật lý trị liệu tối đa 2,5% / Lần khám (tối đa 4 lần/năm).',
    memoryTip: 'Công thức Ngoại Trú: "Chọn 2% - 4% - 6% Nội Trú (Tối đa 150 triệu/năm)"',
    sourceDocPage: 'Trang 17-18 - Điều 1.5 & Bảng 2 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-16',
    category: 'Quyền Lợi Nha Khoa',
    scenario: 'Khách hàng muốn tham gia riêng gói chăm sóc răng miệng Nha Khoa mà không mua Ngoại Trú.',
    question: 'Điều kiện để tham gia Quyền Lợi Nha Khoa và hạn mức bọc răng/cắm implant trong PRUKhỏe Linh Hoạt là gì?',
    options: [
      'Có thể tham gia độc lập bất cứ lúc nào; không giới hạn số răng cắm implant.',
      'Chỉ có thể lựa chọn Quyền Lợi Nha Khoa khi CÓ tham gia Quyền Lợi Ngoại Trú; bọc răng hoặc cắm implant chi trả tối đa 2 răng/Năm Hợp Đồng.',
      'Bắt buộc phải tham gia kèm Quyền Lợi Thai Sản; chỉ chi trả cho trẻ em dưới 10 tuổi.',
      'Nha khoa chỉ bảo hiểm nhổ răng sâu, không chi trả cạo vôi và bọc răng.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Quy tắc quy định Nha khoa là quyền lợi phụ thuộc, bắt buộc phải có Ngoại trú mới được mua.',
      'Phương án B ĐÚNG: Căn cứ Điều 1.6 & Bảng 3 (Trang 18-19), Bên Mua Bảo Hiểm chỉ có thể lựa chọn Nha Khoa khi có tham gia Ngoại Trú. Hạn mức bọc răng hoặc cắm implant được hỗ trợ tối đa 2 răng/Năm Hợp Đồng; cạo vôi răng tối đa 2 lần/năm.',
      'Phương án C SAI: Nha khoa gắn liền với Ngoại trú, không bắt buộc phải có Thai sản.',
      'Phương án D SAI: Nha khoa chi trả đa dạng: nhổ răng bệnh lý, trám răng, chữa tủy, cạo vôi đánh bóng (2 lần/năm), bọc răng và cắm implant (2 răng/năm).'
    ],
    explanation: 'Theo Điều 1.6: Quyền Lợi Nha Khoa chỉ được lựa chọn khi khách hàng đã tham gia Quyền Lợi Ngoại Trú. Hạn mức Nha khoa bằng 1%, 1,5% hoặc 2% hạn mức Nội trú (tối đa 30 triệu/năm). Bọc răng sứ hoặc cắm implant được hỗ trợ tối đa 2 răng/năm.',
    extraKnowledge: 'Chi phí cạo vôi răng và đánh bóng răng được chi trả tối đa 2 lần/Năm Hợp Đồng, mỗi lần khám giới hạn phụ tối đa 10% Hạn Mức Nha Khoa.',
    memoryTip: 'Nha Khoa gắn Ngoại Trú: "Tối đa 30 triệu - Cạo vôi 2 lần/năm - Bọc răng/Implant 2 răng/năm"',
    sourceDocPage: 'Trang 18-19 - Điều 1.6 & Bảng 3 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-17',
    category: 'Quyền Lợi Thai Sản',
    scenario: 'Nữ khách hàng 46 tuổi vừa lập gia đình và muốn tham gia Quyền Lợi Thai Sản của PRUKhỏe Linh Hoạt.',
    question: 'Độ tuổi tham gia, hạn mức và tỷ lệ chi trả cho Sinh Thường / Sinh Mổ của Quyền Lợi Thai Sản được quy định thế nào?',
    options: [
      'Áp dụng cho nữ từ 15 đến 60 tuổi; sinh thường và sinh mổ đều chi trả 100 triệu cố định.',
      'Áp dụng cho nữ từ 18 đến 50 tuổi (khi tham gia không quá 45 tuổi); Hạn mức bằng 8% hạn mức Nội trú (max 200 triệu); Sinh thường chi trả 50%, Sinh mổ chi trả 100% Hạn mức Thai sản.',
      'Áp dụng cho mọi phụ nữ không giới hạn độ tuổi; chỉ chi trả khi sinh mổ cấp cứu.',
      'Chỉ áp dụng cho lần sinh con đầu tiên, không giới hạn số tiền chi trả.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Độ tuổi khi bắt đầu tham gia không quá 45 tuổi và hạn mức tính theo 8% hạn mức Nội trú (tối đa 200 triệu).',
      'Phương án B ĐÚNG: Căn cứ Điều 1.7 & Bảng 4 (Trang 19-20), áp dụng cho phụ nữ từ 18-50 tuổi (tuổi khi tham gia không quá 45). Hạn mức bằng 8% Nội trú (tối đa 200 triệu). Sinh thường 50% và Sinh mổ 100% Hạn mức Thai sản.',
      'Phương án C SAI: Có điều kiện độ tuổi khắt khe (tham gia không quá 45 tuổi) và chi trả cho cả sinh thường lẫn sinh mổ.',
      'Phương án D SAI: Chi trả cho một kỳ thai sản trong mỗi Năm Hợp Đồng, không phân biệt con đầu hay con thứ.'
    ],
    explanation: 'Quyền Lợi Thai Sản ưu việt: Áp dụng cho nữ 18-50 tuổi (khi tham gia không quá 45 tuổi), hạn mức 8% hạn mức Nội trú (tối đa 200 triệu). Sinh thường thanh toán tối đa 50% hạn mức thai sản; Sinh mổ thanh toán tối đa 100% hạn mức thai sản.',
    extraKnowledge: 'Khám thai trước và sau sinh: tối đa 5%/lần khám (tối đa 8 lần). Chi phí Dưỡng Nhi cho bé sơ sinh trong 7 ngày đầu sau sinh: 5%/ngày (tối đa 15 ngày).',
    memoryTip: 'Thai Sản PRU: "Tham gia <=45 tuổi - Hạn mức 8% Nội trú - Sinh thường 50% | Sinh mổ 100%"',
    sourceDocPage: 'Trang 19-20 - Điều 1.7 & Bảng 4 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-18',
    category: 'Thời Gian Chờ',
    scenario: 'Khách hàng vừa tham gia hợp đồng được 45 ngày thì phát hiện bị sỏi túi mật (thuộc danh mục Bệnh Đặc Biệt).',
    question: 'Thời Gian Chờ đối với các trường hợp: Tai Nạn, Bệnh Thông Thường, Bệnh Đặc Biệt / Ung Thư / Cấy Ghép Nội Tạng, và Thai Sản lần lượt là bao nhiêu ngày?',
    options: [
      'Tai nạn: 30 ngày; Bệnh thông thường: 60 ngày; Ung thư: 90 ngày; Thai sản: 180 ngày.',
      'Tai nạn: 0 ngày (Không áp dụng); Bệnh thông thường: 30 ngày; Bệnh đặc biệt/Ung thư/Ghép tạng: 90 ngày; Thai sản & biến chứng thai sản: 270 ngày.',
      'Tất cả các trường hợp đều có thời gian chờ chung là 90 ngày.',
      'Không có thời gian chờ, tất cả các bệnh đều được bảo hiểm ngay sau khi ký hợp đồng.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Tai nạn bảo vệ ngay 0 ngày, Bệnh thường 30 ngày và Thai sản là 270 ngày (không phải 180 ngày).',
      'Phương án B ĐÚNG: Căn cứ Điều 1.8 (Trang 20-21), bảng thời gian chờ quy định chuẩn xác: Tai nạn: 0 ngày; Bệnh khác: 30 ngày; Điều trị Ung thư, Bệnh đặc biệt, Cấy ghép nội tạng: 90 ngày; Thai sản & Biến chứng thai sản: 270 ngày.',
      'Phương án C SAI: Thời gian chờ được phân hóa khoa học theo từng nhóm nguy cơ bệnh lý.',
      'Phương án D SAI: Mọi sản phẩm bảo hiểm sức khỏe đều có thời gian chờ nhằm ngăn ngừa trục lợi trước khi phát sinh bệnh.'
    ],
    explanation: 'Theo Điều 1.8: Tai nạn được bảo vệ ngay lập tức (0 ngày). Bệnh thông thường có thời gian chờ 30 ngày. Bệnh đặc biệt, Ung thư và Cấy ghép nội tạng có thời gian chờ 90 ngày. Thai sản và Biến chứng thai sản có thời gian chờ 270 ngày.',
    extraKnowledge: 'Nếu khách hàng phát hiện sỏi mật ở ngày thứ 45 thì chưa qua thời gian chờ 90 ngày của Bệnh đặc biệt, do đó đợt điều trị này chưa thuộc phạm vi chi trả.',
    memoryTip: 'Bộ 4 mốc thời gian chờ: "Tai nạn 0 ngày - Bệnh thường 30 ngày - Ung thư/Bệnh đặc biệt 90 ngày - Thai sản 270 ngày"',
    sourceDocPage: 'Trang 20-21 - Điều 1.8 Thời Gian Chờ Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-19',
    category: 'Cấy Ghép Nội Tạng',
    scenario: 'Khách hàng tham gia PRUKhỏe Linh Hoạt phải thực hiện phẫu thuật ghép thận, người hiến thận là anh trai ruột.',
    question: 'Quyền lợi "Cấy Ghép Nội Tạng" trong sản phẩm PRUKhỏe Linh Hoạt chi trả những khoản chi phí nào?',
    options: [
      'Chỉ chi trả tiền mua tạng hiến tặng từ ngân hàng nội tạng.',
      'Chi trả Chi Phí Y Tế của Người Được Bảo Hiểm (người nhận tạng) theo thực tế VÀ chi trả 50% Chi Phí Phẫu Thuật lấy tạng của người hiến tạng (chi trả 1 lần duy nhất trọn đời).',
      'Chi trả 100% toàn bộ chi phí nằm viện và tiền bồi dưỡng cho người hiến tạng.',
      'Chi trả chi phí ghép tạng không giới hạn số lần cho bất kỳ cơ quan nào.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Chi phí mua bán bộ phận cơ thể người bị pháp luật nghiêm cấm và thuộc điều khoản loại trừ.',
      'Phương án B ĐÚNG: Căn cứ Khoản 10 (Trang 5) và Bảng 1 Mục A.2 (Trang 14), quyền lợi bao gồm: Chi Phí Y Tế của Người Được Bảo Hiểm (người nhận tạng) theo thực tế VÀ 50% Chi Phí Phẫu Thuật của người hiến tạng (chi trả 1 lần duy nhất trọn đời).',
      'Phương án C SAI: Người hiến tạng chỉ được hỗ trợ 50% chi phí phẫu thuật lấy tạng, không bao gồm toàn bộ viện phí khác hay bồi dưỡng riêng.',
      'Phương án D SAI: Quyền lợi ghép tạng chỉ được chi trả 1 lần duy nhất trọn đời.'
    ],
    explanation: 'Điều 10 & Bảng 1 Mục A.2 quy định: Cấy ghép nội tạng (tim, phổi, gan, tụy, thận, tủy xương) chi trả theo chi phí thực tế cho Người Được Bảo Hiểm (người nhận), đồng thời hỗ trợ 50% chi phí phẫu thuật lấy tạng đối với người hiến tạng. Chi trả 1 lần duy nhất trọn đời.',
    extraKnowledge: 'Đây là chính sách nhân văn lớn, giảm bớt gánh nặng chi phí phẫu thuật cho người thân tình nguyện hiến tặng nội tạng cứu mạng Người Được Bảo Hiểm.',
    memoryTip: 'Ghép tạng nhân văn: "Người nhận: Trả thực tế | Người hiến: Hỗ trợ 50% chi phí phẫu thuật lấy tạng (1 lần trọn đời)"',
    sourceDocPage: 'Trang 5 (Khoản 10) & Trang 14-15 Quy tắc PRUKhỏe Linh Hoạt'
  },
  {
    id: 'pru-lh-20',
    category: 'Điều Khoản Loại Trừ',
    scenario: 'Khách hàng nhập viện điều trị gãy chân do va chạm xe máy, kết quả xét nghiệm bệnh viện ghi nhận nồng độ cồn trong máu vượt ngưỡng.',
    question: 'Theo Điều 2 (Điều Khoản Loại Trừ) của PRUKhỏe Linh Hoạt, trường hợp nào sau đây KHÔNG THUỘC phạm vi chi trả bảo hiểm?',
    options: [
      'Khách hàng bị gãy tay do trượt chân té ngã trong sinh hoạt gia đình.',
      'Thương tích phát sinh khi Người Được Bảo Hiểm đang chịu ảnh hưởng từ chất có cồn (kết quả xét nghiệm nồng độ cồn vượt trị số bình thường theo quy định của Bộ Y Tế).',
      'Tiêm vắc xin uốn ván khẩn cấp sau khi bị tai nạn rách da.',
      'Bệnh nhân điều trị viêm ruột thừa cấp có phẫu thuật tại Bệnh viện Công.'
    ],
    correctAnswer: 1,
    optionExplanations: [
      'Phương án A SAI: Tai nạn sinh hoạt thông thường được bảo hiểm chi trả đầy đủ.',
      'Phương án B ĐÚNG: Căn cứ Khoản 28 Điều 2 (Trang 24), Thương Tích phát sinh khi Người Được Bảo Hiểm đang chịu ảnh hưởng từ chất có cồn (vượt trị số bình thường của Bộ Y Tế), chất gây nghiện, chất ma túy thuộc phạm vi loại trừ bảo hiểm.',
      'Phương án C SAI: Tiêm vắc xin uốn ván sau tai nạn hoặc vắc xin dại sau khi bị động vật cắn được điều khoản quy định NGOẠI LỆ ĐƯỢC CHI TRẢ (Khoản 15 Điều 2).',
      'Phương án D SAI: Viêm ruột thừa cấp là bệnh cấp tính được chi trả 100% theo quyền lợi nội trú.'
    ],
    explanation: 'Khoản 28 Điều 2 ghi rõ loại trừ: Thương tích phát sinh khi Người Được Bảo Hiểm đang chịu ảnh hưởng từ chất có cồn vượt trị số bình thường theo quy định của Bộ Y Tế Việt Nam, chất ma túy hoặc chất kích thích.',
    extraKnowledge: 'Đại lý cần lưu ý thêm các điểm loại trừ then chốt: Tật khúc xạ mắt (cận, viễn, loạn, phẫu thuật Lasik), thẩm mỹ da, kiểm tra sức khỏe tổng quát định kỳ, bệnh bẩm sinh/di truyền.',
    memoryTip: 'Khẩu quyết loại trừ: "Đã uống rượu bia, chất cồn vượt ngưỡng - Không được bảo lãnh bồi thường"',
    sourceDocPage: 'Trang 21-25 - Điều 2 Điều Khoản Loại Trừ PRUKhỏe Linh Hoạt'
  }
];
