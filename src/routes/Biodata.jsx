import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/NavbarBot";
import defaultUser from "../assets/images/defaultuser.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Biodata() {
  const [data, setDataUser] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      const url = "https://dev-api.sepadu.id//api/user/get-profile";
      axios.get(url, { headers: { "x-access-token": token } }).then((res) => {
        setDataUser(res.data.data);
      });
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col justify-between font-poppins">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />
      {data?.length === 0 ? (
        <div className="flex gap-4 items-center justify-center h-[100vh]">
          Loading<span className="loading loading-dots loading-md"></span>
        </div>
      ) : (
        <div className="bio">
          <div id="biodata" className="container flex flex-col items-center">
            <figure className="w-20 rounded-full">
              <img src={data.profile_photo} alt="profile image" />
            </figure>
            <p className="font-bold text-lg">{data.full_name}</p>
            <div className="flex gap-4">
              <button
                className="mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                onClick={() => navigate("/editprofile")}
              >
                Edit Profil
              </button>
              {token && (
                <button
                  className="mt-4 bg-my-grey hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
              {data.roles[0] === "ROLE_admin" && (
                <button
                  className="mt-4 bg-my-light-blue hover:bg-my-dark-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  onClick={() => navigate("/admin")}
                >
                  Admin
                </button>
              )}
            </div>
          </div>

          <div id="inputs" className="container"> {console.log(data)}
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
                value={data.address}
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
                value={data.phone}
                className="input input-bordered w-full lg:max-w-lg"
                disabled
              />
            </div>
          </div>
        </div>
      )}

      {/* <div className="bio">
        <div id="biodata" className="container flex flex-col items-center">
          <figure className="w-20 rounded-full">
            <img src={defaultUser} alt="hero" />
          </figure>
          <p>{data.full_name}</p>
          <div className="flex gap-4">
            <button
              className="mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              onClick={() => navigate("/editprofile")}
            >
              Edit Profil
            </button>
            {token && (
              <button
                className="mt-4 bg-my-grey hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                onClick={handleLogout}
              >
                Logout
              </button>
            )}
            {data.roles[0] === "ROLE_admin" && (
              <button
                className="mt-4 bg-my-light-blue hover:bg-my-dark-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                onClick={() => navigate("/admin")}
              >
                Admin
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
              value={data.address}
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
              value={data.phone}
              className="input input-bordered w-full lg:max-w-lg"
              disabled
            />
          </div>
        </div>
      </div> */}

      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default Biodata;
