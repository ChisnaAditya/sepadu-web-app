import { useNavigate } from "react-router-dom";
import hero from "../assets/images/hero.png";
function Hero() {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col items-center justify-evenly font-poppins text-center pt-5 sm:container">
      <h1 className="text-2xl font-neueMachina text-my-dark-blue lg:text-6xl">
        SIAP <br />
        <span className="text-my-light-blue">MENIKAH SEKARANG</span>
      </h1>
      <p className="text-xs px-3 text-my-dark-blue lg:text-2xl lg:px-40">
        Website Sepadu adalah website yang dibuat untuk memberikan edukasi
        kepada remaja dan khalayak umum mengenai persiapan yang diperlukan untuk
        menuju ke jenjang pernikahan
      </p>
      <button
        className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-my-dark-blue text-white mt-5 hover:bg-my-light-blue"
        onClick={() => navigate("/signin")}
      >
        COBA SEKARANG
      </button>
      <figure className="flex justify-center w-2/3 p-4 md:w-1/2 lg:w-1/3">
        <img className="object-scale-down" src={hero} alt="heroImage" />
      </figure>
    </div>
  );
}

export default Hero;
