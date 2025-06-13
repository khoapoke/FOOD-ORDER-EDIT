import "../Components/content/content.css";

export default function AboutUs2() {
  return (
    <>
      <section
        className="container-fluid bg-light py-5 d-flex align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <div
          className="bg-white rounded-4 shadow p-4 p-md-5 text-center"
          style={{ maxWidth: 960 }}
        >
          <h1 className="text-danger fw-bold mb-4 fs-2 fs-md-1">
            Câu chuyện nguyên liệu
          </h1>

          <div className="mb-4 mx-auto" style={{ maxWidth: 420 }}>
            <img
              src="/img/food.jpg"
              alt="Câu chuyện nguyên liệu"
              className="img-fluid rounded-3 shadow-sm"
              style={{ transition: "transform 0.3s ease-in-out" }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>

          <p className="lead text-muted px-2 px-md-5 fs-2 fw-bold ">
            Chúng tôi tin rằng nguyên liệu tươi ngon là nền tảng của mọi món ăn
            tuyệt vời. Tất cả nguyên liệu đều được lựa chọn kỹ lưỡng từ các nhà
            cung cấp uy tín, đảm bảo nguồn gốc rõ ràng và chất lượng cao nhất.
            Câu chuyện nguyên liệu là hành trình tìm kiếm, kiểm soát và sáng tạo
            để mỗi món ăn đều giữ trọn hương vị tự nhiên và an toàn cho sức khỏe
            thực khách.
          </p>
        </div>
      </section>
    </>
  );
}
