import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormPostest() {
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const [pertanyaan, setPertanyaan] = useState("");
  const [jawaban, setJawaban] = useState("");
  const [opsi_1, setOpsi_1] = useState("");
  const [opsi_2, setOpsi_2] = useState("");
  const [opsi_3, setOpsi_3] = useState("");
  const [opsi_4, setOpsi_4] = useState("");
  const [dataCourses, setDataCourses] = useState([]);
  const [datas, setDatas] = useState([]);

  const navigate = useNavigate();

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setDatas({
      id: id,
      question: pertanyaan,
      answer: jawaban,
      options: [opsi_1, opsi_2, opsi_3, opsi_4],
    });

    const url = `https://dev-api.sepadu.id/api/course/${id}/question`;
    const data = {
      question: pertanyaan,
      options: [opsi_1, opsi_2, opsi_3, opsi_4],
      answer: jawaban,
    };

    if (token) {
      try {
        await axios
          .put(url, data, { headers: { "x-access-token": token } })
          .then((res) => {
            alert(res.data.message)
            setPertanyaan("");
            setJawaban("");
            setOpsi_1("");
            setOpsi_2("");
            setOpsi_3("");
            setOpsi_4("");
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token)
    if (token) {
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
  }, [navigate, dataCourses]);

  if (dataCourses?.length === 0) {
    return (
      <div className="flex gap-4 items-center justify-center h-[100vh]">
        Loading<span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <form
      className="mx-auto text-my-dark-blue w-full"
      onSubmit={handleSubmitQuestion}
    >
      <div className="relative z-0 w-full mb-5 group"></div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          list="id_postest"
          type="text"
          name="id_postest"
          id="floating_password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <datalist id="id_postest">
          {dataCourses.map((item, index) => (
            <option key={index} value={item.id}>
              {item.title}
            </option>
          ))}
        </datalist>
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Id Postest
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="input_pertanyaan"
          id="input_pertanyaan"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={pertanyaan}
          onChange={(e) => setPertanyaan(e.target.value)}
          required
        />
        <label
          htmlFor="input_pertanyaan"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Pertanyaan
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="input_jawaban"
          id="input_jawaban"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          value={jawaban}
          onChange={(e) => setJawaban(e.target.value)}
          required
        />
        <label
          htmlFor="input_jawaban"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Jawaban
        </label>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="input_opsi_1"
            id="input_opsi_1"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={opsi_1}
            onChange={(e) => setOpsi_1(e.target.value)}
            required
          />
          <label
            htmlFor="input_opsi_1"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pilihan 1
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="input_opsi_2"
            id="input_opsi_2"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={opsi_2}
            onChange={(e) => setOpsi_2(e.target.value)}
            required
          />
          <label
            htmlFor="input_opsi_2"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pilihan 2
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-6">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="input_opsi_3"
            id="input_opsi_3"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={opsi_3}
            onChange={(e) => setOpsi_3(e.target.value)}
            required
          />
          <label
            htmlFor="input_opsi_3"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pilihan 3
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="input_opsi_4"
            id="input_opsi_4"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={opsi_4}
            onChange={(e) => setOpsi_4(e.target.value)}
            required
          />
          <label
            htmlFor="input_opsi_4"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pilihan 4
          </label>
        </div>
      </div>
      <button type="submit" className="btn bg-my-dark-blue text-white">
        Submit
      </button>
    </form>
  );
}

export default FormPostest;
