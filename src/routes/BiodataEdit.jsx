import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/NavbarBot";
import defaultUser from "../assets/images/defaultuser.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function BiodataEdit() {
  const [dataUser, setDataUser] = useState("");
  const [profileBaru, setProfileBaru] = useState("");
  const [namaBaru, setNamaBaru] = useState("");
  const [alamatBaru, setAlamatBaru] = useState("");
  const [nomorBaru, setNomorBaru] = useState("");
  const [token, setToken] = useState("");
  const [openAlert] = useState(true);

  const navigate = useNavigate();

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

  const handleEditProfile = (e) => {
    e.preventDefault();
    try {
      document.getElementById("my_modal_2").showModal();
    } catch (err) {
      alert(err);
    }
  };

  const handleUpdate = async () => {
    if (token) {
      const url = "https://dev-api.sepadu.id//api/user/edit-profile";
      const data = {
        full_name: namaBaru,
        gender: dataUser.gender,
        address: alamatBaru,
        phone: nomorBaru,
        profile_photo: profileBaru,
      };
      await axios
        .post(url, data, { headers: { "x-access-token": token } })
        .then((res) => {
          alert(res.data.message);
          navigate("/biodata");
        });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between font-poppins">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />
      <div id="biodata" className="container flex flex-col items-center">
        <figure className="w-20 rounded-full">
          <img src={defaultUser} alt="hero" />
        </figure>
      </div>

      <form
        id="inputs"
        className="container flex flex-col items-center"
        onSubmit={handleEditProfile}
      >
        <input
          type="file"
          name="profile"
          id="profile"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={profileBaru}
          onChange={(e) => setProfileBaru(e.target.value)}
          required
        />
        <label
          htmlFor="profile"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Ganti Foto Profile
        </label>
        <div className="form-control w-full lg:max-w-2xl">
          <label className="label">
            <span className="label-text lg:text-lg">Nama</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full lg:max-w-2xl"
            onChange={(e) => setNamaBaru(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-full lg:max-w-2xl">
          <label className="label">
            <span className="label-text lg:text-lg">Alamat</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full lg:max-w-2xl"
            onChange={(e) => setAlamatBaru(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-full lg:max-w-2xl">
          <label className="label">
            <span className="label-text lg:text-lg">No. Telepon</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full lg:max-w-2xl"
            onChange={(e) => setNomorBaru(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-1/2 lg:w-1/3 mt-2 gap-2">
          <button
            type="submit"
            className="mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
          >
            Kirim
          </button>
          <button
            className="mt-4 bg-my-grey hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            onClick={() => navigate("/biodata")}
          >
            Batal
          </button>
        </div>
        {openAlert && (
          <dialog id="my_modal_2" className="modal text-center">
            <div className="modal-box bg-slate-50">
              <h1 className="py-4 text-lg font-bold text-my-dark-blue">
                Update Biodata?
              </h1>
              <p className="pb-5">
                Periksa Kembali Apakah Data yang Kamu Isi Sudah Benar
              </p>
              <button
                className="btn border-none text-white bg-my-dark-blue hover:bg-my-light-blue hover:text-my-dark-blue"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        )}
      </form>
      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default BiodataEdit;
