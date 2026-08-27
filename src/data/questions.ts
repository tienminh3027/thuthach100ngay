export interface Question {
  day: number;
  type: "code" | "theory";
  title: string;
  pythonCode?: string;
  cppCode?: string;
  statements: string[]; // 4 câu [a, b, c, d]
  answers: boolean[]; // 4 đáp án tương ứng [true = Đúng, false = Sai]
  explanation: string; // Đáp án chi tiết hiển thị ở dưới khi nộp bài
}

export const QUESTIONS: Question[] = [
  // ==================== DAY 1: TRACE CODE ====================
  {
    day: 1,
    type: "code",
    title: "Lựa chọn ngôn ngữ lập trình Python hoặc C++ để tìm hiểu đoạn chương trình sau:",
    pythonCode: `def sort_algo(A, n):
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if A[j] > A[j + 1]:
                A[j], A[j + 1] = A[j + 1], A[j]`,
    cppCode: `void sort_algo(int A[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - 1 - i; j++) {
            if (A[j] > A[j + 1]) {
                int temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;
            }
        }
    }
}`,
    statements: [
      "Hàm sort_algo thể hiện thuật toán Sắp xếp chèn (Insertion Sort).",
      "Thao tác cơ bản nhất của thuật toán này là so sánh và đổi chỗ hai phần tử kề nhau nếu chúng bị ngược thứ tự.",
      "Độ phức tạp thời gian của đoạn mã trên luôn là O(n^2) trong mọi trường hợp do có hai vòng lặp lồng nhau.",
      "Nếu truyền mảng đầu vào A = [5, 2, 8, 1] và n = 4, sau khi kết thúc vòng lặp ngoài (biến i) lần ĐẦU TIÊN (i = 0), phần tử lớn nhất là 8 sẽ được đẩy về cuối mảng.",
    ],
    answers: [false, true, true, true], // a: Sai, b: Đúng, c: Đúng, d: Đúng
    explanation: `ĐÁP ÁN CHI TIẾT CÂU 1:
a) Sai. Đây là thuật toán Sắp xếp nổi bọt (Bubble Sort), không phải Sắp xếp chèn.
b) Đúng. Thuật toán so sánh từng cặp kề nhau A[j] và A[j+1] để đổi chỗ.
c) Đúng. 2 vòng lặp lồng nhau chạy cố định n*(n-1)/2 lần.
d) Đúng. Sau lượt i = 0, mảng trở thành [2, 5, 1, 8], số 8 lớn nhất được đẩy về cuối.`,
  },

  // ==================== DAY 2: LÝ THUYẾT ====================
  {
    day: 2,
    type: "theory",
    title: "Để xây dựng một phần mềm quản lý thư viện, một nhóm học sinh quyết định chia nhỏ chương trình thành 3 hàm độc lập: NhapThongTinSach(), TimKiemSach(), và InDanhSach().",
    statements: [
      "Việc chia chương trình thành 3 hàm như mô tả là ví dụ minh hoạ cho phương pháp thiết kế chương trình theo mô đun (làm mịn dần).",
      "Hàm TimKiemSach() có thể được lập trình và chạy thử nghiệm (test) một cách độc lập bằng các bộ dữ liệu mẫu mà không cần chờ đợi hàm InDanhSach() viết xong.",
      "Khi tiến hành kiểm thử (testing), nhóm học sinh chỉ cần nhập đúng một bộ dữ liệu là 1 quyển sách chuẩn là đủ để đánh giá chương trình không có lỗi.",
      "Việc tổ chức chương trình thành các mô đun giúp các thành viên trong nhóm dễ dàng phân công công việc và bảo trì mã nguồn sau này.",
    ],
    answers: [true, true, false, true], // a: Đúng, b: Đúng, c: Sai, d: Đúng
    explanation: `ĐÁP ÁN CHI TIẾT CÂU 2:
a) Đúng. Chia nhỏ chương trình thành các hàm độc lập là bản chất của thiết kế mô đun.
b) Đúng. Các mô đun độc lập cho phép lập trình và test riêng lẻ.
c) Sai. Cần test nhiều bộ dữ liệu: biên, dữ liệu rỗng, dữ liệu sai dạng...
d) Đúng. Đây là ưu điểm cốt lõi giúp phân công công việc và bảo trì.`,
  },
];
