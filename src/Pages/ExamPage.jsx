import React, { useState, useEffect } from 'react';
import { Header, Footer } from '../Components';

const ExamPage = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // Store selected answers

  const exam = {
    title: "Data Science Basics Exam",
    description: "Test your knowledge on Data Science concepts covered in the course.",
    duration: "1 hour",
    questions: [
      {
        id: 1,
        questionText: "What is the main purpose of data preprocessing?",
        options: [
          "To collect data",
          "To clean and transform data",
          "To analyze data",
          "To visualize data"
        ]
      },
      {
        id: 2,
        questionText: "Which algorithm is commonly used for classification tasks?",
        options: [
          "Linear Regression",
          "K-Means Clustering",
          "Decision Trees",
          "Principal Component Analysis"
        ]
      },
      // Add more questions as needed
    ]
  };

  useEffect(() => {
    let timer;
    if (examStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeRemaining]);

  const handleStartExam = () => {
    setExamStarted(true);
  };

  const handleAnswerChange = (questionIndex, optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });

    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions([...answeredQuestions, questionIndex]);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleFinishExam = () => {
    // Handle exam submission logic here
    alert('Exam submitted!');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen text-gray-700 p-6 flex">
        {/* Left Panel - Timer */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md mr-4">
          {examStarted && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Time Remaining</h2>
              <p className="text-2xl text-red-600 font-bold">{formatTime(timeRemaining)}</p>
            </div>
          )}
        </div>

        {/* Main Content - Questions */}
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-light-blue mb-4">{exam.title}</h1>
          <p className="text-lg text-black-300 mb-4">{exam.description}</p>
          <p className="text-sm text-black-400 mb-6">Duration: {exam.duration}</p>

          {!examStarted ? (
            <button
              onClick={handleStartExam}
              className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors"
            >
              Start Exam
            </button>
          ) : (
            <div className="mt-6">
              <div className="mb-6 p-4 bg-blue-100 rounded-lg">
                <p className="text-lg font-semibold text-black mb-2">
                  {exam.questions[currentQuestionIndex].questionText}
                </p>
                <form className="space-y-4">
                  {exam.questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={`question-${currentQuestionIndex}-option-${index}`}
                        name={`question-${currentQuestionIndex}`}
                        value={index}
                        checked={selectedAnswers[currentQuestionIndex] === index}
                        onChange={() => handleAnswerChange(currentQuestionIndex, index)}
                        className="mr-2"
                      />
                      <label htmlFor={`question-${currentQuestionIndex}-option-${index}`} className="text-gray-700">
                        {option}
                      </label>
                    </div>
                  ))}
                </form>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
                {currentQuestionIndex === exam.questions.length - 1 ? (
                  <button
                    onClick={handleFinishExam}
                    className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                  >
                    Finish & Submit
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Question Status */}
        <div className="w-1/4 bg-gray-100 p-4 rounded-lg shadow-md ml-4">
          {examStarted && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Questions</h2>
              <div className="grid grid-cols-4 gap-2">
                {exam.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`p-2 rounded-lg text-center cursor-pointer ${
                      answeredQuestions.includes(index) ? 'bg-purple-500' : 'bg-purple-800'
                    } text-white`}
                    onClick={() => setCurrentQuestionIndex(index)}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ExamPage;
