import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import DataTable from "react-data-table-component";
import NavbarTop from "../components/NavbarTop";
import FormPostest from "../components/FormPostest";
import { useNavigate } from "react-router";
import axios from "axios";

function Admin() {
  const editor = useRef(null);
  const [cover, setCover] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState('');
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://dev-api.sepadu.id/api/course";
    const data = {
      cover: cover,
      title: title,
      description: desc,
      content: content,
    };

    if (token) {
      try {
        await axios
          .put(url, data, { headers: { "x-access-token": token } })
          .then((res) => {
            alert(res.data.message);
            setTitle("");
            setCover("");
            setDesc("");
            setContent("");
          });
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Edit
  const handleEdit = (index) => {
    const id = data[index].id;
    navigate("/editcourse/" + id);
  };

  // Delete
  const handleDelete = async (courseId) => {
    const url = `https://dev-api.sepadu.id/api/course/${courseId}`;
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
      axios.get("https://dev-api.sepadu.id/api/course", data).then((res) => {
        setData(res.data.data);
      });
    } else {
      window.location.href = '/signin'
    }
  }, [navigate, data]);

  useEffect(()=>{
    if (token) {
      const data = {
        headers: {
          "x-access-token": token,
        },
      };
      axios.get("https://dev-api.sepadu.id/api/user/list", data).then((res) => {
        setDataUser(res.data.data.data)
      });
    }
  },[token])

  const columnUser = [
    {
      name: "Nama",
      selector: (row) => row.full_name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Alamat",
      selector: (row) => row.address,
    },
    {
      name: "Nomor",
      selector: (row) => row.phone,
    },
    {
      name: "Kursus Selesai",
      selector: (row) => row.jumlah_course,
    },
  ];

  return (
    <>
      <div className="">
        <NavbarTop
          onClickNav={() => navigate("/")}
          bgNavbar="bg-my-dark-blue"
          textLink="text-white"
          logoColor="text-slate-50"
        />
        <div className="flex flex-col">
          <form
            id="form-admin"
            onSubmit={handleSubmit}
            className="container pt-5"
          >
            <div className="inputs-materi">
              <h2 className="text-center font-bold text-2xl">Input Materi</h2>
              <div className="input-materi">
                <div className="relative z-0 w-full mb-5 group"></div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="file"
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={cover}
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
                Kirim
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center pt-5 gap-4 container">
            <h2 className="text-center font-bold text-2xl">Input Posttest</h2>
            <FormPostest nomor="1" />
          </div>
        </div>

        <div className="container flex flex-col items-center justify-center">
          <h2 className="text-center text-2xl font-bold pb-10">List Kursus</h2>
          <table className="border">
            <thead>
              <tr>
                <td className="px-5 py-5 text-center">No Urut Kursus</td>
                <td className="px-5 py-5 text-center">Judul</td>
                <td className="px-5 py-5 text-center">Aksi</td>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.title}</td>
                  <td className="px-5 py-1">
                    <button
                      onClick={() => handleEdit(index)}
                      className="btn hover:bg-my-light-blue bg-my-dark-blue text-white"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
      </div>

      <div className="container pt-10 pb-10">
        <h2 className="text-center text-2xl font-bold pb-10">
          Data Pengguna Sepadu
        </h2>
        <DataTable
          columns={columnUser}
          data={dataUser}
          fixedHeader={true}
          fixedHeaderScrollHeight="400px"
          pagination
        />
      </div>
    </>
  );
}

export default Admin;
