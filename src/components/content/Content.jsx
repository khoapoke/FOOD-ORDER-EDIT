import { useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { fetchAvailableMeals } from "../../util/http";
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

function Content() {
  const { data: meals, isLoading, error } = useFetch(fetchAvailableMeals, []);
  useEffect(() => {
    new SwiperCore(".slide-wrapper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 20,

      // If we need pagination
      pagination: {
        el: " .swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation arrows
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
    new SwiperCore(".customer-feedback-swiper", {
      loop: true,
      grabCursor: true,

      slidesPerView: 1,
    });
  }, [meals]);

  return (
    <section className="container-fluid">
      <div
        id="carouselRestaurants"
        className="carousel slide"
        data-bs-ride="carousel"
      >
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
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/img/Home1_1920x960.png" className="d-block w-100" />
            <div className="overlay-dark"></div>
            <div className="text-caption">
              <h1>RESTAURANT</h1>
              <h1>DELICIOUS FOOD</h1>
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
      </div>

      <div className="row">
        <h1
          className="text-uppercase text-center"
          style={{ margin: "6rem 0", color: "#d9e2f1" }}
        >
          danh mục nổi bật
        </h1>
        {isLoading && (
          <h1 className="text-uppercase text-center" style={{ color: "green" }}>
            Loading......
          </h1>
        )}
        {error && (
          <h1 className="text-uppercase text-center" style={{ color: "red" }}>
            {error}
          </h1>
        )}
        <div className="swiper">
          <div className="slide-wrapper">
            <div id="meals" className="swiper-wrapper">
              {!isLoading &&
                !error &&
                Array.isArray(meals) &&
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
              {/* <div className="meal-item swiper-slide">
                <article>
                  <img alt="Ma Cheese" src="/img/seafood-paella.jpg" />
                  <div>
                    <h3>Mac Cheese</h3>
                    <p className="meal-item-price">$8.99</p>
                    <p className="meal-item-description">
                      Creamy cheddar cheese mixed with perfectly cooked
                      macaroni, topped with crispy breadcrumbs. A classNameic
                      comfort food.
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </p>
                </article>
              </div>
              <div className="meal-item swiper-slide">
                <article>
                  <img alt="Ma Cheese" src="/img/spaghetti-carbonara.jpg" />
                  <div>
                    <h3>Mac Cheese</h3>
                    <p className="meal-item-price">$8.99</p>
                    <p className="meal-item-description">
                      Creamy cheddar cheese mixed with perfectly cooked
                      macaroni, topped with crispy breadcrumbs. A classNameic
                      comfort food.
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </p>
                </article>
              </div>
              <div className="meal-item swiper-slide">
                <article>
                  <img alt="Ma Cheese" src="/img/vegan-buddha-bowl.jpg" />
                  <div>
                    <h3>Mac Cheese</h3>
                    <p className="meal-item-price">$8.99</p>
                    <p className="meal-item-description">
                      Creamy cheddar cheese mixed with perfectly cooked
                      macaroni, topped with crispy breadcrumbs. A classNameic
                      comfort food.
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </p>
                </article>
              </div>
              <div className="meal-item swiper-slide">
                <article>
                  <img alt="Ma Cheese" src="/img/sushi-roll-platter.jpg" />
                  <div>
                    <h3>Mac Cheese</h3>
                    <p className="meal-item-price">$8.99</p>
                    <p className="meal-item-description">
                      Creamy cheddar cheese mixed with perfectly cooked
                      macaroni, topped with crispy breadcrumbs. A classNameic
                      comfort food.
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </p>
                </article>
              </div>
              <div className="meal-item swiper-slide">
                <article>
                  <img alt="Ma Cheese" src="/img/veggie-burger.jpg" />
                  <div>
                    <h3>Mac Cheese</h3>
                    <p className="meal-item-price">$8.99</p>
                    <p className="meal-item-description">
                      Creamy cheddar cheese mixed with perfectly cooked
                      macaroni, topped with crispy breadcrumbs. A classNameic
                      comfort food.
                    </p>
                  </div>
                  <p className="meal-item-actions">
                    <button className="button">Add to Cart</button>
                  </p>
                </article>
              </div> */}
            </div>

            <div className="swiper-pagination-customer"></div>

            <div className="swiper-button-prev slide-swiper-button"></div>
            <div className="swiper-button-next slide-swiper-button"></div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="row about-us-section" id="about">
        <div className="about-us-container">
          <div className="about-us-title">Về chúng tôi</div>
          <div className="about-us-grid">
            <div className="about-us-card">
              <div className="about-us-img">
                <img src="/img/food.jpg" alt="food" />
              </div>
              <div className="about-us-card-title">Câu chuyện doanh nghiệp</div>
              <div className="about-us-card-name">Anna Lê</div>
              <a href="/aboutus/1" className="about-us-arrow">
                →
              </a>
            </div>

            <div className="about-us-card">
              <div className="about-us-img">
                <img src="/img/ingredients.jpg" alt="ingredients" />
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
      {/* customer feedback */}
      <div className="row customer-feedback">
        <div className="customer-feedback-container">
          <h2>
            <span style={{ color: "#fff" }}>Khách Hàng </span>
            <span className="feedback-highlight">Đánh Giá</span>
          </h2>
          <div className="customer-feedback-swiper">
            <div className="swiper-wrapper">
              {/* Slide 1 */}
              <div className="swiper-slide">
                <div className="review-card">
                  <div className="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star empty">★</span>
                  </div>
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
              </div>
              {/* Slide 2 */}
              <div className="swiper-slide">
                <div className="review-card">
                  <div className="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>

                    <span className="star">★</span>
                  </div>
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
                      <span className="customer-name">Nguyễn Văn A</span>
                      <div className="customer-role">Khách ruột</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Slide 3 */}
              <div className="swiper-slide">
                <div className="review-card">
                  <div className="rating">
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                    <span className="star">★</span>
                  </div>
                  <p className="customer-feedback-text">
                    Đồ ăn rất ngon, phục vụ nhanh chóng, nhân viên thân thiện.
                    sẽ quay lại lần sau!
                  </p>
                  <div className="customer-profile">
                    <img
                      src="/img/avatar.jpg"
                      alt="Customer Avatar"
                      className="customer-avatar"
                    />
                    <div>
                      <span className="customer-name">Lê thị bưởi</span>
                      <div className="customer-role">Food blogger</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Race */}
      <div className="row" style={{ padding: "0 10rem" }}>
        <div className="stats-section">
          <h3 style={{ color: "#fff", marginBottom: "10px" }}>
            Thống Kê Đánh Giá
          </h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Điểm trung bình</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1,247</div>
              <div className="stat-label">Lượt đánh giá</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Khách hài lòng</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">Năm phục vụ</div>
            </div>
          </div>
          <button className="view-all-btn">Xem Thêm Đánh Giá</button>
        </div>
      </div>
      {/* Chef -introduce */}
      <div className="row mt-5">
        <div className="chef-container">
          <div className="section-title">
            <h2>Đội Ngũ Bếp Trưởng</h2>
            <p className="section-subtitle">
              Những bàn tay vàng tạo nên hương vị đặc biệt
            </p>
          </div>

          <div className="main-chef">
            <div className="chef-content">
              <div className="chef-image">
                <img
                  src="/img/chef.jpg"
                  alt="Head Chef"
                  className="chef-avatar"
                />
                <div className="chef-badge">👑 Head Chef</div>
              </div>
              <div className="chef-info">
                <h3>
                  Chef Marco Antonio <span className="crown-icon">👑</span>
                </h3>
                <div className="chef-title">Bếp Trưởng & Sáng Lập Viên</div>
                <p className="chef-description">
                  Với hơn 15 năm kinh nghiệm trong ngành ẩm thực quốc tế, Chef
                  Marco đã từng làm việc tại các nhà hàng 5 sao ở Ý, Pháp và
                  Việt Nam. Ông là người đã tạo ra những công thức độc đáo, kết
                  hợp tinh tế giữa hương vị châu Âu và châu Á, mang đến trải
                  nghiệm ẩm thực không thể quên.
                </p>
                <div className="chef-stats">
                  <div className="stat-item">
                    <span className="stat-number">15+</span>
                    <div className="stat-label">Năm kinh nghiệm</div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">200+</span>
                    <div className="stat-label">Món ăn sáng tạo</div>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5</span>
                    <div className="stat-label">Giải thưởng</div>
                  </div>
                </div>
                <div className="chef-specialties">
                  <span className="specialty-tag">🍝 Pasta Ý</span>
                  <span className="specialty-tag">🍕 Pizza Thủ Công</span>
                  <span className="specialty-tag">🥘 Fusion Cuisine</span>
                  <span className="specialty-tag">🍤 Hải Sản</span>
                </div>
              </div>
            </div>
          </div>

          <div className="team-chefs">
            <h3 className="team-title">Đội Ngũ Bếp Phó</h3>
            <div className="team-grid">
              <div className="team-card">
                <img
                  src="/img/chef.jpg"
                  alt="Sous Chef"
                  className="team-avatar"
                />
                <h4 className="team-name">Chef Nguyễn Minh</h4>
                <div className="team-role">Bếp Phó - Chuyên Món Á</div>
                <p className="team-description">
                  Chuyên gia về các món ăn châu Á với 8 năm kinh nghiệm. Đặc
                  biệt giỏi trong việc chế biến các món Việt Nam hiện đại.
                </p>
              </div>

              <div className="team-card">
                <img
                  src="/img/chef.jpg"
                  alt="Pastry Chef"
                  className="team-avatar"
                />
                <h4 className="team-name">Chef Sarah Johnson</h4>
                <div className="team-role">Bếp Trưởng Bánh Ngọt</div>
                <p className="team-description">
                  Tốt nghiệp Le Cordon Bleu Paris, chuyên về bánh ngọt Pháp và
                  các món tráng miệng sáng tạo độc đáo.
                </p>
              </div>

              <div className="team-card">
                <img
                  src="/img/chef.jpg"
                  alt="Grill Chef"
                  className="team-avatar"
                />
                <h4 className="team-name">Chef David Kim</h4>
                <div className="team-role">Chuyên Gia Nướng</div>
                <p className="team-description">
                  Bậc thầy trong việc nướng thịt và hải sản, với kỹ thuật nướng
                  than hồng truyền thống kết hợp hiện đại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Content;
