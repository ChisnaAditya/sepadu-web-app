import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/NavbarBot";
import defaultUser from "../assets/images/defaultuser.jpeg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BiodataEdit() {
  const [data, setData] = useState([{}]);
  const [namaBaru, setNamaBaru] = useState("");
  const [alamatBaru, setAlamatBaru] = useState("");
  const [nomorBaru, setNomorBaru] = useState("");
  const [openAlert] = useState(true);

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {}, []);

  const handleEditProfile = (e) => {
    e.preventDefault();
    try {
      document.getElementById("my_modal_2").showModal();
    } catch (err) {
      alert(err);
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
        <label
          htmlFor="changeImage"
          className="btn btn-link text-my-light-blue"
        >
          Ganti Foto Profile
        </label>
        <input
          id="changeImage"
          type="file"
          className="file-input file-input-xs w-full lg:max-w-2xl hidden"
        />
      </div>

      <form
        id="inputs"
        className="container flex flex-col items-center"
        onSubmit={handleEditProfile}
      >
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
                onClick={() => {
                  navigate("/biodata");
                  alert("berhasil update data");
                }}
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
