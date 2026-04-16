import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Hero from "./components/HeroSec/jsx/Hero";
import Categories from "./components/Categories/Categories";
import ViewCourses from "./components/ViewCourses/ViewCourses";
import AddCourse from "./components/AddCourse/Addcourse";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import EditCourse from "./components/EditCourse/EditCourse";
import Cart from "./components/Cart/Cart";
import MyLearning from "./components/MyLearning/MyLearning";

import Thero from "./components/Teach/HeroTeach/Thero";
import AddForm from "./components/Teach/AddForm/Addform";
import BecomeInstructor from "./components/Teach/BecomeInstructor/BecomeInstructor";
import ViewInstructor from "./components/Teach/Instructors/viewInstructor";
import InstructorDetails from "./components/Teach/Instructors/InstructorDetails";
import EditInstructor from "./components/Teach/Instructors/EditInstructor";
import ReasonsSection from "./components/Teach/TeachSec/ReasonSec/ReasonsSection";
import HowToBegin from "./components/Teach/TeachSec/HowToBegin/HowToBegin";
import TestimonialSlider from "./components/Teach/TeachSec/TestimonialSlider/TestimonialSlider";
import SupportSection from "./components/Teach/TeachSec/SupportSection/SupportSection";

import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppRoutes = () => {
  const [filter, setFilter] = useState("All");
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* Auth routes — redirect to home if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Signup />}
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <>
              <Hero />
              <Categories setFilter={setFilter} />
              <ViewCourses filter={filter} />
            </>
          </ProtectedRoute>
        }
      />
      <Route path="/add-course" element={<ProtectedRoute><AddCourse /></ProtectedRoute>} />
      <Route path="/course/:id" element={<ProtectedRoute><CourseDetails /></ProtectedRoute>} />
      <Route path="/edit/:id" element={<ProtectedRoute><EditCourse /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/my-learning" element={<ProtectedRoute><MyLearning /></ProtectedRoute>} />
      <Route
        path="/teach"
        element={
          <ProtectedRoute>
            <>
              <Thero />
              <ReasonsSection />
              <HowToBegin />
              <TestimonialSlider />
              <SupportSection />
              <BecomeInstructor />
            </>
          </ProtectedRoute>
        }
      />
      <Route path="/get-started" element={<ProtectedRoute><AddForm /></ProtectedRoute>} />
      <Route path="/view-instructors" element={<ProtectedRoute><ViewInstructor /></ProtectedRoute>} />
      <Route path="/instructor/:id" element={<ProtectedRoute><InstructorDetails /></ProtectedRoute>} />
      <Route path="/edit-instructor/:id" element={<ProtectedRoute><EditInstructor /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;
