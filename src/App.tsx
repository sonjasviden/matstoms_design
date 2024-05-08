import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./scss/Index.scss";
import Layout from "./Layout/Layout";
import Home from "./pages/Home";
import Works from "./pages/Works";
import SingleWork from "./pages/SingleWork";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AddWork from "./Admin/pages/AddWork";
import EditWork from "./Admin/pages/EditWork";
import AllWorks from "./Admin/pages/AllWorks";
import About from "./pages/About";
import EditAboutPage from "./Admin/pages/EditAboutPage";
import EditHomePage from "./Admin/pages/EditHomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Works />} />
            <Route path="work/:workId" element={<SingleWork />} />

            {/* ADMIN */}
            <Route path="/admin/*" element={<ProtectedRoute />}>
              <Route path="add-work" element={<AddWork />} />
              <Route path="all-works" element={<AllWorks />} />
              <Route path="all-works/:workId" element={<EditWork />} />
              <Route path="edit-homepage" element={<EditHomePage />} />
              <Route path="edit-aboutpage" element={<EditAboutPage />} />
            </Route>
            {/* ADMIN */}

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
