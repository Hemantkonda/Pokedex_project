import React from 'react'
import './pokemon.css';

export const Pokemon = ({name, image, types}) => {

  return (
    <div className='main'>
        <div className="post-cards">
            <div className="image">
                <img src={image} alt="" />
            </div>
            <h2>{name}</h2>
            <p>Type: {types}</p>
        </div>
    </div>
  )
}
