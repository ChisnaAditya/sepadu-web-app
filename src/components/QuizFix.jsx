import { dataCourse } from "../data/dataCourse";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import success from "../assets/images/success.png";
import tryagain from "../assets/images/tryagain.png";
import axios from "axios";

const duration = 3600;

function QuizFix() {
  const [screen, setScreen] = useState(0);
  const [remaining, setRemaining] = useState(duration);
  const [score, setScore] = useState();
  const [num, setNum] = useState(0);
  const [dataPostest, setDataPostest] = useState([]);
  const [answers, setAnswers] = useState({});
  const [openAlert] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

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
        console.log(res.data.data.quizData);
        setDataPostest(res.data.data.quizData);
      });
    } else {
      navigate("/");
    }
  }, [id, navigate]);

  const handleFinish = () => {
    navigate("/dashboard");
  };

  /* 
    menggunakan useCallback karena digunakan 
    sebagai dependensi di useEffect untuk 
    mencegah rerender yang nggak perlu 
  */
  const submit = useCallback(() => {
    const correct = Object.entries(dataPostest).reduce((acc, data) => {
      if (data[1].answer === answers[data[1].id]) {
        acc = acc + 1;
      }
      console.log(data[1].answer + '--vs--'+ answers[data[1].id])
      return acc;
    }, 0);

    setScore({
      correct,
      wrong: dataPostest.length - correct,
      // success: dataPostest.length-1,
    });

    setScreen(0);
  }, [answers]);

  // useEffect ini utk mengontrol timer
  useEffect(() => {
    if (screen === 1) {
      const timer = setTimeout(() => {
        setRemaining(remaining - 1);
      }, 1000);
      if (remaining <= 0) {
        clearTimeout(timer);
        submit();
      }
      // fungsi cleanup buat menghapus timer dari browser jika komponen diremove
      return () => {
        clearTimeout(timer);
      };
    }
  }, [remaining, screen, submit]);

  return (
    <div className="container font-poppins">
      {screen === 0 && (
        <div className="text-center md:flex md:justify-center">
          {score ? (
            <div className="pb-10 md:w-1/3">
              {score.correct >= (dataPostest.length-1) ? (
                <div>
                  <img src={success} alt="quizresult" />
                  <h1 className="font-bold">Kamu Sudah Menguasai Materi</h1>
                </div>
              ) : (
                <div>
                  <img src={tryagain} alt="quizresult" />
                  <h1 className="font-bold">Kamu Belum Menguasai Materi</h1>
                </div>
              )}

              <div className="pb-5">
                <p className="pt-5">Skormu Adalah</p>
                <h1 className="text-5xl font-bold p-2">
                  {score.correct}/{dataPostest.length}
                </h1>
                <p>
                  Passing Grade {dataPostest.length-1}/{dataPostest.length}
                </p>
              </div>
              <button
                onClick={handleFinish}
                className="btn border-none text-white bg-my-dark-blue hover:bg-my-light-blue hover:text-my-dark-blue"
              >
                Kembali Ke Dashboard
              </button>
            </div>
          ) : (
            <div className="p-5">
              <h1 className="text-center text-xl font-bold">
                SELAMAT MENGERJAKAN
              </h1>
              <div>Jumlah Soal: {dataPostest.length} item </div>
              <br />
              <button
                className="btn bg-my-dark-blue text-white font-bold border-none hover:bg-my-light-blue"
                onClick={() => setScreen(1)}
              >
                START POSTTEST
              </button>
            </div>
          )}
        </div>
      )}
      {/* screen quiz */}
      {screen === 1 && (
        <div className="main">
          <div className="timer">
            Pertanyaan {num + 1}/{dataPostest.length}
          </div>

          <div className="w-full bg-gray-400 rounded-full h-2.5">
            {

            }
            <div
              className={`bg-my-dark-blue h-2.5 rounded-full w-1/4
              }`}
            ></div>
          </div>

          <div className="flex justify-between pb-5 pt-2">
            <button
              className="text-my-dark-blue font-bold border-none hover:text-my-light-blue"
              disabled={num === 0}
              onClick={() => setNum(num - 1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className="text-my-dark-blue font-bold border-none hover:text-my-light-blue"
              disabled={num === dataPostest.length - 1}
              onClick={() => setNum(num + 1)}
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          <div className="flex flex-col">
            <p className="mb-10 text-center">{dataPostest[num].question}</p>
            <div className="flex flex-col gap-2">
              {dataPostest[num].options.map((option, index) => {
                return (
                  <div key={dataPostest[num].id + "-" + index}>
                    <input
                      id={option}
                      type="radio"
                      value={option}
                      name={`option_${num}`}
                      defaultChecked={
                        answers[dataPostest[num].id] ===
                        dataPostest[num].options[index]
                      }
                      onChange={() => {
                        setAnswers({
                          ...answers,
                          //   [dataPostest[num].id]: dataPostest[num].options[index],
                          [dataPostest[num].id]:
                            dataPostest[num].options[index],
                        });
                      }}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={option}
                      className="inline-flex items-center justify-between w-full p-4 text-white bg-my-dark-blue rounded-lg cursor-pointer peer-checked:bg-gray-400"
                    >
                      <div className="block">
                        <div className="w-full text-sm font-semibold">
                          {option}
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pb-10 pt-10">
            <button
              className="btn bg-my-light-blue text-my-dark-blue font-bold border-none hover:bg-my-dark-blue hover:text-white"
              disabled={num !== dataPostest.length - 1}
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              SUBMIT & FINISH
            </button>
          </div>
          <div className="container">
            {openAlert && (
              <dialog id="my_modal_2" className="modal text-center">
                <div className="modal-box bg-slate-50">
                  <h1 className="py-4 text-lg font-bold text-my-dark-blue">
                    Selesaikan Post Test?
                  </h1>
                  <p className="pb-5">
                    Periksa Kembali Apakah Jawaban yang Kamu Isi Sudah Benar
                  </p>
                  <button
                    className="btn border-none text-white bg-my-dark-blue hover:bg-my-light-blue hover:text-my-dark-blue"
                    onClick={() => submit()}
                  >
                    SELESAI
                  </button>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizFix;
