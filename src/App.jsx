import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {HomePage, SignUpPage, CoursePage, ExamReviewPage ,ExamPage,ProgressPage, UserHomepage}from './Pages';

import './index.css';

const App = () => {
  return (
    <Router basename="/dllms-moodle">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/signuppage" element={<SignUpPage />} />
        <Route path="/coursepage" element={<CoursePage />} />
        <Route path="/userhomepage" element={< UserHomepage />} />
        <Route path="/mylearning" element={<ProgressPage/>}/>
        <Route path="/Exam" element={<ExamPage/>}/>
        <Route path="/ExamReview" element={<ExamReviewPage/>}/>

        

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
