import React from 'react';

const Stars = ({ value }) => {
  return (
    <div className='stars'>
      {Array(5)
        .fill(true)
        .map((_, index) => (
          <span key={index}>
            <i
              style={{ color: '#f8e825' }}
              className={
                value - index >= 1
                  ? 'fas fa-star'
                  : value - index >= 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            ></i>
          </span>
        ))}
    </div>
  );
};

export default Stars;
