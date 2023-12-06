import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function NavbarBot(props) {
  const currentUser = true;
  const navigate = useNavigate();
  return (
    <div className="container text-my-dark-blue">
      <footer className="footer py-5 bg-base-200 text-base-content font-poppins lg:text-lg">
        <nav>
          <header className="footer-title opacity-100">Navigasi</header>
          <a className="link link-hover" onClick={() => navigate("/")}>
            Beranda
          </a>
          <a className="link link-hover" onClick={props.onClickNav}>
            Tentang Kami
          </a>
          {currentUser ? (
            <a
              className="link link-hover"
              onClick={() => navigate("/dashboard")}
            >
              Edukasi
            </a>
          ) : (
            <a className="link link-hover" onClick={() => navigate("/signin")}>
              Login
            </a>
          )}
        </nav>
      </footer>
      <footer className="footer py-4 border-t bg-base-200 text-base-content border-base-300">
        <aside className="items-center grid-flow-col">
          <img
            src={logo}
            alt="logo sepadu"
            className="w-7 h-7 lg:w-10 lg:h-10"
          />
          <p className="lg:text-lg">
            SEPADU <br />
            Copyright © 2023
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default NavbarBot;
