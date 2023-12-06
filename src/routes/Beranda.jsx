import { useRef } from "react";
import Hero from "../components/Hero";
import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/Navbarbot";
import TentangKami from "../components/TentangKami";
import { useNavigate } from "react-router-dom";

function Beranda() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const handleScroll = () => {
    navigate("/");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavbarTop onClickNav={handleScroll} logoColor="text-my-dark-blue"/>

      <div>
        <Hero />
        <TentangKami scrollToView={ref}/>
      </div>
      
      <NavbarBot onClickNav={handleScroll} />
    </>
  );
}

export default Beranda;
