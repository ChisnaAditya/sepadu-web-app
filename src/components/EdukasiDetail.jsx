import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dataCourse } from "../data/dataCourse";
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
  const [showComponent, setShowComponent] = useState(false);
  const [userLevel, setUserLevel] = useState(3);
  const [courseDetail, setCourseDetail] = useState({
    id:'',
    title:'',
    content:'',
  });

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

  const handlePilihKursus = () => {
    navigate("/dashboard");
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
      axios.get(`http://dev-api.sepadu.id/api/course/${id}`, data).then((res) => {
        console.log(res.data.data);
        setCourseDetail(res.data.data);
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  useEffect(() => {
    setData(dataCourse);
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />

      <div className="hidden">
        {setTimeout(() => {
          setShowComponent(true);
        }, 1000)}
      </div>

      {showComponent && (
        <div className="container flex min-h-screen md:pt-10">
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
            <div className="flex flex-col items-center text-center pb-5 pt-5">
              <p className="container md:text-2xl">
                {HTMLReactParser(courseDetail.content)}
              </p>
            </div>

            <button
              className="btn lg:max-w-xs bg-my-dark-blue text-slate-50 border-none hover:bg-my-light-blue"
              onClick={() => navigate(`/postest/${id}`)}
            >
              <FontAwesomeIcon icon={faFilePen} />
              POST TEST
            </button>
          </div>

          <div className="hidden md:flex md:flex-col md:basis-1/4 md:items-center md:min-h-screen md:max-h-screen">
            <h1 className="pb-5 font-bold text-lg text-my-dark-blue">
              Course Sebelumnnya
            </h1>
            <div className="flex flex-col gap-4 w-5/6 overflow-y-scroll shadow-xl">
              {data.map((item, index) => {
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
              })}
            </div>
          </div>
        </div>
      )}
      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default EdukasiDetail;
