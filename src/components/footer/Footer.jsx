import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../footer/footer.css";

function Footer() {
  return (
    <footer className="container-fluid p-4 text-white text-center text-lg-start">
      <div className="row mt-4">
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5 className="footer-heading">FOOD RESTAURANT</h5>

          <p className="footer-text">
            Cửa hàng đồ ăn nhanh với những món ăn ngon và chất lượng. Ngoài ra chúng tôi còn rất tự hào vì những nguyên liệu được chuẩn bị kĩ lưỡng và chu đáo.
          </p>

          <p className="footer-text">
            Khách hàng luôn là trên hết vì thế chúng tôi luôn hết lòng vì khách hàng
          </p>

          <div className="mt-4 list-icons">
            <a
              className="btn btn-floating btn-light btn-lg circle-icon"
              href="#"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg circle-icon"
              href="#"
              aria-label="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg circle-icon"
              href="#"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg circle-icon"
              href="#"
              aria-label="Google Plus"
            >
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="footer-heading ">Tìm kiếm</h5>

          <div className="form-outline form-white mb-4">
            <input
              type="text"
              id="formControlLg"
              className="form-control form-control-lg search-input"
              placeholder="Nhập tên món ăn..."
            />
          </div>

          <div className="contact-info">
            <div className="contact-item">
              <i className="fas fa-home contact-icon"></i>
              <span>Warsaw, 00-967, Poland</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              <span>contact@example.com</span>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone contact-icon"></i>
              <span>+48 567 88</span>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="footer-heading">Opening hours</h5>

          <table className="table text-center text-white hours-table">
            <tbody className="fw-normal">
              <tr>
                <td>Mon - Thu:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Fri - Sat:</td>
                <td>8am - 1am</td>
              </tr>
              <tr>
                <td>Sunday:</td>
                <td>9am - 10pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center p-3 copyright">
        © {new Date().getFullYear()} Copyright:
        <a href="#"> RESTAURANT</a>
      </div>
    </footer>
  );
}

export default Footer;
