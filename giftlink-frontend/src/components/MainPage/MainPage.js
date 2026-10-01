import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
  const [gifts, setGifts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Task 1: Write async fetch operation
    const fetchGifts = async () => {
      try {
        const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
        if (!response.ok) {
          throw new Error(`HTTP error; ${response.status}`);
        }
        const data = await response.json();
        setGifts(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchGifts();
  }, []);

  // Task 2: Navigate to details page
  const goToDetailsPage = (productId) => {
    navigate(`/gift/${productId}`);
  };

  // Task 3: Format timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getConditionClass = (condition) => {
    return condition === 'New' ? 'list-group-item-success' : 'list-group-item-warning';
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Available Gifts</h1>

      {error && <div className="alert alert-danger">Error loading gifts: {error}</div>}

      {!error && gifts.length === 0 && <p>No gifts have been posted yet.</p>}

      <div className="row">
        {gifts.map((gift) => (
          <div key={gift.id} className="col-md-4 mb-4">
            <div className="card product-card">
              {/* // Task 4: Display gift image or placeholder */}
              {gift.image ? (
                <img
                  src={`${urlConfig.frontendUrl}${gift.image}`}
                  alt={gift.name}
                  className="card-img-top product-image"
                />
              ) : (
                <div className="no-image-available">No Image Available</div>
              )}

              <div className="card-body">
                {/* // Task 5: Display gift image or placeholder */}
                <h5 className="card-title">{gift.name}</h5>
                <p className="card-text">
                  {gift.description.length > 100
                    ? gift.description.substring(0, 100) + '...'
                    : gift.description}
                </p>
                <p className="card-text">
                  <strong>Category:</strong> {gift.category} | <strong>Posted:</strong>{' '}
                  {formatDate(gift.date_added)}
                </p>

                {/* // Task 6: Display gift image or placeholder */}
                <p className={`card-text ${getConditionClass(gift.condition)}`}>
                  {gift.condition}
                </p>

                <button onClick={() => goToDetailsPage(gift.id)} className="btn btn-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;