export default {};
//   scrollBehavior(to: any, from: any, savedPosition: any) {
//     if (savedPosition) {
//       return savedPosition;
//     }

//     if (to.hash) {
//       // 1. Lấy hash: ví dụ: #phần-giới-thiệu/2025
//       const hash = to.hash;

//       // 2. Loại bỏ dấu # ban đầu
//       const id = hash.substring(1);

//       // 3. MÃ HÓA ID: Sử dụng CSS.escape để xử lý ký tự đặc biệt
//       // Hàm này sẽ chuyển đổi ký tự đặt biệt thành chuỗi hợp lệ
//       const escapedId = CSS.escape(id);
//       console.log(escapedId);
//       // 4. Tạo lại selector: #<ID đã mã hóa>
//       const selector = `#${escapedId}`;

//       // Đợi một chút để DOM ổn định
//       return new Promise((resolve) => {
//         setTimeout(() => {
//           resolve({
//             el: selector, // Truyền selector đã được mã hóa
//             behavior: 'smooth',
//           });
//         }, 150);
//       });
//     }

//     return { left: 0, top: 0 };
//   },
// };
