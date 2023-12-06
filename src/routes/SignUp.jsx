import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/signup-hero.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faHome,
  faPhone,
  faLock,
  faVenus,
  faMars,
} from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [alamat, setAlamat] = useState("");
  const [nomor, setNomor] = useState(0);
  const [gender, setGender] = useState("Laki-Laki");
  const [password, setPassword] = useState("");
  const [passwordHint, setPasswordHint] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      alert("berhasil daftar");
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="font-poppins w-full h-screen flex flex-col items-center md:grid md:grid-cols-2 md:justify-center">
      
      <img src={logo} alt="Sample image" className="w-1/2 md:w-fit"/>

      <div className="container w-full">
        <h1 className="text-2xl font-bold text-my-purple font-gotham">
          DAFTAR KE SEPADU
        </h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="input-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Nama
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <input
              type="text"
              id="input-email"
              className="text-sm w-full px-4 py-2 ps-10 text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Nama Lengkap"
              onChange={(e) => setNama(e.target.value)}
              required
            />
          </div>

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
              className="w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Email Aktif"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label
            htmlFor="input-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Alamat
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={faHome} />
            </div>
            <input
              type="text"
              id="input-email"
              className="text-sm w-full px-4 py-2 ps-10 text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Alamat Lengkap"
              onChange={(e) => setAlamat(e.target.value)}
              required
            />
          </div>

          <label
            htmlFor="input-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Nomor
          </label>
          <div className="relative mb-2">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <input
              type="text"
              id="input-email"
              className="w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Nomor Telepon"
              onChange={(e) => setNomor(e.target.value)}
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
              id="input-email"
              className="w-full p-3 ps-10 text-sm text-gray-900 border rounded-lg focus:border-my-dark-blue focus:border-none"
              placeholder="Masukkan Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <ul className="grid w-full gap-2 md:grid-cols-2">
            <li>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="Laki-Laki"
                className="hidden peer"
                checked={gender === "Laki-Laki"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label
                htmlFor="hosting-small"
                className="inline-flex items-center justify-between w-full p-2 text-gray-500 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="block">
                  <div className="w-full text-sm font-semibold">Laki-Laki</div>
                </div>
                <FontAwesomeIcon icon={faMars} />
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="Perempuan"
                className="hidden peer"
                checked={gender === "Perempuan"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label
                htmlFor="hosting-big"
                className="inline-flex items-center justify-between w-full p-2 text-gray-500 border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
              >
                <div className="block">
                  <div className="w-full text-sm font-semibold">Perempuan</div>
                </div>
                <FontAwesomeIcon icon={faVenus} />
              </label>
            </li>
          </ul>

          <div className="text-center md:text-left">
            <button
              className="mt-4 w-full bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Daftar
            </button>
          </div>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Sudah Punya Akun?{" "}
            <a
              className="text-my-dark-blue hover:text-my-light-blue hover:underline hover:underline-offset-4"
              onClick={() => navigate("/signin")}
            >
              Masuk
            </a>
          </div>
        </form>
      </div>

    </div>
  );
}

export default SignUp;
