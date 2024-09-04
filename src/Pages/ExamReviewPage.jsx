import React from 'react';
import { Header, Footer } from '../Components';

const ExamReviewPage = () => {
  const examResults = {
    title: "Data Science Basics Exam",
    questions: [
      {
        id: 1,
        questionText: "What is the main purpose of data preprocessing?",
        userAnswer: "To analyze data",
        correctAnswer: "To clean and transform data",
        explanation: "Data preprocessing is crucial for preparing data for analysis by cleaning and transforming it."
      },
      {
        id: 2,
        questionText: "Which algorithm is commonly used for classification tasks?",
        userAnswer: "Decision Trees",
        correctAnswer: "Decision Trees",
        explanation: "Decision Trees are a popular choice for classification tasks due to their simplicity and interpretability."
      },
      // Add more questions as needed
    ],
    score: 1, // User's score out of total questions
    totalQuestions: 2 // Total number of questions
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen text-gray-700 p-6">
        <h1 className="text-3xl font-bold text-light-blue mb-4">{examResults.title}</h1>
        <p className="text-lg text-gray-300 mb-6">Exam Review</p>

        <div className=" p-4 rounded-lg">
          <p className="text-lg font-semibold text-light-blue mb-4">Your Score: {examResults.score} / {examResults.totalQuestions}</p>
          {examResults.questions.map((question) => (
            <div key={question.id} className="mb-6 p-4  rounded-lg">
              <p className="text-lg font-semibold text-black mb-2">{question.questionText}</p>
              <p className="text-gray-700 mb-1"><strong>Your Answer:</strong> {question.userAnswer}</p>
              <p className="text-gray-700 mb-1"><strong>Correct Answer:</strong> {question.correctAnswer}</p>
              <p className="text-gray-600 mt-2">{question.explanation}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamReviewPage;
