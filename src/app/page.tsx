"use client";

import { useState } from "react";
import { QUESTIONS } from "@/data/questions";

export default function Home() {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(1);

  const question = QUESTIONS.find((q) => q.day === currentDay) || QUESTIONS[0];

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setStreak((prev) => prev + 1);
    }
  };

  const handleNextDay = () => {
    setIsSubmitted(false);
    setSelectedOption(null);
    if (currentDay < QUESTIONS.length) {
      setCurrentDay((prev) => prev + 1);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div>
            <h1 className="text-xl font-bold text-emerald-400">🔥 100 Days Trace Code THPTQG 2027</h1>
            <p className="text-sm text-slate-400">Ngày {question.day} / 100</p>
          </div>
          <div className="bg-slate-700 px-4 py-2 rounded-lg font-bold text-amber-400 flex items-center gap-1">
            <span>⚡ Streak:</span> {streak} ngày
          </div>
        </header>

        {/* Card Đề Bài */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-200">
            Câu {question.day}: {question.title}
          </h2>
          <p className="text-sm text-slate-300">Cho đoạn mã Python sau, hãy xác định kết quả in ra màn hình:</p>

          {/* Block Code */}
          <pre className="bg-slate-950 p-4 rounded-lg font-mono text-emerald-300 text-sm overflow-x-auto border border-slate-800">
            <code>{question.code}</code>
          </pre>

          {/* Đáp án */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {question.options.map((option, idx) => {
              let btnStyle = "bg-slate-700 hover:bg-slate-600 border-slate-600";
              if (selectedOption === idx) btnStyle = "bg-blue-600 border-blue-400";
              if (isSubmitted) {
                if (idx === question.correctAnswer) btnStyle = "bg-emerald-600 border-emerald-400";
                else if (selectedOption === idx) btnStyle = "bg-rose-600 border-rose-400";
              }

              return (
                <button
                  key={idx}
                  disabled={isSubmitted}
                  onClick={() => setSelectedOption(idx)}
                  className={`p-3 text-left rounded-lg border font-mono transition-all ${btnStyle}`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {option}
                </button>
              );
            })}
          </div>

          {/* Nút kiểm tra */}
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className="w-full py-3 mt-4 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-slate-950 font-bold rounded-lg transition-colors"
            >
              Nộp bài & Kiểm tra
            </button>
          ) : (
            <button
              onClick={handleNextDay}
              className="w-full py-3 mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
            >
              Chuyển sang ngày tiếp theo →
            </button>
          )}
        </div>

        {/* Giải thích / Bảng vết code */}
        {isSubmitted && (
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 space-y-4">
            <h3 className="text-md font-bold text-amber-400">📊 Bảng chạy vết (Tracing Table) chi tiết:</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700 text-slate-400">
                    <th className="py-2 px-3">Bước execution</th>
                    <th className="py-2 px-3">Biến/Trạng thái 1</th>
                    <th className="py-2 px-3">Biến/Trạng thái 2</th>
                  </tr>
                </thead>
                <tbody>
                  {question.explanation.map((row, index) => (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-2 px-3 text-slate-300">{row.step}</td>
                      <td className="py-2 px-3 font-mono text-emerald-400">{row.s}</td>
                      <td className="py-2 px-3 font-mono text-amber-300">{row.i}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
