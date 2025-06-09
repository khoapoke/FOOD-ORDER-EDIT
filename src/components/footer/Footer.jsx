import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "../footer/footer.css";
function Footer() {
  return (
    <footer className="container-fluid p-4 text-white text-center text-lg-start bg-dark">
      <div className="row mt-4">
        <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4">FOOD RESTAURANT</h5>

          <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti.
          </p>

          <p>
            Blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias.
          </p>

          <div className="mt-4 list-icons">
            <a
              className="btn btn-floating btn-light btn-lg bg-primary text-white circle-icon"
              href="#"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg bg-secondary text-white circle-icon"
              href="#"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg bg-info text-white circle-icon"
              href="#"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="btn btn-floating btn-light btn-lg bg-danger text-white circle-icon"
              href="#"
            >
              <i className="fab fa-google-plus-g"></i>
            </a>
          </div>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4 pb-1">Search something</h5>

          <div className="form-outline form-white mb-4">
            <input
              type="text"
              id="formControlLg"
              className="form-control form-control-lg"
            />
            <label className="form-label" for="formControlLg">
              Search
            </label>
          </div>

          <ul className="fa-ul" style={{ marginLeft: "1.65rem" }}>
            <li className="mb-3">
              <span className="fa-li">
                <i className="fas fa-home"></i>
              </span>
              <span className="ms-2">Warsaw, 00-967, Poland</span>
            </li>
            <li className="mb-3">
              <span className="fa-li">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="ms-2">contact@example.com</span>
            </li>
            <li className="mb-3">
              <span className="fa-li">
                <i className="fas fa-phone"></i>
              </span>
              <span className="ms-2">+48 567 88</span>
            </li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
          <h5 className="text-uppercase mb-4">Opening hours</h5>

          <table className="table text-center text-white">
            <tbody className="fw-normal">
              <tr>
                <td className="bg-dark text-white">Mon - Thu:</td>
                <td className="bg-dark text-white">8am - 9pm</td>
              </tr>
              <tr>
                <td className="bg-dark text-white">Fri - Sat:</td>
                <td className="bg-dark text-white">8am - 1am</td>
              </tr>
              <tr>
                <td className="bg-dark text-white">Sunday:</td>
                <td className="bg-dark text-white">9am - 10pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
      >
        © 2020 Copyright:
        <a className="text-white" href="#">
          RESTAURANT
        </a>
      </div>
    </footer>
  );
}

export default Footer;
