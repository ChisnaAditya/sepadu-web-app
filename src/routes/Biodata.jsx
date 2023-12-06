import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/NavbarBot";
import defaultUser from "../assets/images/defaultuser.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Biodata() {
  const [data, setData] = useState([{}]);
  const navigate = useNavigate();
  const currentUser = true;
  const handleLogout = async () => {
    try {
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="h-screen flex flex-col justify-between font-poppins">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />
      <div className="bio">
        <div id="biodata" className="container flex flex-col items-center">
          <figure className="w-20 rounded-full">
            <img src={defaultUser} alt="hero" />
          </figure>
          <p>{data.nama}</p>
          <div className="flex gap-4">
          <button
            className="mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profil
          </button>
          {currentUser && (
            <button
              className="mt-4 bg-my-grey hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
          </div>
        </div>

        <div id="inputs" className="container">
          <div className="form-control w-full lg:max-w-lg">
            <label className="label">
              <span className="label-text lg:text-lg">Email</span>
            </label>
            <input
              type="text"
              value={data.email}
              className="input input-bordered w-full lg:max-w-lg"
              disabled
            />
          </div>
          <div className="form-control w-full lg:max-w-lg">
            <label className="label">
              <span className="label-text lg:text-lg">Alamat</span>
            </label>
            <input
              type="text"
              value={data.alamat}
              className="input input-bordered w-full lg:max-w-lg"
              disabled
            />
          </div>
          <div className="form-control w-full lg:max-w-lg">
            <label className="label">
              <span className="label-text lg:text-lg">No. Telepon</span>
            </label>
            <input
              type="text"
              value={data.nomor}
              className="input input-bordered w-full lg:max-w-lg"
              disabled
            />
          </div>
        </div>
      </div>
      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default Biodata;
