import { useState, useEffect, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Footer, Header } from '../Components';
import axios from 'axios';

const QuizPage = () => {
  const [quiz, setQuiz] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizData, setQuizData] = useState({}); // Holds detailed quiz data
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [attemptId, setAttemptId] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchQuizzes(1); // Pass the correct courseId here
    }
  }, [user]);

  const fetchQuizData = async (quizId) => {
    try {
      const token = localStorage.getItem('moodleToken');
      if (!token) {
        console.error('No token found.');
        return;
      }

      const res = await axios.get('http://localhost/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'mod_quiz_get_attempt_data',
          moodlewsrestformat: 'json',
          quizid: quizId,
          wstoken: token,
        },
      });

      if (res.data) {
        setCurrentQuiz(res.data); // Set current quiz with fetched data
      } else {
        console.log('No quiz data found.');
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const fetchQuizzes = async (courseId) => {
    try {
      const token = localStorage.getItem('moodleToken');
      if (!token) {
        console.error('No token found.');
        return;
      }
  
      const res = await axios.get('http://localhost/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'mod_quiz_get_quizzes_by_courses',
          moodlewsrestformat: 'json',
          courseids: [courseId], // Pass the course ID as an array
          wstoken: token,
        },
      });
  
      if (res.data.quizzes) {
        setQuiz(res.data.quizzes); // Set the quizzes state with the response data
      } else {
        console.log('No quizzes found.');
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const startAttempt = async (quizId) => {
    try {
      const token = localStorage.getItem('moodleToken');
      if (!token) {
        console.error('No token found.');
        return;
      }

      const res = await axios.post('http://localhost/moodle/webservice/rest/server.php', null, {
        params: {
          wsfunction: 'mod_quiz_start_attempt',
          moodlewsrestformat: 'json',
          quizid: quizId,
          wstoken: token,
        },
      });

      if (res.data && res.data.attempt) {
        setAttemptId(res.data.attempt.id);
      } else {
        console.log('Error starting attempt.');
      }
    } catch (error) {
      console.error('Error starting attempt:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('moodleToken');
      if (!token) {
        console.error('No token found.');
        return;
      }

      const res = await axios.post('http://localhost/moodle/webservice/rest/server.php', null, {
        params: {
          wsfunction: 'mod_quiz_process_attempt',
          moodlewsrestformat: 'json',
          attemptid: attemptId,
          answers: answers,
          wstoken: token,
        },
      });

      if (res.data) {
        console.log('Exam submitted successfully!');
      } else {
        console.log('Error submitting exam.');
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answer }));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Exam Page</h1>

        {/* Exam List */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Available Exams</h2>
          <ul>
            {quiz.length > 0 ? (
              quiz.map((quiz) => (
                <li key={quiz.id} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">{quiz.name}</h3>
                  <button
                    onClick={() => {
                      fetchQuizData(quiz.id);
                      startAttempt(quiz.id);
                    }} // Fetch quiz details and start attempt
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    View Details
                  </button>
                </li>
              ))
            ) : (
              <p>No quizzes available.</p>
            )}
          </ul>
        </div>

        {/* Exam Details */}
        {currentQuiz && currentQuiz.questions && (
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exam Details</h2>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Title:</span> {currentQuiz.title}
            </p>

            {/* Exam Form */}
            <form onSubmit={handleSubmit}>
              {currentQuiz.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-700">{question.text}</h3>
                  <ul>
                    {question.options.map((option) => (
                      <li key={option.id} className="mb-2">
                        <input
                          type="radio"
                          name={question.id}
                          value={option.id}
                          onChange={() => handleAnswerChange(question.id, option.id)}
                        />
                        <span className="ml-2">{option.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="submit"
                disabled={submitting}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {submitting ? 'Submitting...' : 'Submit Exam'}
              </button>
            </form>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default QuizPage;
