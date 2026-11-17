# PHÚ GIA — Giao diện website đồ thờ & tượng thờ

Bản giao diện mẫu chạy độc lập bằng HTML, CSS và JavaScript thuần, không cần cài thư viện.

## Chạy thử

1. Giải nén thư mục.
2. Mở `index.html` bằng trình duyệt, hoặc chạy máy chủ tĩnh trong thư mục này:

   ```bash
   python3 -m http.server 8080
   ```

3. Truy cập `http://localhost:8080`.

## Thành phần đã dựng

- Trang chủ theo tông đỏ đô, kem ngà, nâu gỗ và vàng đồng.
- Mega menu hiển thị nhiều nhóm sản phẩm trong cùng một mặt phẳng, hạn chế phân cấp.
- Bố cục responsive cho máy tính bảng và điện thoại.
- Tìm kiếm mẫu theo tên/nhóm sản phẩm.
- Lọc sản phẩm theo nhóm.
- Danh sách quan tâm dạng giỏ hàng, có thể thêm và xóa sản phẩm.

## Trước khi đưa lên website thật

- Thay số hotline, email và địa chỉ mẫu trong `index.html`.
- Thay ảnh minh họa đang lấy từ các địa chỉ ảnh bên ngoài bằng ảnh sản phẩm/ảnh xưởng do Phú Gia sở hữu.
- Cập nhật tên sản phẩm, mã sản phẩm, giá, mô tả và danh mục theo dữ liệu thực tế.
- Kết nối biểu mẫu/giỏ hàng với hệ thống quản trị, lưu đơn hàng và kênh liên hệ thật. Bản hiện tại là giao diện trình diễn phía trình duyệt, chưa có máy chủ hay cơ sở dữ liệu.

## Cấu trúc

- `index.html` — cấu trúc trang.
- `styles.css` — phong cách và bố cục responsive.
- `script.js` — mega menu, tìm kiếm, lọc và giỏ hàng mẫu.
