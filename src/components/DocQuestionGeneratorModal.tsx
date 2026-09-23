import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  FileText, 
  Plus, 
  Download, 
  Upload, 
  Loader2, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import { Question } from '../types';

interface DocQuestionGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddQuestions: (newQuestions: Question[], replaceAll: boolean) => void;
  currentQuestions: Question[];
}

export const DocQuestionGeneratorModal: React.FC<DocQuestionGeneratorModalProps> = ({
  isOpen,
  onClose,
  onAddQuestions,
  currentQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<'ai' | 'manual' | 'json'>('ai');

  // AI Generator state
  const [docText, setDocText] = useState('');
  const [topic, setTopic] = useState('Quy trình, điều kiện và lưu ý bảo lãnh viện phí Prudential');
  const [questionCount, setQuestionCount] = useState(4);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);

  // Manual Form State
  const [manualQuestion, setManualQuestion] = useState('');
  const [manualCategory, setManualCategory] = useState('Quy trình bảo lãnh');
  const [manualOptions, setManualOptions] = useState<[string, string, string, string]>([
    '', '', '', ''
  ]);
  const [manualCorrect, setManualCorrect] = useState(0);
  const [manualExplanation, setManualExplanation] = useState('');
  const [manualExtra, setManualExtra] = useState('');
  const [manualTip, setManualTip] = useState('');

  if (!isOpen) return null;

  const handleGenerateAI = async () => {
    if (!docText.trim() || docText.trim().length < 20) {
      setErrorMsg('Vui lòng dán nội dung từ các trang tài liệu đào tạo (tối thiểu 20 ký tự).');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: docText,
          topic,
          count: questionCount,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Có lỗi xảy ra khi tạo câu hỏi.');
      }

      if (data.questions && Array.isArray(data.questions)) {
        const formatted: Question[] = data.questions.map((q: any, i: number) => ({
          id: `custom-ai-${Date.now()}-${i}`,
          category: q.category || 'Tài liệu bổ sung',
          question: q.question,
          options: q.options as [string, string, string, string],
          correctAnswer: q.correctAnswer ?? 0,
          explanation: q.explanation || '',
          extraKnowledge: q.extraKnowledge || '',
          memoryTip: q.memoryTip || '',
          sourceDocPage: 'Trích xuất từ trang tài liệu giảng viên',
        }));
        setGeneratedQuestions(formatted);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể kết nối đến máy chủ AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddGenerated = (replaceAll: boolean) => {
    if (generatedQuestions.length > 0) {
      onAddQuestions(generatedQuestions, replaceAll);
      setGeneratedQuestions([]);
      onClose();
    }
  };

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualQuestion.trim() || manualOptions.some((o) => !o.trim())) {
      setErrorMsg('Vui lòng nhập đầy đủ câu hỏi và 4 phương án lựa chọn.');
      return;
    }

    const newQ: Question = {
      id: `custom-manual-${Date.now()}`,
      category: manualCategory,
      question: manualQuestion,
      options: manualOptions,
      correctAnswer: manualCorrect,
      explanation: manualExplanation || 'Đáp án đúng theo quy tắc sản phẩm.',
      extraKnowledge: manualExtra || 'Đại lý luôn đối chiếu quy tắc trước khi tư vấn.',
      memoryTip: manualTip || 'Ghi nhớ nguyên tắc cốt lõi của sản phẩm.',
      sourceDocPage: 'Giảng viên bổ sung thủ công',
    };

    onAddQuestions([newQ], false);
    // Reset manual fields
    setManualQuestion('');
    setManualOptions(['', '', '', '']);
    setManualExplanation('');
    setManualExtra('');
    setManualTip('');
    onClose();
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(currentQuestions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `pruquest-questions-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            onAddQuestions(parsed, true);
            onClose();
          } else {
            setErrorMsg('Định dạng file JSON không hợp lệ.');
          }
        } catch {
          setErrorMsg('Lỗi khi đọc file JSON.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                Quản Lý Đề Thi & Tạo Câu Hỏi Từ Tài Liệu
              </h2>
              <p className="text-xs text-slate-400">
                Dán các trang tài liệu PDF mới để AI tự động chuyển hóa thành câu hỏi trắc nghiệm
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-slate-800 px-5 pt-3 bg-slate-900/50 gap-2">
          <button
            onClick={() => setActiveTab('ai')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'ai'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tạo tự động từ Tài liệu bằng AI</span>
          </button>

          <button
            onClick={() => setActiveTab('manual')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'manual'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm thủ công 1 câu</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`pb-2.5 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'json'
                ? 'border-red-500 text-red-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Xuất / Nhập file đề</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Body content based on tab */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'ai' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Dán nội dung từ các trang tài liệu đào tạo (Quy tắc, Cẩm nang, Slide):
                </label>
                <textarea
                  rows={6}
                  value={docText}
                  onChange={(e) => setDocText(e.target.value)}
                  placeholder="Ví dụ: Dán đoạn văn bản từ trang tài liệu: 'Thời gian phản hồi thông báo bảo lãnh tạm ứng là 30 phút... Khách hàng cần xuất trình e-Card trên app PRUOnline và CCCD...'"
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Chủ đề trọng tâm cần hỏi:
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Số lượng câu hỏi muốn tạo (2 - 8 câu):
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                  >
                    <option value={2}>2 câu hỏi tình huống</option>
                    <option value={3}>3 câu hỏi tình huống</option>
                    <option value={4}>4 câu hỏi tình huống</option>
                    <option value={6}>6 câu hỏi tình huống</option>
                    <option value={8}>8 câu hỏi tình huống</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleGenerateAI}
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang phân tích tài liệu và sinh câu hỏi trắc nghiệm...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Bắt Đầu Tạo Câu Hỏi Bằng AI (Gemini)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Preview Generated Questions */}
              {generatedQuestions.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã tạo thành công {generatedQuestions.length} câu hỏi mới!
                    </h4>
                  </div>

                  <div className="space-y-3">
                    {generatedQuestions.map((q, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700">
                        <p className="font-bold text-xs text-white mb-2">
                          Câu {idx + 1}: {q.question}
                        </p>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
                          {q.options.map((opt, oIdx) => (
                            <div
                              key={oIdx}
                              className={`p-1.5 rounded-lg border ${
                                oIdx === q.correctAnswer
                                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200 font-bold'
                                  : 'bg-slate-800 border-slate-700'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </div>
                          ))}
                        </div>
                        <p className="mt-2 text-[10px] text-slate-400 italic">
                          💡 {q.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleAddGenerated(false)}
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                    >
                      Thêm vào cuối danh sách câu hỏi hiện tại
                    </button>
                    <button
                      onClick={() => handleAddGenerated(true)}
                      className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors"
                    >
                      Thay thế toàn bộ bằng các câu hỏi mới này
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'manual' && (
            <form onSubmit={handleAddManual} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Nhóm chuyên đề:
                  </label>
                  <input
                    type="text"
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Đáp án đúng (0=A, 1=B, 2=C, 3=D):
                  </label>
                  <select
                    value={manualCorrect}
                    onChange={(e) => setManualCorrect(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value={0}>Phương án A</option>
                    <option value={1}>Phương án B</option>
                    <option value={2}>Phương án C</option>
                    <option value={3}>Phương án D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  rows={2}
                  value={manualQuestion}
                  onChange={(e) => setManualQuestion(e.target.value)}
                  placeholder="Nhập câu hỏi..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-300">
                  4 Phương án lựa chọn (A, B, C, D):
                </label>
                {manualOptions.map((opt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-6 text-center font-bold text-xs text-slate-400">
                      {String.fromCharCode(65 + i)}:
                    </span>
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const updated = [...manualOptions] as [string, string, string, string];
                        updated[i] = e.target.value;
                        setManualOptions(updated);
                      }}
                      placeholder={`Phương án ${String.fromCharCode(65 + i)}`}
                      className="flex-1 p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Lời giải thích chi tiết:
                </label>
                <textarea
                  rows={2}
                  value={manualExplanation}
                  onChange={(e) => setManualExplanation(e.target.value)}
                  placeholder="Giải thích tại sao đáp án này đúng..."
                  className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kiến thức bổ sung / Mẹo tư vấn:
                  </label>
                  <input
                    type="text"
                    value={manualExtra}
                    onChange={(e) => setManualExtra(e.target.value)}
                    placeholder="Mẹo tư vấn cho đại lý..."
                    className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Khẩu quyết ghi nhớ:
                  </label>
                  <input
                    type="text"
                    value={manualTip}
                    onChange={(e) => setManualTip(e.target.value)}
                    placeholder="Khẩu quyết ngắn gọn..."
                    className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white text-xs transition-colors cursor-pointer"
              >
                + Thêm Câu Hỏi Này Vào Bộ Đề
              </button>
            </form>
          )}

          {activeTab === 'json' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">Xuất bộ đề hiện tại ra file JSON</h4>
                  <p className="text-xs text-slate-400">
                    Lưu lại toàn bộ {currentQuestions.length} câu hỏi để dùng cho các lớp huấn luyện tiếp theo
                  </p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Tải file JSON</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                <h4 className="font-bold text-sm text-white mb-1">Nhập bộ đề từ file JSON</h4>
                <p className="text-xs text-slate-400 mb-3">
                  Tải lên file JSON chứa các câu hỏi trắc nghiệm đã chuẩn bị sẵn
                </p>
                <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Chọn file JSON từ máy tính</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
