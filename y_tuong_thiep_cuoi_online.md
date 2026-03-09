# Ý tưởng Thiệp Cưới Online 💍

## 1. Concept tổng thể

Thiệp cưới online nên giống một **mini landing page kể chuyện tình yêu**
thay vì chỉ là trang thông tin.

### Flow trải nghiệm

1.  **Trang mở đầu**
    -   Animation mở thiệp
    -   Nhạc nền nhẹ
    -   Hiệu ứng hoa rơi / ánh sáng
2.  **Câu chuyện tình yêu**
    -   Timeline từ lúc gặp → yêu → cầu hôn
3.  **Ảnh cưới**
    -   Gallery ảnh với hiệu ứng đẹp
4.  **Thông tin lễ cưới**
    -   Ngày giờ
    -   Địa điểm
    -   Google Maps
5.  **Đếm ngược ngày cưới**
    -   Countdown timer
6.  **Xác nhận tham dự**
    -   Form RSVP
7.  **Gửi lời chúc**
    -   Guestbook cho khách mời

------------------------------------------------------------------------

# 2. Công nghệ Frontend

## Framework chính

**Next.js**

Lý do: - SEO tốt - Tối ưu hiệu suất - Dễ deploy - Phù hợp làm landing
page đẹp

### Stack gợi ý

    Next.js
    TailwindCSS
    Framer Motion
    Three.js

------------------------------------------------------------------------

# 3. Thư viện Animation

## Framer Motion

Dùng cho animation UI:

Ví dụ: - Text fade in - Slide animation - Stagger animation - Zoom
effect

------------------------------------------------------------------------

## Three.js

Dùng để tạo hiệu ứng 3D:

Ví dụ: - Hoa rơi - Trái tim bay - Particle background - Ánh sáng lung
linh

------------------------------------------------------------------------

## GSAP

Tạo **scroll animation** mạnh mẽ:

Ví dụ: - Scroll xuống ảnh cưới xuất hiện - Timeline story animation -
Parallax effect

------------------------------------------------------------------------

# 4. Gallery ảnh cưới

Dùng thư viện:

**Swiper.js**

Hiệu ứng:

    coverflow
    card stack
    fade
    zoom

------------------------------------------------------------------------

# 5. Nhạc nền và hiệu ứng mở thiệp

Ví dụ trải nghiệm:

    Click mở phong bì
    → Thiệp mở ra
    → Nhạc cưới bắt đầu

Có thể thêm: - Ribbon animation - Phong bì mở - Light sparkle

------------------------------------------------------------------------

# 6. Các tính năng nên có

## Countdown ngày cưới

    23 ngày
    12 giờ
    30 phút

------------------------------------------------------------------------

## Bản đồ

Nhúng Google Maps để hiển thị địa điểm tổ chức lễ cưới.

------------------------------------------------------------------------

## Guestbook

Khách có thể để lại lời chúc:

    Chúc cô dâu chú rể trăm năm hạnh phúc

------------------------------------------------------------------------

## RSVP

Form xác nhận tham dự:

    Tên
    Có tham dự không
    Số người tham dự

------------------------------------------------------------------------

# 7. Hiệu ứng đẹp nên thêm

-   Hoa rơi (Sakura)
-   Trái tim bay
-   Parallax ảnh
-   Video background
-   Particle background

Ví dụ:

    video cưới slow motion
    text fade in

------------------------------------------------------------------------

# 8. Backend (nếu cần)

Nếu có form RSVP hoặc Guestbook.

### Option 1

    Spring Boot
    PostgreSQL

### Option 2 (nhanh hơn)

    Firebase
    Supabase

------------------------------------------------------------------------

# 9. Deploy

Có thể deploy miễn phí:

-   Vercel
-   Cloudflare Pages

Ví dụ domain:

    wedding.tencodau-tenchure.com

------------------------------------------------------------------------

# 10. Ý tưởng nâng cấp (viral)

### Story dạng Instagram

Timeline giống story mạng xã hội.

### AI tạo lời chúc

Khách nhập tên → hệ thống tự tạo lời chúc.

### Thiệp cưới AR

Scan QR → hiện thiệp 3D.

------------------------------------------------------------------------

# 11. Kiến trúc project

    /app
      /components
        Hero
        LoveStory
        Gallery
        Countdown
        RSVP
        Guestbook

------------------------------------------------------------------------

# 12. Flow landing page gợi ý

### Landing

    Full screen video
    Text fade in
    Heart particles

### Scroll section

    Love story timeline

### Gallery

    Photo gallery slider

### Kết thúc

    Countdown + RSVP
