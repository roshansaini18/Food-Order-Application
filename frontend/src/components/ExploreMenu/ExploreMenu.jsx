import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our Menu</h1>
      <p className='explore-menu-text'>
        Dive into a world of culinary delights with our expertly curated menu. 
        From savoury starters to delectable desserts, each dish is crafted with 
        the finest ingredients and utmost care. Discover new flavours and enjoy 
        your favourites, all delivered right to your door.
      </p>

      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name
          return (
            <div
              key={index}
              onClick={() =>
                setCategory(prev => (prev === item.menu_name ? "All" : item.menu_name))
              }
              className={`explore-menu-list-item ${item.menu_name.toLowerCase()} ${
                isActive ? "active" : ""
              }`}
            >
              <img
                className={isActive ? "active" : ""}
                src={item.menu_image}
                alt=''
              />
              <p>{item.menu_name}</p>
            </div>
          )
        })}
      </div>
      <hr />
    </div>
  )
}

export default ExploreMenu
