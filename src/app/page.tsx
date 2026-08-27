"use client";

import { useState } from "react";
import { QUESTIONS } from "@/data/questions";

export default function Home() {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<(boolean | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const question = QUESTIONS.find((q) => q.day === currentDay) || QUESTIONS[0];

  const handleSelect = (index: number, value: boolean) => {
    if (isSubmitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[index] = value;
    setUserAnswers(newAnswers);
  };

  const isAllAnswered = userAnswers.every((val) => val !== null);

  const calculateScore = () => {
    let count = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === question.answers[idx]) count++;
    });
    return count;
  };

  const handleNextDay = () => {
    setIsSubmitted(false);
    setUserAnswers([null, null, null, null]);
    if (currentDay < QUESTIONS.length) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  const labels = ["a", "b", "c", "d"];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-emerald-400">🔥 100 Days Trace Code THPTQG 2027</h1>
            <p className="text-sm text-slate-400">Ngày {question.day} / 100</p>
          </div>
        </header>

        {/* Khung Khối Đề Bài */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-6">
          <p className="text-base text-slate-200 leading-relaxed font-medium">
            <span className="text-amber-400 font-bold mr-2">Câu {question.day}:</span>
            {question.title}
          </p>

          {/* BẢNG CODE 2 CỘT (Nếu là câu code) */}
          {question.type === "code" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-700 rounded-lg overflow-hidden bg-slate-950">
              {/* Python */}
              <div className="border-b md:border-b-0 md:border-r border-slate-700 p-4 space-y-2">
                <div className="text-emerald-400 font-bold text-sm border-b border-slate-800 pb-2">
                  🐍 Python
                </div>
                <pre className="font-mono text-emerald-300 text-xs md:text-sm overflow-x-auto leading-relaxed">
                  <code>{question.pythonCode}</code>
                </pre>
              </div>

              {/* C++ */}
              <div className="p-4 space-y-2">
                <div className="text-cyan-400 font-bold text-sm border-b border-slate-800 pb-2">
                  ⚡ C++
                </div>
                <pre className="font-mono text-cyan-300 text-xs md:text-sm overflow-x-auto leading-relaxed">
                  <code>{question.cppCode}</code>
                </pre>
              </div>
            </div>
          )}

          {/* BẢNG Ý A, B, C, D VỚI Ô TICK ĐÚNG / SAI */}
          <div className="space-y-3 pt-2">
            <p className="text-sm font-semibold text-slate-400">
              Mỗi phát biểu sau đây là Đúng hay Sai?
            </p>

            <div className="border border-slate-700 rounded-lg overflow-hidden divide-y divide-slate-700/60 bg-slate-900/50">
              {question.statements.map((text, idx) => {
                const userAns = userAnswers[idx];

                return (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Nội dung ý */}
                    <div className="text-sm text-slate-200 flex-1">
                      <span className="font-bold text-amber-400 mr-2">{labels[idx]})</span>
                      {text}
                    </div>

                    {/* 2 Ô TICK CHỌN ĐÚNG / SAI */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        disabled={isSubmitted}
                        onClick={() => handleSelect(idx, true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                          userAns === true
                            ? "bg-emerald-600 border-emerald-400 text-white"
                            : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px] ${
                          userAns === true ? "border-white bg-white text-emerald-600" : "border-slate-500"
                        }`}>
                          {userAns === true && "✓"}
                        </span>
                        ĐÚNG
                      </button>

                      <button
                        disabled={isSubmitted}
                        onClick={() => handleSelect(idx, false)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
                          userAns === false
                            ? "bg-rose-600 border-rose-400 text-white"
                            : "bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[10px] ${
                          userAns === false ? "border-white bg-white text-rose-600" : "border-slate-500"
                        }`}>
                          {userAns === false && "✓"}
                        </span>
                        SAI
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NÚT CHẤM ĐIỂM / NỘP BÀI */}
          {!isSubmitted && (
            <button
              onClick={() => setIsSubmitted(true)}
              disabled={!isAllAnswered}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold rounded-lg transition-colors text-sm"
            >
              Nộp bài & Chấm điểm ({userAnswers.filter((v) => v !== null).length}/4)
            </button>
          )}

          {/* KẾT QUẢ KÈM ĐÁP ÁN CHI TIẾT Ở DƯỚI KHI NỘP BÀI */}
          {isSubmitted && (
            <div className="space-y-6 pt-2 border-t border-slate-700">
              {/* Hiển thị kết quả điểm */}
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-700 text-center">
                <p className="text-base font-semibold text-slate-200">
                  Kết quả làm bài: <span className="text-amber-400 font-bold text-xl">{calculateScore()}/4</span> ý chính xác
                </p>
              </div>

              {/* Khối Đáp án chi tiết */}
              <div className="bg-slate-950 p-5 rounded-lg border border-slate-700 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">
                  📖 Lời giải & Đáp án chi tiết:
                </h3>
                <div className="font-mono text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                  {question.explanation}
                </div>
              </div>

              {/* Nút sang bài tiếp theo */}
              <button
                onClick={handleNextDay}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors text-sm"
              >
                Chuyển sang Ngày tiếp theo →
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
