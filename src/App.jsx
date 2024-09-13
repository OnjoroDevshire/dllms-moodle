import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage, SignUpPage, CoursePage, ExamReviewPage ,CoursesPage,AssignmentPage,QuizPage,ProgressPage, UserHomepage}from './Pages';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Context/ProtectedRoute';
import ErrorBoundary from './Components/ErrorBoundary';
import './index.css';

const App = () => {
  return (
    <ErrorBoundary>
    <Router basename="/dllms-moodle">
      <AuthProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/login" element={<SignUpPage />} />
        <Route path="/coursepage/:courseId/:courseName" element={<CoursePage />} />
        <Route path="/userhomepage" element={ <ProtectedRoute>
    <UserHomepage />
  </ProtectedRoute>} />
        <Route path="/mylearning" element={<ProgressPage/>}/>
        <Route path="/Exam/:id" element={<QuizPage/>}/>
        <Route path="/ExamReview" element={<ExamReviewPage/>}/>
        <Route path="/courses" element={<CoursesPage/>}/>
        <Route path="/Assignment/:assignmentid" element={<AssignmentPage/>}/>

        

        {/* Add more routes as needed */}
      </Routes>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  );
};

export default App;
