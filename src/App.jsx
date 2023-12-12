import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Beranda from "./routes/Beranda";
import Dashboard from "./routes/Dashboard";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Admin from "./routes/Admin";
import Biodata from "./routes/Biodata";
import BiodataEdit from "./routes/BiodataEdit";
import Lupa from "./routes/Lupa";
import EdukasiDetail from "./components/EdukasiDetail";
import Postest from "./routes/Postest";
import EditCourse from "./components/EditCourse";

function App() {
  const myRouter = createBrowserRouter([
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/",
      element: <Beranda />,
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/lupa",
      element: <Lupa />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/course/:id",
      element: <EdukasiDetail />,
    },
    {
      path: "/postest/:id",
      element: <Postest />,
    },
    {
      path: "/biodata",
      element: <Biodata />,
    },
    {
      path: "/editprofile",
      element: <BiodataEdit />,
    },
    {
      path: "/editcourse/:id",
      element: <EditCourse />,
    },
  ]);

  return (
    <>
      <RouterProvider router={myRouter} />
    </>
  );
}

export default App;
