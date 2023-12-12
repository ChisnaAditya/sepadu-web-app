import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faFilePen } from "@fortawesome/free-solid-svg-icons";
import NavbarTop from "./NavbarTop";
import NavbarBot from "./NavbarBot";
import CardCourse from "./CardCourse";
import HTMLReactParser from "html-react-parser";
import edukasi_2 from "../assets/images/edukasi_2.png";
import edukasi_3 from "../assets/images/edukasi_3.png";
import axios from "axios";

function EdukasiDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCourses, setDataCourses] = useState([
    {
      id: "",
      no: 1,
      cover: "",
      title: "",
      description: "",
      author: {
        id: "",
        username: "",
      },
      isEligible: false,
      score: 0,
    },
  ]);
  const [courseDetail, setCourseDetail] = useState({
    id: "",
    title: "",
    content: "",
  });

  const handlePilihKursus = async (e) => {
    try {
      const numCourse = e.target.accessKey - 1;
      const idCourse = dataCourses[numCourse].id;
      window.location.href = "/course/" + idCourse;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // get course detail
      const data = {
        headers: {
          "x-access-token": token,
        },
      };
      axios
        .get(`https://dev-api.sepadu.id/api/course/${id}`, data)
        .then((res) => {
          setCourseDetail(res.data.data);
        });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // get course
      const data = {
        headers: {
          "x-access-token": token,
        },
      };
      axios.get("https://dev-api.sepadu.id/api/course", data).then((res) => {
        setDataCourses(res.data.data);
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (dataCourses?.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center h-[100vh]">
        Loading<span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />
      <div className="container flex min-h-screen md:pt-5">
        <div className="flex flex-col w-full md:pt-10 md:basis-3/4">
          <div
            className="text-my-dark-blue text-2xl flex gap-4 items-center"
            onClick={() => navigate("/dashboard")}
          >
            <FontAwesomeIcon
              className="text-xl cursor-pointer p-2 rounded-full hover:bg-my-light-blue md:hidden"
              icon={faArrowLeft}
            />
            <h1 className="md:text-5xl"> {courseDetail.title} </h1>
          </div>
          <div className="flex flex-col items-center pb-5 pt-5">
            <div className="md:text-2xl">
              {HTMLReactParser(courseDetail.content)}
            </div>
          </div>

          {courseDetail && (
            <button
              className="btn lg:max-w-xs bg-my-dark-blue text-slate-50 border-none hover:bg-my-light-blue"
              onClick={() => navigate(`/postest/${id}`)}
            >
              <FontAwesomeIcon icon={faFilePen} />
              POST TEST
            </button>
          )}
        </div>

        <div className="hidden md:flex md:flex-col md:basis-1/4 md:items-center md:min-h-screen md:max-h-screen">
          <h1 className="pb-5 font-bold text-lg text-my-dark-blue">
            Course Sebelumnnya
          </h1>
          <div className="flex flex-col gap-4 w-5/6 overflow-y-scroll shadow-xl">
            {/* {data.map((item, index) => {
                if (userLevel >= index) {
                  return (
                    <div key={index}>
                      <CardCourse
                        cardKey={index}
                        hero={index % 2 === 0 ? edukasi_2 : edukasi_3}
                        title={item.title}
                        author={item.author}
                        desc={item.desc}
                        onClickCourse={handlePilihKursus}
                        isLevelPassed={userLevel + 1 > index ? true : false}
                        isCompleted={userLevel >= index + 1}
                      />
                    </div>
                  );
                }
              })} */}

            {dataCourses.map((item, index) => {
              if (item.isEligible) {
                return (
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
                );
              }
            })}
          </div>
        </div>
      </div>
      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default EdukasiDetail;
