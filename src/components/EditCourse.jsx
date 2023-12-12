import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [no, setNo] = useState();
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [quiz, setQuiz] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      no: no,
      cover: cover,
      title: title,
      description: desc,
      content: content,
    };
    if (token) {
      await axios
        .patch(`http://dev-api.sepadu.id/api/course/${id}`, data, {
          headers: { "x-access-token": token },
        })
        .then((res) => {
          alert(res.data.message);
          navigate("/admin");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Delete
  const handleDeleteQuiz = async (questionId) => {
    const url = `https://dev-api.sepadu.id/api/course/${id}/question/${questionId}`;
    if (token) {
      await axios
        .delete(url, { headers: { "x-access-token": token } })
        .then((res) => {
          alert(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    if (token) {
      const data = {
        headers: {
          "x-access-token": token,
        },
      };
      axios
        .get(`https://dev-api.sepadu.id/api/course/${id}`, data)
        .then((res) => {
          setTitle(res.data.data.title);
          setDesc(res.data.data.description);
          setContent(res.data.data.content);
          setNo(res.data.data.no);
          setQuiz(res.data.data.quizData);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/");
    }
  }, [id, navigate, quiz]);

  if (content?.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center h-[100vh]">
        Loading<span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <form id="form-admin" onSubmit={handleSubmit} className="container pt-5">
        <div className="inputs-materi">
          <h2 className="text-center font-bold text-2xl">Edit Materi</h2>
          <div className="input-materi">
            <div className="relative z-0 w-full mb-5 group"></div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="file"
                name="repeat_password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                defaultValue={cover}
                onChange={(e) => setCover(e.target.value)}
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Cover
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Judul
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="repeat_password"
                id="floating_repeat_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                required
              />
              <label
                htmlFor="floating_repeat_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Deskripsi Singkat
              </label>
            </div>

            <div className="jodit-text">
              <label>Masukkan Materi Kursus</label>
              <JoditEditor
                className="jodit-editor"
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
          </div>
        </div>
        <div className="">
          <p>Sudah selesai mengisi?</p>
          <button className="btn bg-my-dark-blue text-white hover:bg-my-light-blue">
            Update
          </button>
        </div>
      </form>

      <table className="border container my-10">
        <thead>
          <tr>
            <td className="px-5 py-5 text-center">No</td>
            <td className="px-5 py-5 text-center">Pertanyaan</td>
            <td className="px-5 py-5 text-center">Aksi</td>
          </tr>
        </thead>
        <tbody>
          {quiz.map((item, index) => (
            <tr key={index}>
              <td className="text-center">{index + 1}</td>
              <td className="text-center">{item.question}</td>
              <td className="px-5 py-1">
                <button
                  onClick={() => handleDeleteQuiz(item.id)}
                  className="btn hover:bg-my-grey bg-red-500 text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EditCourse;
