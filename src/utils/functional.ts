const functional = {
  formatVND: (amount: number): string => {
    // Kiểm tra nếu amount không phải là số hoặc undefined thì trả về "0 đ"
    if (isNaN(amount) || amount === undefined || amount === null) {
      return "0 đ";
    }

    // Chuyển số thành chuỗi với dấu phân cách hàng nghìn
    const formattedAmount = amount.toLocaleString("vi-VN", {
      style: "decimal", // Định dạng số thập phân
      minimumFractionDigits: 0, // Không hiển thị phần thập phân
    });

    // Thêm đơn vị "đ" vào cuối chuỗi
    return `${formattedAmount} đ`;
  },

  formatUSD: (amount: number): string => {
    if (isNaN(amount) || amount === undefined || amount === null) {
      return "$0";
    }

    const formattedAmount = amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });

    return formattedAmount;
  },
};

export default functional;