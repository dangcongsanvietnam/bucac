import { Routes, Route } from "react-router-dom";
import AccountManagement from "../components/admin/account";
import DepartmentManagement from "../components/admin/department";
import ClassManagement from "../components/admin/class";
import StudentManagement from "../components/admin/student";
import SubjectManagement from "../components/admin/subject";
import Login from "../components/UserAccount/Login/Login";
import ScoreManagement from "../components/admin/score";
import AttendenceManagement from "../components/admin/attendence";
import ErrorPage from "../components/errors/ErrorPage";
import ProtectedRouteDashboardAdmin from "./ProtectedRouteDashboardAdmin";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="/dashboard/account"
          element={<ProtectedRouteDashboardAdmin element={<AccountManagement />} />}
        />
        <Route
          path="/dashboard/department"
          element={<ProtectedRouteDashboardAdmin element={<DepartmentManagement />} />}
        />
        <Route
          path="/dashboard/class"
          element={<ProtectedRouteDashboardAdmin element={<ClassManagement />} />}
        />
        <Route
          path="/dashboard/student"
          element={<ProtectedRouteDashboardAdmin element={<StudentManagement />} />}
        />
        <Route
          path="/dashboard/subject"
          element={<ProtectedRouteDashboardAdmin element={<SubjectManagement />} />}
        />
        <Route
          path="/dashboard/score"
          element={<ProtectedRouteDashboardAdmin element={<ScoreManagement />} />}
        />
        <Route
          path="/dashboard/attendence"
          element={<ProtectedRouteDashboardAdmin element={<AttendenceManagement />} />}
        />
      </Routes>
    </>
  );
};
