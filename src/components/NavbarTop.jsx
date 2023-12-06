import { useNavigate } from "react-router-dom";
import defaultUser from "../assets/images/defaultuser.jpeg";
import logo from "../assets/images/logo.png";

function NavbarTop(props) {
  const navigate = useNavigate();
  const currentUser = true;
  const adminUser = "nBrob4xDTDgQPUAQpEFVponitWj2";

  const handleLoginUser = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <div className={`navbar bg-base-100 lg:hidden ${props.bgNavbar}`}>
        <div
          className="flex-1 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="logo sepadu" className="w-6 h-6" />
          <p className={`text-lg p-0 text-my-light-blue ${props.logoColor}`}>
            SEPADU
          </p>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <button className={`btn btn-square btn-ghost text-my-dark-blue ${props.logoColor}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white text-my-dark-blue rounded-box w-52"
            >
              {adminUser === import.meta.env.VITE_ADMIN_UID && (
                <li className="rounded-box hover:bg-my-light-blue">
                  <a
                    className="justify-between"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </a>
                </li>
              )}
              <li className="rounded-box hover:bg-my-light-blue">
                <a
                  className="justify-between"
                  onClick={() => navigate("/biodata")}
                >
                  Profile
                </a>
              </li>
              <li className="rounded-box hover:bg-my-light-blue">
                {currentUser ? (
                  <a onClick={() => navigate("/dashboard")}>Edukasi</a>
                ) : (
                  <a onClick={() => navigate("/signin")}>Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`navbar hidden lg:flex lg:justify-between lg:items-center lg:px-10 ${props.bgNavbar}`}
      >
        <div className="flex">
          <div
            className="navbar-center cursor-pointer flex items-center"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={logo} alt="logo sepadu" className="w-10 h-10" />
            <p className={`text-2xl p-0 text-my-light-blue ${props.logoColor}`}>
              SEPADU
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <ul
            className={`menu menu-horizontal px-1 text-xl text-my-dark-blue ${props.textLink}`}
          >
            <li
              onClick={() => navigate("/")}
              className="hover:text-my-light-blue"
            >
              <a>Beranda</a>
            </li>
            <li>
              <p>|</p>
            </li>
            <li onClick={props.onClickNav} className="hover:text-my-light-blue">
              <a>Tentang Kami</a>
            </li>
            <li>
              <p>|</p>
            </li>
            <li className="hover:text-my-light-blue">
              {currentUser ? (
                <a onClick={() => navigate("/dashboard")}>Edukasi</a>
              ) : (
                <a onClick={() => navigate("/signin")}>Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarTop;
