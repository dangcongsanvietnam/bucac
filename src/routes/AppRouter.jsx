import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import AccountManagement from "../components/admin/account";
import DepartmentManagement from "../components/admin/department";
import ClassManagement from "../components/admin/class";
import StudentManagement from "../components/admin/student";
import SubjectManagement from "../components/admin/subject";
import Login from "../components/UserAccount/Login/Login";
import ScoreManagement from "../components/admin/score";
import AttendenceManagement from "../components/admin/attendence";

export const AppRouter = () => {
  return (
    <>
      <Helmet>
        <title>System Management</title>
        <meta name="description" content="System Management" />
        <link rel="icon" type="image/x-icon" href={"logo"} />
      </Helmet>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/account"
          element={
            <AccountManagement />
          }
        />
        <Route
          path="/dashboard/department"
          element={
            <DepartmentManagement />
          }
        />

        <Route
          path="/dashboard/class"
          element={
            <ClassManagement />
          }
        />

        <Route
          path="/dashboard/student"
          element={
            <StudentManagement />
          }
        />

        <Route
          path="/dashboard/subject"
          element={
            <SubjectManagement />
          }
        />

        <Route
          path="/dashboard/score"
          element={
            <ScoreManagement />
          }
        />

        <Route
          path="/dashboard/attendence"
          element={
            <AttendenceManagement />
          }
        />
      </Routes>
    </>
  );
};
