import React, { useState } from 'react';
import moodleApi from '../api/moodle'; // Ensure this is correctly configured

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');  // State for the search input
  const [searchResults, setSearchResults] = useState([]);  // State for storing search results
  const [error, setError] = useState(null);  // State for error handling
  const [loading, setLoading] = useState(false);  // Loading state for better UX

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setError('Search query cannot be empty.');
      return;
    }

    setLoading(true); // Set loading state
    setError(null); // Clear previous errors
    setSearchResults([]); // Clear previous results

    try {
      // Make API request to search for courses
      const coursesResponse = await moodleApi.get('/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_course_search_courses',  // Updated to search courses
          moodlewsrestformat: 'json',                // Return response in JSON format
          criterianame: 'search',                    // Moodle parameter for search
          criteriavalue: searchQuery,                // Pass the search query here
        },
      });

      console.log('Courses Response:', coursesResponse.data);

      // Make API request to search for categories
      const categoriesResponse = await moodleApi.get('/moodle/webservice/rest/server.php', {
        params: {
          wsfunction: 'core_course_get_categories',  // Moodle function to fetch categories
          moodlewsrestformat: 'json',                // Return response in JSON format
          'criteria[0][key]': 'name',  // Search by category name
          'criteria[0][value]': searchQuery,  // Pass the search query here
          addsubcategories: 1,  // Optionally fetch subcategories as well
        },
      });

      console.log('Categories Response:', categoriesResponse.data);

      // Handle courses response data
      const courses = Array.isArray(coursesResponse.data.courses) ? coursesResponse.data.courses : [];
      
      // Handle categories response data
      const categories = Array.isArray(categoriesResponse.data.categories) ? categoriesResponse.data.categories : [];

      // Combine both courses and categories results into one array
      const combinedResults = [...courses, ...categories];

      setSearchResults(combinedResults);  // Set the results to state
    } catch (err) {
      console.error('Error fetching search results:', err);
      setError('Failed to fetch search results. Please check the console for details.');
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="w-full md:w-[600px] lg:w-full xl:w-[600px]">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full h-12 md:h-10 lg:h-12 xl:h-10 border shadow p-4 rounded-full text-white dark:border-gray-700 dark:bg-gray-200 bg-gray-500"
            placeholder="Search for courses or categories"
          />
          <button type="submit" className="absolute top-3.5 right-3">
            <svg
              className="text-white h-5 w-5 md:h-4 md:w-4 lg:h-5 lg:w-5 xl:h-4 xl:w-4 fill-current dark:text-teal-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56.966 56.966"
            >
              <path
                d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Loading Spinner */}
      {loading && <p>Loading...</p>}

      {/* Display search results */}
      <div className="mt-4">
       
        {!loading && searchResults.length > 0 && (
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="p-2 border-b text-white">
                {result.fullname || result.name}  {/* Display course or category name */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
