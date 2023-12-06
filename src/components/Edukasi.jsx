import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { dataCourse } from "../data/dataCourse";
import CardCourse from "./CardCourse";
import alert from "../assets/images/alert.png";
import defaultUser from "../assets/images/defaultUser.jpeg";
import edukasi_2 from "../assets/images/edukasi_2.png";
import edukasi_3 from "../assets/images/edukasi_3.png";
import axios from "axios";

function Edukasi() {
  const [dataUser, setDataUser] = useState("");
  const [dataCourses, setDataCourses] = useState([
    {
      id: "",
      no:1,
      cover: "",
      title: "",
      description: "",
      author: {
        id: "",
        username: "",
      },
      isEligible:false,
      score:0,
    },
  ]);
  const [currentCourse, setCurrentCourse] = useState(0);
  const [userLevel, setUserLevel] = useState(2);
  const [openAlert] = useState(true);
  const [data, setData] = useState([
    {
      id: 1,
      title: "title",
      author: "author",
      desc: "desc",
      content: "content",
    },
    {
      id: 1,
      title: "title",
      author: "author",
      desc: "desc",
      content: "content",
    },
    {
      id: 1,
      title: "title",
      author: "author",
      desc: "desc",
      content: "content",
    },
    {
      id: 1,
      title: "title",
      author: "author",
      desc: "desc",
      content: "content",
    },
  ]);

  const navigate = useNavigate();
  const adminUser = import.meta.env.VITE_ADMIN_UID;
  const userID = dataUser.id;

  const getUserData = (token) => {
    const decoded = jwtDecode(token);
    return decoded;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
       //add user info data
      setDataUser(getUserData(token));

      // get course
      const data = {
        headers: {
          "x-access-token": token,
        },
      };
      axios.get("http://dev-api.sepadu.id/api/course", data).then((res) => {
        console.log(res.data.data);
        setDataCourses(res.data.data);
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    setData(dataCourse);
  }, []);

  const handlePilihKursus = (e) => {
    const num = parseInt(e.target.accessKey);
    const isEligible = e.target.ariaBusy

    if (isEligible === 'true') {
      setCurrentCourse(num-1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      document.getElementById("my_modal_2").showModal();
    }
  };

  const handleAksesKursus = () => {
    const id = dataCourses[currentCourse].id;
    console.log(id)
    navigate('/course/'+id);
  };

  return (
    <div className="md:pt-10 md:flex pb-10">
      <div className="hidden md:flex md:justify-center md:min-h-screen md:border-e-4 md:w-1/6">
        <div className="flex gap-4 w-full justify-center">
          <section>
            <h1 className="text-2xl font-bold text-my-dark-blue">Halo,</h1>
            <p className="text-xl text-my-dark-blue">Username</p>
          </section>

          <section className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar pt-2"
            >
              <div className="w-full items-center rounded-full">
                <img alt="Tailwind CSS Navbar component" src={defaultUser} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-my-dark-blue rounded-box w-fit"
            >
              {adminUser === import.meta.env.VITE_ADMIN_UID && (
                <li className="rounded-box hover:bg-my-light-blue">
                  <a
                    className="justify-between text-white"
                    onClick={() => navigate("/admin")}
                  >
                    Admin
                  </a>
                </li>
              )}
              <li className="rounded-box hover:bg-my-light-blue">
                <a
                  className="justify-between text-white"
                  onClick={() => navigate("/biodata")}
                >
                  Profile
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
      <div className="container font-poppins flex flex-col items-start justify-evenly">
        <div className="lg:grid lg:grid-cols-2">
          <section className="object-cover">
            <figure className="pt-5 md:pt-0">
              <img
                src={currentCourse % 2 === 0 ? edukasi_2 : edukasi_3}
                // src={dataCourses[currentCourse].cover}
                alt="hero"
                className="w-full h-full"
              />
            </figure>
          </section>
          <section className="flex flex-col justify-between lg:px-10">
            <div>
              <h1 className="text-2xl font-bold pt-2 md:text-5xl">
                {dataCourses[currentCourse].title}
              </h1>
              <p className="mb-2 text-xs md:text-xl">
                by {dataCourses[currentCourse].author.username}
              </p>
              <p className="pb-2 md:text-lg">
                {dataCourses[currentCourse].description}
              </p>
            </div>
            <button
              className="w-full mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              accessKey={currentCourse.toString()}
              onClick={handleAksesKursus}
            >
              Akses Kursus
            </button>
          </section>
        </div>

        <p className="mt-10 text-lg font-bold">Course Selanjutnya</p>
        <div className="list-course grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5">
          {dataCourses.map((item, index) => (
            <div key={index}>
              <CardCourse
                courseNumber={item.no}
                hero={index % 2 === 0 ? edukasi_2 : edukasi_3}
                title={item.title}
                author={item.author.username}
                desc={item.description.substring(0, 20) + " ..."}
                onClickCourse={handlePilihKursus}
                isEligible={item.isEligible}
              />
            </div>
          ))}
        </div>
        {openAlert && (
          <dialog id="my_modal_2" className="modal">
            <div className="modal-box bg-slate-50">
              <img src={alert} alt="alert" />
              <p className="py-4 text-lg font-bold text-center text-my-dark-blue">
                Selesaikan Course Sebelumnya Untuk Membuka Course Ini
              </p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        )}
      </div>
    </div>
  );
}

export default Edukasi;
