import { useState, useEffect, useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Footer, Header } from '../Components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const AssignmentPage = () => {
  const [currentAssignment, setCurrentAssignment] = useState({
    id: '',
    title: '',
    dueDate: '',
    uploadDate: '',
    description: '',
    status: '',
  });
  
  const { user, loading, error } = useContext(AuthContext);  // Access the context
  const [previousAssignments, setPreviousAssignments] = useState([]);
  const [assignmentQuestion, setAssignmentQuestion] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      fetchAssignments();
    }
  }, [user]);  // Fetch assignments after the user is loaded

  const fetchAssignments = async () => {
    try {
      const res = await axios.get('http://localhost/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'mod_assign_get_assignments',
          moodlewsrestformat: 'json',
          wstoken: localStorage.getItem('moodleToken'),  // Use token from localStorage or context
        },
      });

      if (res.data?.courses?.length > 0) {
        const assignments = res.data.courses[0].assignments || [];
        if (assignments.length) {
          const current = assignments[0];  // Assuming first is current
          setCurrentAssignment({
            id: current.id, // Make sure to capture ID
            title: current.name,
            dueDate: new Date(current.duedate * 1000).toLocaleDateString(),
            uploadDate: new Date(current.allowsubmissionsfromdate * 1000).toLocaleDateString(),
            description: current.intro,
            status: 'Not Submitted',
          });
          setAssignmentQuestion(current.intro);
          fetchPreviousAssignments(assignments);
        }
      } else {
        console.log('No courses or assignments found.');
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchPreviousAssignments = (assignments) => {
    const previous = assignments.slice(1); // All except the first
    const updatedPreviousAssignments = previous.map((assignment) => ({
      title: assignment.name,
      status: assignment.submissionstatus || 'Not Submitted',
      grade: assignment.grade || '-',
    }));
    setPreviousAssignments(updatedPreviousAssignments);
  };

  const submitForGrading = async () => {
    if (!currentAssignment.id) {
      console.error('Assignment ID is not set');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost/moodle/webservice/rest/server.php', formData, {
        params: {
          wsfunction: 'mod_assign_submit_for_grading',
          assignmentid: currentAssignment.id,
          acceptsubmissionstatement: 1, // or 0, depending on the requirement
          wstoken: localStorage.getItem('moodleToken'),  // Pass the token from AuthContext or localStorage
        },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting assignment:', error);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 font-serif">Assignment </h1>

        {/* Current Assignment */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {currentAssignment.title}
          </h2>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Due Date:</span> {currentAssignment.dueDate}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">Uploaded Date:</span> {currentAssignment.uploadDate}
          </p>

          {/* Assignment Question */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Assignment Question</label>
            <div className="border border-gray-300 p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: assignmentQuestion }} />
          </div>

          {/* Rich Text Editor */}
          <div className="mb-4">
            <label htmlFor="assignmentDescription" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <ReactQuill
              value={currentAssignment.description}
              onChange={(value) => setCurrentAssignment({ ...currentAssignment, description: value })}
              className="w-full"
              theme="snow"
              placeholder="Write your assignment here..."
            />
          </div>

          {/* File Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Upload Files</label>
            <input
              type="file"
              className="block w-full text-gray-500 file:border file:border-gray-300 file:py-2 file:px-4 file:rounded-lg file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200"
              onChange={handleFileUpload}
            />
          </div>

          {/* Submit Assignment */}
          <button
            onClick={() => submitForGrading(currentAssignment.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit for Grading
          </button>
        </div>

        {/* Previous Assignments */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Other Assignments</h2>
          <div className="space-y-4">
            {previousAssignments.map((assignment, index) => (
              <div key={index} className="border-b border-gray-300 pb-4">
                <h3 className="text-xl font-semibold text-gray-700">{assignment.title}</h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">Status:</span> {assignment.status}
                </p>
                {assignment.grade !== '-' && (
                  <p className="text-gray-600">
                    <span className="font-semibold">Grade:</span> {assignment.grade}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AssignmentPage;
