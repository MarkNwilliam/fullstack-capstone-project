import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlConfig } from '../../config';

function SearchPage() {
  // Task 1: Define state variables for the search query, age range, and search results.
  const categories = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
  const conditions = ['New', 'Like New', 'Older'];

  const [query, setQuery] = useState('');
  const [ageLimit, setAgeLimit] = useState(10);
  const [category, setCategory] = useState('All');
  const [condition, setCondition] = useState('All');
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // fetch all products
    const fetchProducts = async () => {
      try {
        const url = `${urlConfig.backendUrl}/api/gifts`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error; ${response.status}`);
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.log('Fetch error: ' + error.message);
      }
    };

    fetchProducts();
  }, []);

  // Task 2. Fetch search results from the API based on user inputs.
  const handleSearch = async (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    if (query) params.append('name', query);
    if (category !== 'All') params.append('category', category);
    if (condition !== 'All') params.append('condition', condition);
    params.append('age_years', ageLimit);

    const url = `${urlConfig.backendUrl}/api/search?${params.toString()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error; ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
      setHasSearched(true);
    } catch (error) {
      console.log('Search error: ' + error.message);
      setSearchResults([]);
      setHasSearched(true);
    }
  };

  const navigate = useNavigate();

  // Task 6. Enable navigation to the details page of a selected gift.
  const goToDetailsPage = (productId) => {
    navigate(`/gift/${productId}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="filter-section mb-3 p-3 border rounded">
            <h5>Filters</h5>
            <div className="d-flex flex-column">
              {/* Task 3: Dynamically generate category and condition dropdown options.*/}
              <label className="form-label" htmlFor="category-select">
                Category
              </label>
              <select
                id="category-select"
                className="form-select mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <label className="form-label" htmlFor="condition-select">
                Condition
              </label>
              <select
                id="condition-select"
                className="form-select mb-3"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="All">All</option>
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>

              {/* Task 4: Implement an age range slider and display the selected value. */}
              <label className="form-label" htmlFor="age-limit">
                Maximum age: {ageLimit} years
              </label>
              <input
                type="range"
                id="age-limit"
                className="form-range"
                min="0"
                max="20"
                step="1"
                value={ageLimit}
                onChange={(e) => setAgeLimit(e.target.value)}
              />
            </div>
          </div>

          {/* Task 7: Add text input field for search criteria*/}
          <form className="d-flex mb-3" onSubmit={handleSearch}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by name..."
              aria-label="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {/* Task 8: Implement search button with onClick event to trigger search:*/}
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>

          {/*Task 5: Display search results and handle empty results with a message. */}
          <div id="search-result" className="search-result">
            {searchResults.length > 0 ? (
              searchResults.map((gift) => (
                <div
                  key={gift.id}
                  className="card mb-3"
                  onClick={() => goToDetailsPage(gift.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="card-body">
                    <h5 className="card-title">{gift.name}</h5>
                    <p className="card-text">
                      {gift.description.length > 100
                        ? gift.description.substring(0, 100) + '...'
                        : gift.description}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {gift.category} | <strong>Condition:</strong>{' '}
                      {gift.condition} | <strong>Age:</strong> {gift.age_years} years
                    </p>
                  </div>
                </div>
              ))
            ) : hasSearched ? (
              <p>No results found. Try adjusting your search or filters.</p>
            ) : (
              <p>Showing all gifts. Use the filters or search box to narrow the list.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;