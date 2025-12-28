import React, { useState, useEffect } from 'react';
import '../App.css'; 

function MainPage() {
  //states
  const [searchTerm, setSearchTerm] = useState(''); //search state 
  
  const [selectedGenre, setSelectedGenre] = useState('all');  // filtering state
  
  const [sortOption, setSortOption] = useState('default'); // sorting state
  
  // save the invoked data in a state

  const [items, setItems] = useState([]); 
  //fetch data from API
  useEffect(() => {
  fetch("http://localhost:5000/api/items", {
    credentials: "include"
  })
    .then(res => res.json())
    .then(data => {
      setItems(data);
    })
    .catch(err => console.error(err));
}, []);

   const getFilteredAndSortedItems = () => {

    let list = [...items];

    
//search logic 

    if (searchTerm) {
        list = list.filter(item => 
            
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
// genre filtering 

    if (selectedGenre !== 'all') {

        list = list.filter(item => item.genre === selectedGenre);
    }
    
// sorting logic 

    if (sortOption !== 'default') { // sort function
      list.sort((a, b) => {
        switch (sortOption) {
          case 'duration-short':
            return a.duration - b.duration;  // shortest first ascending
          case 'duration-long':
            return b.duration - a.duration;  // longest first descending
          case 'year':
            return b.year - a.year;  // newest first
          default:
            return 0; // no sort 
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
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)}  
        />
        
        <select 
          className="sort-select" 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          <option value="Action">Action</option>
          <option value="Animation">Animation</option>
          <option value="Crime">Crime</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>


        <select 
          className="sort-select" 
          value ={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        > 
          <option value="default">Sort By...</option>
          <option value="duration-short">Duration: Shortest First</option>
          <option value="duration-long">Duration: Longest First</option>
          <option value="year">Newest Release</option>
        </select>
      </div>

    
      <div className="item-grid">
        {displayedItems.length > 0 ? (
          displayedItems.map((item) => (
            <div key={item._id} className="item-card">
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
          <p>No movies match your criteria or search for: "{searchTerm}".</p> 
        )}
      </div>
    </div>
  );
}

export default MainPage;