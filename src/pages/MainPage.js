import React, { useState, useEffect } from 'react';
import '../App.css'; 
import itemsData from '../data/items.json';

function MainPage() {
  const [items, setItems] = useState([]); 
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [sortOption, setSortOption] = useState('default');
    useEffect(() => {
    setItems(itemsData);
  }, []);

  const getFilteredAndSortedItems = () => {
    let list = [...items];
    if (sortOption !== 'default') { //sort function
      list.sort((a, b) => {
        switch (sortOption) {
          case 'duration-short':
            return a.duration - b.duration;  //shortest first ascending
          case 'duration-long':
            return b.duration - a.duration;  //longest first descending
          case 'year':
            return b.year - a.year;  //newset first
          default:
            return 0; // No sort
        }
      });
    }

    return list;
  };
  const displayedItems = getFilteredAndSortedItems();
  return (
    <div className="page-container">
      <h2>Movie Collection</h2>
      
      
      <div className="controls">
        
        <input 
          type="text" 
          placeholder="Search movies..." 
          className="search-input"
        />
        
        <select className="sort-select" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Animation">Animation</option>
          <option value="Crime">Crime</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>
      
        <select className="sort-select" value ={sortOption} onChange={(e) => setSortOption(e.target.value)}> 
          <option value="default">Sort By...</option>
          <option value="duration-short">Duration: Shortest First</option>
          <option value="duration-long">Duration: Longest First</option>
          <option value="year">Newest Release</option>
        </select>
      </div>

    
      <div className="item-grid">
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <div key={item.id} className="item-card">
              <h3>{item.title}</h3>
              <p className="director">Dir: {item.director}</p>
              <div className="details">
                <span className="genre-tag">{item.genre}</span>
                <span>{item.year}</span>
              </div>
              <p className="duration">⏱ {item.duration} min</p>
            </div>
          ))
        ) : (
          <p>No movies match your search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default MainPage;