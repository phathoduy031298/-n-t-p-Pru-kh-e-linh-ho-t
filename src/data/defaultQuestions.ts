import { Question } from '../types';
import { generateGameQuestions, QUESTION_BANK, THEORY_QUESTIONS, CALCULATION_SCENARIO_QUESTIONS } from './questionBank';

export { generateGameQuestions, QUESTION_BANK, THEORY_QUESTIONS, CALCULATION_SCENARIO_QUESTIONS };

/**
 * DEFAULT_QUESTIONS được tạo ngẫu nhiên từ kho đề:
 * - Gồm đúng 20 câu hỏi
 * - 60% Lý thuyết (12 câu) & 40% Tình huống / Tính toán (8 câu)
 * - Đầy đủ tất cả các chủ đề: Tổng quan, Nội trú, Ngoại trú, Nha khoa, Thai sản, Tổng hợp
 * - Tự động thiết lập thời gian suy nghĩ phù hợp theo độ phức tạp của từng câu
 */
export const DEFAULT_QUESTIONS: Question[] = generateGameQuestions();
