import React, { useState, Suspense } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/navbar';
import Sidebar from './components/Sidebar';
import AuthContainer from './components/AuthContainer';
import AddModuleForm from "./components/courses/AddModuleForm";
import ViewModules from "./components/courses/ViewModules";
import AddVideoForm from "./components/courses/AddVideoForm";
import ManageVideos from "./components/courses/ManageVideos";
import UpdateCourseForm from "./components/courses/UpdateCourseForm";
import AddTestForm from "./components/Test/AddTestForm";
import ViewTest from "./components/Test/ViewTest";
import UploadVideoForm from "./components/Test/AddTestVideoForm";
import ManageTestVideos from "./components/Test/ManageTestVideos";
import UpdateTestForm from "./components/Test/UpdateTestForm";
import NotificationPanel from "./components/NotificationPanel.jsx";
import LoginForm from './components/LoginForm';
import DashboardRight from './components/DashboardRight';
import Courses from './components/Courses';
import Tests from './components/Tests';
import Profile from './components/Profile';
import Comments from './components/Comments';
import CourseOverview from './components/CourseOverview';
import CourseManagement from './components/super-tables/courses-management';
import MentorManagement from './components/super-tables/mentor-management';
import QuizesManagement from './components/super-tables/quizes-management';
import ReportManagement from './components/super-tables/reports';
import UserManagement from './components/super-tables/user-management';
import Prox from './components/super-tables/Super_profile';
import NotifReview from './components/notification';



const App = () => {
  const location = useLocation();
  const [userRole, setUserRole] = useState(null);

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!userRole) return <Navigate to="/" />;
    if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" />;
    return children;
  };

  function Home() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardRight userRole={userRole} />
          </Suspense>
        </div>
      </div>
    );
  }

  
  function Course() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
         <Courses/>  
        </div>
      </div>
    );
  }

  function Test() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <Tests/>
        </div>
      </div>
    );
  }

  function Prof() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <Profile userRole={userRole}/>
        </div>
      </div>
    );
  }

  function CommentAccess() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <Comments/>
        </div>
      </div>
    );
  }

  {/*notification panel*/}
  function Notification() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <NotifReview userRole={userRole}/>
        </div>
      </div>
    );
  }


  function CommentOverView() {
    return (
      <div className="flex h-screen w-full justify-between">
        <div className="w-64 bg-gray-800 text-white">
          <Sidebar userRole={userRole} />
        </div>
        <div className="flex-1 px-2 bg-gray-100">
          <CourseOverview/>
        </div>
      </div>
    );
  }


{/*fuctions fro super admin */}
function SuperCourse() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <CourseManagement/>
      </div>
    </div>
  );
}


function SuperMentor() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <MentorManagement/>
      </div>
    </div>
  );



}function SuperProfile() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <Prox userRole={userRole}/>
      </div>
    </div>
  );
}function SuperQuizes() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <QuizesManagement/>
      </div>
    </div>
  );
}function SuperReports() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <ReportManagement/>
      </div>
    </div>
  );
}function SuperUsers() {
  return (
    <div className="flex h-screen w-full justify-between">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar userRole={userRole} />
      </div>
      <div className="flex-1 px-2 bg-gray-100">
        <UserManagement/>
      </div>
    </div>
  );
}

  return (
    <Layout>
      {location.pathname !== '/' && (
        <div className="fixed right-9 top-4 z-50">
          <NotificationPanel userRole={userRole}/>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar setUserRole={setUserRole} />
              <AuthContainer setUserRole={setUserRole} />
            </>
          }
        />
        <Route path="/home" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><Home /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><Course/></ProtectedRoute>} />
        <Route path="/test" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><Test /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><Prof /></ProtectedRoute>} />
        <Route path="/course-access-overview" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><CommentOverView /></ProtectedRoute>} />
        <Route path="/comment-overview" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><CommentAccess /></ProtectedRoute>} />
        <Route path="/notification" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><Notification /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<div className="text-center text-red-500 mt-10">Unauthorized Access</div>} />




        {/*routes for super admin side menus  */}
        <Route path="/courses_management" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperCourse/></ProtectedRoute>} />
        <Route path="/mentor_management" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperMentor /></ProtectedRoute>} />
        <Route path="/super_profile" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperProfile/></ProtectedRoute>} />
        <Route path="/quizes_management" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperQuizes/></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperReports/></ProtectedRoute>} />
        <Route path="/users_management" element={<ProtectedRoute allowedRoles={["sub-admin","super-admin"]}><SuperUsers/></ProtectedRoute>} />
        {/* <Route path="/unauthorized" element={<div className="text-center text-red-500 mt-10">Unauthorized Access</div>} /> */}
        
      </Routes>
    </Layout>
  );
};

export default App;
