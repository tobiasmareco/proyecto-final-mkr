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
import ProjectId from "./components/ProjectId";
import EditProjects from "./pages/Main/EditProjects";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
          </Route>
          <Route path="/projects" element={<MainLayout />}>
            <Route index element={<Projects />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path=":id" element={<ProjectId />} />
            <Route path="edit/:id" element={<EditProjects />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
