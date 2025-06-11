import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

// Swiper modular
import { Swiper as SwiperCore } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
SwiperCore.use([Navigation, Pagination]);

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./content.css";
import { useFetch } from "../../hooks/useFetch";
import { fetchAvailableMeals } from "../../util/http";

function Content() {
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  useEffect(() => {
    new SwiperCore(".slide-wrapper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        620: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
    });
    // Swiper cho phần đánh giá khách hàng
    new SwiperCore(".customer-feedback-swiper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,
      pagination: {
        el: ".customer-feedback-swiper .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: ".customer-feedback-swiper .swiper-button-next",
        prevEl: ".customer-feedback-swiper .swiper-button-prev",
      },
      slidesPerView: 1,
    });
  }, [meals]); // Reinitialize Swiper when meals change

  return (
    <section className="container-fluid">
      <div
        id="carouselRestaurants"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        {/* bắt đầu dot slideshow */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselRestaurants"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselRestaurants"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
        </div>
        {/* kết thúc dot slideshow */}
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/Home1_1920x960.png" className="d-block w-100" />
            <div className="overlay-dark"></div>
            <div className="text-caption">
              <h1>NHÀ HÀNG</h1>
              <h1>THỨC ĂN NGON</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/img/hamburger_1920x960.jpg" className="d-block w-100" />
            <div className="overlay-dark"></div>
            <div className="carousel-caption d-none d-md-block fs-2">
              <h2>Chese Hamburger</h2>
              <p>Very fat and delicious.</p>
            </div>
          </div>
        </div>
        {/* kết thúc ảnh và mô tả trong slideshow */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselRestaurants"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        {/* kết thúc nút điều hướng trước */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselRestaurants"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        {/* kết thúc nút điều hướng tiếp theo */}
      </div>
      {/*  Mỗi dòng là các thông tin về trang */}
      <div className="row">
        <h1
          className="text-uppercase text-center"
          style={{ margin: "6rem 0", color: "#d9e2f1" }}
        >
          {/* kiểu món ăn như: pháp,mỹ,anh,... test thử vùng slide-wrapper ở dưới với các card */}
          món ăn
        </h1>
        <div className="swiper">
          <div className="slide-wrapper">
            <div id="meals" className="swiper-wrapper">
              {isLoading && <p>Loading meals...</p>}
              {error && <p>Error: {error}</p>}
              {!isLoading &&
                !error &&
                meals.map((meal) => (
                  <div key={meal.id} className="meal-item swiper-slide">
                    <article>
                      <img
                        alt={meal.name}
                        src={`http://localhost:3000/${meal.image}`}
                      />
                      <div>
                        <h3>{meal.name}</h3>
                        <p className="meal-item-price">${meal.price}</p>
                        <p className="meal-item-description">
                          {meal.description}
                        </p>
                      </div>
                      <p className="meal-item-actions">
                        <button className="button">Add to Cart</button>
                      </p>
                    </article>
                  </div>
                ))}
            </div>

            <div className="swiper-pagination"></div>

            <div className="swiper-button-prev slide-swiper-button"></div>
            <div className="swiper-button-next slide-swiper-button"></div>
          </div>
        </div>
      </div>
      {/* dòng chứa thực đơn hôm nay
      <div className="row">
        <h1
          className="text-uppercase text-center"
          style={{ margin: "6rem 0", color: "#d9e2f1" }}
        >
          thực đơn hôm nay
        </h1>
      </div> */}

      {/* thêm các dòng bố sung,..... */}
      {/* Customer Feedback sử dụng row trong bootstrap và thay đổi thẻ đivđể hợp logic */}
      <div className="row customer-feedback-section">
        <div className="customer-feedback-container">
          <div className="customer-feedback-left">
            <h2>
              <span>Khách Hàng </span>
              <span className="feedback-highlight">Đánh Giá</span>
            </h2>
            <div className="customer-feedback-swiper">
              <div className="swiper-wrapper">
                {/* Slide 1 */}
                <div className="swiper-slide">
                  <p className="customer-feedback-text">
                    Gần đây tôi đã ăn ở đây. Chất lượng phục vụ phải gọi là hoàn
                    hảo không có gì chê và nhân viên nhiệt tình. Tuy nhiên vì
                    mặt bằng quận 1 nên giá trứng chiên hành là tận 140 000k nên
                    hơi chát nhưng không sao chúng tôi thích !!!
                  </p>
                  <div className="customer-profile">
                    <img
                      src="/img/avatar.jpg"
                      alt="Customer Avatar"
                      className="customer-avatar"
                    />
                    <div>
                      <span className="customer-name">Tayyab Sohail</span>
                      <div className="customer-role">Khách vãng lai</div>
                    </div>
                  </div>
                </div>
                {/* Slide 2 */}
                <div className="swiper-slide">
                  <p className="customer-feedback-text">
                    Đồ ăn rất ngon, phục vụ nhanh chóng, nhân viên thân thiện.
                    Sẽ quay lại lần sau!
                  </p>
                  <div className="customer-profile">
                    <img
                      src="/img/avatar.jpg"
                      alt="Customer Avatar"
                      className="customer-avatar"
                    />
                    <div>
                      <span className="customer-name">Nguyễn Văn A</span>
                      <div className="customer-role">Khách ruột</div>
                    </div>
                  </div>
                </div>
                {/* Slide 3 */}
                <div className="swiper-slide">
                  <p className="customer-feedback-text">
                    Không gian đẹp, món ăn đa dạng, giá cả hợp lý. Rất hài lòng
                    với trải nghiệm tại đây.
                  </p>
                  <div className="customer-profile">
                    <img
                      src="/img/avatar.jpg"
                      alt="Customer Avatar"
                      className="customer-avatar"
                    />
                    <div>
                      <span className="customer-name">Trần Thị B</span>
                      <div className="customer-role">Food Blogger</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About Us */}
      <div className="row about-us-section" id="about">
        <div className="about-us-container">
          <div className="about-us-title">Về chúng tôi</div>
          <div className="about-us-grid">
            <div className="about-us-card">
              <div className="about-us-img">
                <img src="../../public/img/food.jpg" alt="food" />
              </div>
              <div className="about-us-card-title">Câu chuyện doanh nghiệp</div>
              <div className="about-us-card-name">Anna Lê</div>
              <a href="/aboutus/1" className="about-us-arrow">
                →
              </a>
            </div>

            <div className="about-us-card">
              <div className="about-us-img">
                <img src="../../public/img/ingredients.jpg" alt="ingredients" />
              </div>
              <div className="about-us-card-title">Câu chuyện nguyên liệu</div>
              <div className="about-us-card-name">Do Anh Khoa </div>
              <a href="/aboutus/2" className="about-us-arrow">
                →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
