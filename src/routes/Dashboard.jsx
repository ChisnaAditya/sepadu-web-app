import { useNavigate } from "react-router-dom";
import Edukasi from "../components/Edukasi";
import NavbarTop from "../components/NavbarTop";
import NavbarBot from "../components/Navbarbot";

function Dashboard() {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentLevel = JSON.parse(localStorage.getItem("level"));

  return (
    <div className="flex flex-col justify-between">
      <NavbarTop
        onClickNav={() => navigate("/")}
        bgNavbar="bg-my-dark-blue"
        textLink="text-white"
        logoColor="text-slate-50"
      />
      <Edukasi />
      <NavbarBot onClickNav={() => navigate("/")} />
    </div>
  );
}

export default Dashboard;
