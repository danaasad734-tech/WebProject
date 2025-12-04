import React, { useState, useEffect } from 'react';
import '../App.css'; 
import itemsData from '../data/items.json';

function MainPage() {
  const [items, setItems] = useState([]); 

  useEffect(() => {
    setItems(itemsData);
  }, []);

  return (
    <div className="page-container">
      <h2>Movie Collection</h2>
      
      
      <div className="controls">
        
        <input 
          type="text" 
          placeholder="Search movies..." 
          className="search-input"
        />
        
        <select className="sort-select">
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Animation">Animation</option>
          <option value="Crime">Crime</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>

        <select className="sort-select">
          <option value="default">Sort By...</option>
          <option value="duration-short">Duration: Shortest First</option>
          <option value="duration-long">Duration: Longest First</option>
          <option value="year">Newest Release</option>
        </select>
      </div>

    
      <div className="item-grid">
        {items.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.title}</h3>
            <p className="director">Dir: {item.director}</p> 
            
            <div className="details">
              <span className="genre-tag">{item.genre}</span>
              <span>{item.year}</span>
            </div>
            
            <p className="duration">⏱ {item.duration} min</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainPage;