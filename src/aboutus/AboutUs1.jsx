import "../Components/content/content.css";

export default function AboutUs1() {
  return (
    <>
      
      <section className="container-fluid bg-light py-5 d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="bg-white rounded-4 shadow p-4 p-md-5 text-center" style={{ maxWidth: 960 }}>
          <h1 className="text-danger fw-bold mb-4 fs-2 fs-md-1">Câu chuyện doanh nghiệp</h1>

          <div className="mb-4 mx-auto" style={{ maxWidth: 420 }}>
            <img
              src="/img/food.jpg"
              alt="Câu chuyện doanh nghiệp"
              className="img-fluid rounded-3 shadow-sm"
              style={{ transition: "transform 0.3s ease-in-out" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          <p className="lead text-muted px-2 px-md-5 fs-2 fw-bold ">
            Nhà hàng của chúng tôi bắt đầu từ một niềm đam mê với ẩm thực và mong muốn mang đến cho khách hàng những trải nghiệm tuyệt vời nhất.
            Từ những ngày đầu tiên, chúng tôi luôn chú trọng vào chất lượng nguyên liệu, sự sáng tạo trong từng món ăn và dịch vụ tận tâm.
            Câu chuyện doanh nghiệp của chúng tôi là hành trình không ngừng đổi mới, phát triển và gắn kết với cộng đồng thực khách thân yêu.
          </p>
        </div>
      </section>
    </>
  );
}
