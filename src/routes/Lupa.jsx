import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

function Lupa() {
  const navigate = useNavigate()
  const handleLupa = (e) => {
    e.preventDefault()
    alert('Cek Email Anda')
    navigate('/signin')
  }
  return (
    <section className="container font-poppins h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col items-center justify-center cursor-pointer" onClick={()=>navigate('/')}>
        <img src={logo} alt="Sample image" />
        <p className="text-my-dark-blue ">SEPADU</p>
      </div>
      
      <h1 className="text-2xl font-bold text-my-dark-blue py-5">MASUKKAN EMAIL</h1>
      <form className="md:w-1/3 md:p-10 md:shadow-2xl md:shadow-black md:rounded-xl w-full" onSubmit={handleLupa}>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Masukkan Email"
          required
        />
        <div className="text-center md:text-left">
          <button
            className="w-full mt-4 bg-my-dark-blue hover:bg-my-light-blue px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Kirim
          </button>
        </div>
      </form>
    </section>
  );
}

export default Lupa;
