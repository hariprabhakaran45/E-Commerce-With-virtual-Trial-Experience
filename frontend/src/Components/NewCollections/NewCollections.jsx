import React, { useState, useEffect } from 'react';
import './NewCollections.css';
import Item from '../Item/Item';

const NewCollections = () => {
  const [newCollection, setNewCollection] = useState([]);

  useEffect(() => {
    fetch('/newcollections')
      .then((response) => response.json())
      .then((data) => setNewCollection(data));
  }, []);

  return (
    <div className='newcollections'>
      <h1>New Collections</h1>
      <h4>Discover our latest arrivals</h4>
      <hr />
      <div className='collections'>
        {newCollection.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      <div>
        <a href="/mens"><button className='more'>Explore More</button></a>
      </div>
    </div>
  );
};

export default NewCollections;
