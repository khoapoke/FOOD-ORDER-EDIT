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
  const {data:meals,isLoading,error} = useFetch(fetchAvailableMeals,[]);
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
              {!isLoading && !error && meals.map((meal) => (
                <div key={meal.id} className="meal-item swiper-slide">
                  <article>
                    <img alt={meal.name}src={`http://localhost:3000/${meal.image}`} />
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
      {/* dòng chứa thực đơn hôm nay */}
      <div className="row">
        <h1
          className="text-uppercase text-center"
          style={{ margin: "6rem 0", color: "#d9e2f1" }}
        >
          thực đơn hôm nay
        </h1>
      </div>

      {/* thêm các dòng bố sung,..... */}
    </section>
  );
}

export default Content;
