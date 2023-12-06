import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo.png";
// import login from "../services/auth.service.js";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post("http://dev-api.sepadu.id/api/auth/signin", data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.data.accessToken);
        localStorage.setItem("roles", res.data.data.roles);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleHidePass = () => {
    const x = document.getElementById("input-pass");
    x.type === "password" ? (x.type = "text") : (x.type = "password");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <>
      <section className="font-poppins h-screen flex flex-col md:flex justify-center space-y-10 md:space-y-0 md:space-x-20 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div
          className="md:hidden max-w-sm flex flex-col items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Sample image" />
          <p className="text-my-dark-blue">SEPADU</p>
        </div>
        <h1 className="text-2xl font-bold text-my-dark-blue pb-5">
          SELAMAT DATANG
        </h1>
        <form
          className="md:w-1/3 md:p-10 w-full md:shadow-black md:shadow-2xl rounded-3xl"
          onSubmit={handleLogin}
        >
          <label
            htmlFor="input-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Email
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              type="email"
              id="input-email"
              className="text-sm w-full px-4 py-2 ps-10 text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Email"
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              required
            />
          </div>

          <label
            htmlFor="input-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Password
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={faLock} />
            </div>
            <input
              type="password"
              id="input-pass"
              className="w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              required
            />
          </div>
          <p
            className="text-my-dark-blue text-sm text-center cursor-pointer"
            onClick={handleHidePass}
          >
            Show Password
          </p>
          {error && (
            <p className="text-red-500 text-sm text-center">
              Email atau Password Salah
            </p>
          )}
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Selalu Ingat Password</span>
            </label>
            <a
              className="text-my-dark-blue hover:text-my-light-blue hover:underline hover:underline-offset-4"
              onClick={() => navigate("/lupa")}
            >
              Lupa Password?
            </a>
          </div>
          <div className="text-center">
            <button
              className="w-full mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white font-bold uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Belum Punya Akun?{" "}
            <a
              className="text-my-dark-blue hover:text-my-light-blue hover:underline hover:underline-offset-4"
              onClick={() => navigate("/signup")}
            >
              Daftar
            </a>
          </div>
        </form>
      </section>
    </>
  );
}

export default SignIn;
