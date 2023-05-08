import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import ConfirmAccount from "./pages/Auth/ConfirmAccount";
import { AuthProvider } from "./context/AuthProvider";

import MainLayout from "./layouts/MainLayout";
import Projects from "./pages/Main/Projects";
import CreateProject from "./pages/Main/CreateProject";
import EditProjects from "./pages/Main/EditProjects";
import ProjectProvider from "./context/ProjectsProvider";
import Project from "./pages/Main/Project";
import { Payment } from "./components/ProjectsComponents/Payment";
import Completion from "./components/Payment/Completion";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>

          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="confirm-account/:tokenId"
                element={<ConfirmAccount />}
              />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<ResetPassword />} />
              <Route path="reset-password/:token" element={<ResetPassword />} />
            </Route>
            <Route path="/projects" element={<MainLayout />}>
              <Route index element={<Projects />} />
              <Route path="create-project" element={<CreateProject />} />
              <Route path=":id" element={<Project />} />
              <Route path="edit/:id" element={<EditProjects />} />
            </Route>
            <Route>
              <Route path="/payment" element={<Payment />} />
              <Route path="/completion" element={<Completion />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
